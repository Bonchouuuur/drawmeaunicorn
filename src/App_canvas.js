import React, { Component } from 'react';
import styled from 'styled-components';
import BoardToolbar from './components/DrawingBoard/BoardToolbar';
import Board from './components/DrawingBoard/Board';
import tools from './components/DrawingBoard/tools';

class App extends Component {
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
    const { canvas, ctx, tool } = this.state;
    return (
      <AppWrapper>
        <BoardContainer>
          <BoardToolbar
            style={{ width: 100 }}
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
        </BoardContainer>
      </AppWrapper>
    );
  }
}

const AppWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f6f6f6;
`;

const BoardContainer = styled.div`
  height: calc(100vmin - 40px);
  width: calc(100vmin - 40px);
  display: flex;
`;

export default App;
