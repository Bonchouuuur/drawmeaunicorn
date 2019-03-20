import React, { Component } from 'react';
import styled from 'styled-components';
import BoardToolbar from './components/DrawingBoard/BoardToolbar';
import Board from './components/DrawingBoard/Board';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      canvas: null,
      ctx: null,
    };
    this.initBoard = this._initBoard.bind(this);
  }

  _initBoard({ canvas, ctx }) {
    this.setState({ canvas, ctx });
  }

  render() {
    const { canvas, ctx } = this.state;
    return (
      <AppWrapper>
        <BoardContainer>
          <BoardToolbar style={{ width: 100 }} ctx={ctx} canvas={canvas} />
          <Board ctx={ctx} canvas={canvas} initBoard={this.initBoard} />
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
