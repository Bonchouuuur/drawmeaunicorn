import React, { Component } from 'react';
import styled from 'styled-components';
import tools from './tools';
import BoardToolbar from './BoardToolbar';
import Board from './Board';

class BoardScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      canvas: null,
      ctx: null,
      tool: tools[0],
    };
    this.initBoard = this._initBoard.bind(this);
    this.changeSelectedTool = this._changeSelectedTool.bind(this);
  }

  _initBoard({ canvas, ctx }) {
    this.setState({ canvas, ctx });
  }

  _changeSelectedTool(newTool) {
    this.setState({ tool: newTool });
  }

  render() {
    // const { toggleScreen } = this.props; // Use to close screen (when saving or user's action)
    const { canvas, ctx, tool } = this.state;
    return (
      <BoardScreenStyled>
        <BoardToolbar
          ctx={ctx}
          canvas={canvas}
          selectedTool={tool}
          changeSelectedTool={this.changeSelectedTool}
        />
        <Board
          ctx={ctx}
          canvas={canvas}
          initBoard={this.initBoard}
          selectedTool={tool}
        />
      </BoardScreenStyled>
    );
  }
}

const BoardScreenStyled = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: white;
  overflow: hidden;
  user-select: none;
  flex-direction: column;
  /* padding-top: 10px; */
`;

// const BoardContainer = styled.div`
//   height: calc(100vmin - 40px);
//   width: calc(100vmin - 40px);
//   display: flex;
// `;

export default BoardScreen;
