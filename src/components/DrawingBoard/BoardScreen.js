import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
    this.handleSwitchSelectedTool = this._handleSwitchSelectedTool.bind(this);
  }

  _initBoard({ canvas, ctx }) {
    this.setState({ canvas, ctx });
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
  }

  _handleSwitchSelectedTool(newTool) {
    this.setState({ tool: newTool });
  }

  render() {
    const { canvas, ctx, tool } = this.state;
    return (
      <BoardScreenStyled>
        <BoardToolbar
          ctx={ctx}
          canvas={canvas}
          selectedTool={tool}
          switchSelectedTool={this.handleSwitchSelectedTool}
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
`;

BoardScreen.propTypes = {
  onSave: PropTypes.func, // Used when saving canvas modifications
};

BoardScreen.defaultProps = {
  onSave: null,
};

export default BoardScreen;
