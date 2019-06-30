import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactCursorPosition, { INTERACTIONS } from 'react-cursor-position';
import styled from 'styled-components';

import CanvasWrapper from './CanvasWrapper';
import PinchableView from '../PinchableView/PinchableView';
import { withBoard } from './BoardProvider';

class Board extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      canvasDim: 700,
      pinchObj: { scale: null, x: 0, y: 0 },
      scales: {
        min: null,
        max: 4
      }
    };
    this.handleDraw = this._handleDraw.bind(this);
    this.handleEndDraw = this._handleEndDraw.bind(this);
    this.handlePinchStop = this._handlePinchStop.bind(this);
    this.handleScroll = this._handleScroll.bind(this);
    this.handleStart = this._handleStart.bind(this);
    this.paintLine = this._paintLine.bind(this);
    this.updateDimensions = this._updateDimensions.bind(this);
    this.maincontainer = React.createRef();
  }

  canPaint = false;
  ctxBeforeAction = null;
  prevPos = { x: 0, y: 0 };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    setTimeout(() => {
      this.updateDimensions();
    }, 500);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  _updateDimensions() {
    const ratio =
      Math.min(
        this.maincontainer.current.getBoundingClientRect().width,
        this.maincontainer.current.getBoundingClientRect().height
      ) / 700;
    const minScale = Math.min(1, Math.floor(ratio / 0.25) * 0.25);
    this.setState({
      scales: {
        min: minScale,
        max: 4
      },
      pinchObj: { scale: minScale, x: 0, y: 0 }
    });
  }

  _handleStart(e, point) {
    if (this.props.selectedTool.type === 'DRAW') {
      this.ctxBeforeAction = this.props.canvas.toDataURL();
      this.canPaint = true;
      this.prevPos = point;
      this.hasPaint = false;
    }
  }

  _handleDraw(e, point) {
    if (this.canPaint) {
      this.paintLine(this.prevPos, point);
    }
  }

  _handleEndDraw(e) {
    if (this.canPaint) {
      if (this.hasPaint) {
        this.props.updateBoard({
          redoList: [],
          redrawedImg: this.props.canvas.toDataURL(),
          undoList: [...this.props.undoList, this.ctxBeforeAction]
        });
      }
      this.canPaint = false;
      this.ctxBeforeAction = null;
      this.hasPaint = false;
    }
  }

  _paintLine(from, to) {
    this.hasPaint = true;
    const { ctx } = this.props;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    this.prevPos = to;
  }

  _handlePinchStop(obj) {
    this.setState({ pinchObj: obj });
  }

  _handleScroll(e) {
    if (this.props.selectedTool.type === 'MANIPULATE') {
      if (e.nativeEvent.deltaY > 0) {
        this.setState({
          pinchObj: Object.assign({}, this.state.pinchObj, {
            scale: Math.max(
              this.state.scales.min,
              this.state.pinchObj.scale - 0.25
            )
          })
        });
      } else {
        this.setState({
          pinchObj: Object.assign({}, this.state.pinchObj, {
            scale: Math.min(
              this.state.scales.max,
              this.state.pinchObj.scale + 0.25
            )
          })
        });
      }
    }
  }

  render() {
    const { canvasDim, scales } = this.state;
    const { selectedTool } = this.props;
    return (
      <BoardWrapper ref={this.maincontainer} className='DrawMeAUnicorn-Board'>
        {scales.min ? (
          <PinchableView
            backgroundColor='#ddd'
            containerRatio={100}
            enableManipulation={selectedTool.type === 'MANIPULATE'}
            initialScale={this.state.pinchObj.scale}
            maxScale={this.state.scales.max}
            minScale={this.state.scales.min}
            onPinchStop={this.handlePinchStop}
          >
            <ReactCursorPosition
              activationInteractionTouch={INTERACTIONS.TOUCH}
            >
              <CanvasWrapper
                canvasDim={canvasDim}
                onMouseDown={this.handleStart}
                onMouseMove={this.handleDraw}
                onMouseOut={this.handleEndDraw}
                onMouseUp={this.handleEndDraw}
                onTouchEnd={this.handleEndDraw}
                onTouchMove={this.handleDraw}
                onTouchStart={this.handleStart}
                onWheel={this.handleScroll}
                scaleObject={this.state.pinchObj}
              />
            </ReactCursorPosition>
          </PinchableView>
        ) : (
          <ReactCursorPosition activationInteractionTouch={INTERACTIONS.TOUCH}>
            <CanvasWrapper
              canvasDim={canvasDim}
              onMouseDown={this.handleStart}
              onMouseMove={this.handleDraw}
              onMouseOut={this.handleEndDraw}
              onMouseUp={this.handleEndDraw}
              onTouchEnd={this.handleEndDraw}
              onTouchMove={this.handleDraw}
              onTouchStart={this.handleStart}
              onWheel={this.handleScroll}
              scaleObject={this.state.pinchObj}
            />
          </ReactCursorPosition>
        )}
      </BoardWrapper>
    );
  }
}

const BoardWrapper = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
  canvas {
    background-color: white;
    margin-left: auto;
    margin-right: auto;
  }
`;

Board.propTypes = {
  canvas: PropTypes.object,
  className: PropTypes.string,
  ctx: PropTypes.object,
  selectedTool: PropTypes.object,
  undoList: PropTypes.array,
  updateBoard: PropTypes.func
};

export default withBoard(Board);
