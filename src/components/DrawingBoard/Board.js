import React, { Component } from 'react';
import styled from 'styled-components';

const BreakException = {};

class Board extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      elCount: 0,
    };
    this.handleClick = this._handleClick.bind(this);
    this.drawLine = this._drawLine.bind(this);
    this.exportBoard = this._exportBoard.bind(this);
    this.line = [null, null];
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    this.props.initBoard({ canvas, ctx: canvas.getContext('2d') });
  }

  _drawLine() {
    const { ctx } = this.props;
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(this.line[0].x, this.line[0].y);
    ctx.lineTo(this.line[1].x, this.line[1].y);
    ctx.stroke();
    this.setState({ elCount: this.state.elCount + 1 });
  }

  _handleClick(e) {
    const wrapper = this.refs.canvascontainer.getBoundingClientRect();
    const click = { x: e.clientX, y: e.clientY };
    const pointInBoard = { x: click.x - wrapper.x, y: click.y - wrapper.y };
    try {
      this.line.forEach((point, index) => {
        if (!point) {
          this.line[index] = pointInBoard;
          throw BreakException;
        }
      });
    } catch (e) {
      if (e !== BreakException) throw e;
    }
    if (this.line[0] && this.line[1]) {
      this._drawLine();
      this.line = [null, null];
    }
  }

  _exportBoard() {
    console.log(this.refs.canvas.toDataURL());
  }

  render() {
    // const exportedValue = this.refs.canvas
    //   ? this.refs.canvas.toDataURL()
    //   : null;
    return (
      <BoardWrapper>
        {/* {exportedValue && <img src={exportedValue} alt="Board as file" />} */}
        <div onClick={this.handleClick} ref="canvascontainer">
          <canvas ref="canvas" width={700} height={700} />
        </div>
      </BoardWrapper>
    );
  }
}

const BoardWrapper = styled.div`
  background-color: white;
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  canvas {
    background-color: lightgreen;
  }
`;

export default Board;
