import React, { Component } from 'react';
import styled from 'styled-components';

class Board extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      elCount: 0,
      canvasDim: null,
    };
    this.handleMouseDown = this._handleMouseDown.bind(this);
    this.handleDraw = this._handleDraw.bind(this);
    this.handleEndDraw = this._handleEndDraw.bind(this);
    this.drawLine = this._drawLine.bind(this);
    this.exportBoard = this._exportBoard.bind(this);
    this.line = [null, null];
    this.canListenToMove = false;
  }

  componentDidMount() {
    const container = this.refs.maincontainer.getBoundingClientRect();
    this.setState(
      { canvasDim: Math.min(container.width - 30, container.height - 30) },
      () => {
        const canvas = this.refs.canvas;
        this.props.initBoard({ canvas, ctx: canvas.getContext('2d') });
      },
    );
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (nextProps.selectedTool.key !== this.props.selectedTool.key) {
      nextProps.ctx.fillStyle = 'solid';
      nextProps.ctx.strokeStyle = '#FFF';
      nextProps.ctx.lineWidth = 1;
    }
  };

  _drawLine() {
    const { ctx } = this.props;
    ctx.beginPath();
    ctx.moveTo(this.line[0].x, this.line[0].y);
    ctx.lineTo(this.line[1].x, this.line[1].y);
    ctx.stroke();
    this.setState({ elCount: this.state.elCount + 1 });
  }

  _drawPoint({ x, y, width, height }) {
    const { ctx } = this.props;
    ctx.beginPath();
    ctx.fillRect(x - 1, y - 1, width, height);
    this.setState({ elCount: this.state.elCount + 1 });
  }

  _handleMouseDown(e) {
    this.canListenToMove = true;
    const { selectedTool, ctx } = this.props;
    const wrapper = this.refs.canvascontainer.getBoundingClientRect();
    const click = { x: e.clientX, y: e.clientY };
    const pointInBoard = { x: click.x - wrapper.x, y: click.y - wrapper.y };
    if (
      selectedTool.key === 'BOARD_PEN' ||
      selectedTool.key === 'BOARD_ERASER'
    ) {
      ctx.beginPath();
      ctx.strokeRect(pointInBoard.x, pointInBoard.y, 0.5, 0.5); // We draw sth as a "point"
      ctx.fill();
    }
  }

  _handleDraw(e) {
    if (!this.canListenToMove) {
      return true;
    }
    const { selectedTool, ctx } = this.props;
    const wrapper = this.refs.canvascontainer.getBoundingClientRect();
    const click = { x: e.clientX, y: e.clientY };
    const pointInBoard = { x: click.x - wrapper.x, y: click.y - wrapper.y };
    if (
      selectedTool.key === 'BOARD_PEN' ||
      selectedTool.key === 'BOARD_ERASER'
    ) {
      ctx.lineTo(pointInBoard.x, pointInBoard.y);
      ctx.stroke();
    }
  }

  _handleEndDraw() {
    const { selectedTool, ctx } = this.props;
    if (
      selectedTool.key === 'BOARD_PEN' ||
      selectedTool.key === 'BOARD_ERASER'
    ) {
      ctx.closePath();
    }
    this.canListenToMove = false;
  }

  _exportBoard() {
    console.log(this.refs.canvas.toDataURL());
  }

  render() {
    const { canvasDim } = this.state;
    return (
      <BoardWrapper ref="maincontainer">
        <div
          // onClick={this.handleClick}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleDraw}
          onMouseOut={this.handleEndDraw}
          onMouseUp={this.handleEndDraw}
          ref="canvascontainer"
        >
          {canvasDim && (
            <canvas ref="canvas" width={canvasDim} height={canvasDim} />
          )}
        </div>
      </BoardWrapper>
    );
  }
}

const BoardWrapper = styled.div`
  /* background-color: white; */
  background-color: cyan;
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  canvas {
    /* background-color: #f6f6f6; */
    background-color: pink;
  }
`;

export default Board;
