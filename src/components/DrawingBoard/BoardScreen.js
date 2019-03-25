import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import tools from './tools';
import BoardToolbar from './BoardToolbar';
import Board from './Board';
import { withBoard } from './BoardProvider';

class BoardScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tool: tools[0],
    };
    this.handleSwitchSelectedTool = this._handleSwitchSelectedTool.bind(this);
  }

  _handleSwitchSelectedTool(newTool) {
    this.setState({ tool: newTool });
  }

  render() {
    const { tool } = this.state;
    return (
      <BoardScreenStyled>
        <BoardToolbar
          selectedTool={tool}
          switchSelectedTool={this.handleSwitchSelectedTool}
        />
        <Board />
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

export default withBoard(BoardScreen);
