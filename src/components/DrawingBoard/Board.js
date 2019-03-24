import React, { Component } from 'react';
import styled from 'styled-components';
import PinchableView from '../PinchableView/PinchableView';
import ReactCursorPosition from 'react-cursor-position';
import CanvasWrapper from './CanvasWrapper';

const SCALES = {
  min: 1,
  max: 4,
};

class Board extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      canvasDim: null,
      pinchObj: { scale: SCALES.min, x: 0, y: 0 },
    };
    this.handleStart = this._handleStart.bind(this);
    this.handleDraw = this._handleDraw.bind(this);
    this.handleEndDraw = this._handleEndDraw.bind(this);
    this.handleScroll = this._handleScroll.bind(this);
    this.paintLine = this._paintLine.bind(this);
    this.handlePinchStop = this._handlePinchStop.bind(this);
    this.initBoard = this._initBoard.bind(this);
  }

  canPaint = false; // If a user touch/mouse event should draw sth
  wrapper = null; // Store the wrapper position
  prevPos = { x: 0, y: 0 };

  componentDidMount() {
    const container = this.refs.maincontainer.getBoundingClientRect();
    this.setState({
      canvasDim: Math.min(container.width - 30, container.height - 30),
    });
  }

  _handleStart(e, point) {
    if (this.props.selectedTool.type === 'DRAW') {
      this.canPaint = true;
      this.prevPos = point;
    }
  }

  _handleDraw(e, point) {
    if (this.canPaint) {
      this.paintLine(this.prevPos, point);
    }
  }

  _handleEndDraw(e) {
    this.canPaint = false;
  }

  _paintLine(from, to) {
    const { ctx } = this.props;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    this.prevPos = to;
  }

  _initBoard({ canvas, wrapper }) {
    this.props.initBoard({ canvas, ctx: canvas.getContext('2d') });
    this.wrapper = wrapper.getBoundingClientRect();
  }

  _handlePinchStop(obj) {
    this.setState({ pinchObj: obj });
  }

  _handleScroll(e) {
    if (this.props.selectedTool.type === 'MANIPULATE') {
      if (e.nativeEvent.deltaY > 0) {
        this.setState({
          pinchObj: Object.assign({}, this.state.pinchObj, {
            scale: Math.max(SCALES.min, this.state.pinchObj.scale - 0.25),
          }),
        });
      } else {
        this.setState({
          pinchObj: Object.assign({}, this.state.pinchObj, {
            scale: Math.min(SCALES.max, this.state.pinchObj.scale + 0.25),
          }),
        });
      }
    }
  }

  render() {
    const { canvasDim } = this.state;
    const { selectedTool } = this.props;
    return (
      <BoardWrapper ref="maincontainer">
        <PinchableView
          backgroundColor="#ddd"
          maxScale={SCALES.max}
          initialScale={this.state.pinchObj.scale}
          containerRatio={100}
          enableManipulation={selectedTool.type === 'MANIPULATE'}
          onPinchStop={this.handlePinchStop}
        >
          {canvasDim && (
            <ReactCursorPosition>
              <CanvasWrapper
                onMouseDown={this.handleStart}
                onMouseMove={this.handleDraw}
                onMouseOut={this.handleEndDraw}
                onMouseUp={this.handleEndDraw}
                onTouchStart={this.handleStart}
                onTouchMove={this.handleDraw}
                onTouchEnd={this.handleEndDraw}
                canvasDim={canvasDim}
                initBoard={this.initBoard}
                scaleObject={this.state.pinchObj}
                onWheel={this.handleScroll}
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
  width: 100%;
  overflow: hidden;
  position: relative;
  canvas {
    background-color: white;
    margin-left: auto;
    margin-right: auto;
  }
`;

export default Board;
