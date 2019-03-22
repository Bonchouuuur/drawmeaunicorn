import React, { Component } from 'react';
import styled from 'styled-components';
// import { PinchView } from 'react-pinch-zoom-pan';
import PinchableView from '../PinchableView/PinchableView';

class Board extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      canvasDim: null,
    };
    this.handleStart = this._handleStart.bind(this);
    this.handleDraw = this._handleDraw.bind(this);
    this.handleEndDraw = this._handleEndDraw.bind(this);
    this.paintLine = this._paintLine.bind(this);
    this.getPoint = this._getPoint.bind(this);
  }

  canPaint = false; // If a user touch/mouse event should draw sth
  wrapper = null; // Store the wrapper position
  prevPos = { x: 0, y: 0 };

  componentDidMount() {
    const container = this.refs.maincontainer.getBoundingClientRect();
    this.setState(
      { canvasDim: Math.min(container.width - 30, container.height - 30) },
      // { canvasDim: Math.min(container.width, container.height) },
      () => {
        const canvas = this.refs.canvas;
        this.props.initBoard({ canvas, ctx: canvas.getContext('2d') });
        this.wrapper = this.refs.canvascontainer.getBoundingClientRect();
      },
    );
  }

  _handleStart(e) {
    if (this.props.selectedTool.type === 'DRAW') {
      this.canPaint = true;
      this.prevPos = this.getPoint(e);
    }
  }

  _handleDraw(e) {
    if (this.canPaint) {
      const _point = this.getPoint(e);
      this.paintLine(this.prevPos, _point);
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

  _getPoint(event) {
    let _point = null;
    const _type = event.dispatchConfig.dependencies[0];
    switch (_type) {
      case 'mousedown':
      case 'mousemove':
        _point = { x: event.clientX, y: event.clientY };
        break;
      case 'touchstart':
      case 'touchmove':
        _point = {
          x: event.targetTouches[0].clientX,
          y: event.targetTouches[0].clientY,
        };
        break;
      default:
        break;
    }
    return _point
      ? {
          x: _point.x - this.wrapper.x,
          y: _point.y - this.wrapper.y,
        }
      : null;
  }

  _getContainerStyle(ratio) {
    return {
      paddingTop: ratio.toFixed(2) + '%',
      // paddingTop: '100%',
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: 'yellow',
    };
  }

  render() {
    const { canvasDim } = this.state;
    const { height, width, selectedTool } = this.props;
    const ratio = (height / width) * 100;
    return (
      <BoardWrapper ref="maincontainer" style={this._getContainerStyle(ratio)}>
        <PinchableView
          // debug
          backgroundColor="#ddd"
          maxScale={4}
          // containerRatio={(400 / 600) * 100}
          containerRatio={100}
          enableManipulation={selectedTool.type === 'MANIPULATE'}
        >
          <div
            onMouseDown={this.handleStart}
            onMouseMove={this.handleDraw}
            onMouseOut={this.handleEndDraw}
            onMouseUp={this.handleEndDraw}
            onTouchStart={this.handleStart}
            onTouchMove={this.handleDraw}
            onTouchEnd={this.handleEndDraw}
            ref="canvascontainer"
            style={{ backgroundColor: 'green' }}
          >
            {canvasDim && (
              <canvas ref="canvas" width={canvasDim} height={canvasDim} />
            )}
          </div>
        </PinchableView>
      </BoardWrapper>
    );
  }
}

const BoardWrapper = styled.div`
  /* background-color: white; */
  background-color: cyan;
  /* flex: 2; */
  height: 100%;
  width: 100%;
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  /* padding: 15px; */
  /* margin: 15px; */
  canvas {
    /* background-color: #f6f6f6; */
    background-color: pink;
    margin-left: auto;
    margin-right: auto;
  }
`;

export default Board;
