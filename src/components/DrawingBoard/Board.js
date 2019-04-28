import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactCursorPosition, { INTERACTIONS } from 'react-cursor-position';
import styled from 'styled-components';

import CanvasWrapper from './CanvasWrapper';
import PinchableView from '../PinchableView/PinchableView';
import { withBoard } from './BoardProvider';

const SCALES = {
  min: 1,
  max: 4
};

class Board extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      canvasDim: null,
      pinchObj: { scale: SCALES.min, x: 0, y: 0 }
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
    this.updateDimensions();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  _updateDimensions() {
    const container = this.maincontainer.current.getBoundingClientRect();
    const { canvasDim } = this.state;
    this.setState({
      canvasDim: Math.min(container.width - 30, container.height - 30)
    });
    const { ctx, canvas, updateBoard } = this.props;
    if (
      ctx &&
      canvas &&
      Math.min(container.width - 30, container.height - 30) !== canvasDim
    ) {
      updateBoard({
        undoList: [],
        redoList: [],
        redrawedImg: canvas.toDataURL()
      });
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.closePath();
    }
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
            scale: Math.max(SCALES.min, this.state.pinchObj.scale - 0.25)
          })
        });
      } else {
        this.setState({
          pinchObj: Object.assign({}, this.state.pinchObj, {
            scale: Math.min(SCALES.max, this.state.pinchObj.scale + 0.25)
          })
        });
      }
    }
  }

  render() {
    const { canvasDim } = this.state;
    const { selectedTool } = this.props;
    return (
      <BoardWrapper ref={this.maincontainer}>
        <PinchableView
          backgroundColor='#ddd'
          containerRatio={100}
          enableManipulation={selectedTool.type === 'MANIPULATE'}
          initialScale={this.state.pinchObj.scale}
          maxScale={SCALES.max}
          onPinchStop={this.handlePinchStop}
        >
          {canvasDim && (
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
          )}
        </PinchableView>
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
  ctx: PropTypes.object,
  selectedTool: PropTypes.object,
  undoList: PropTypes.array,
  updateBoard: PropTypes.func
};

export default withBoard(Board);
