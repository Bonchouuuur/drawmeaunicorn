import React, { Component } from 'react';
import styled from 'styled-components';
import BoardScreen from './components/DrawingBoard/BoardScreen';
import BoardProvider from './components/DrawingBoard/BoardProvider';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showBoard: false,
    };
    this.toggleBoard = this._toggleBoard.bind(this);
  }

  _toggleBoard() {
    this.setState({ showBoard: !this.state.showBoard });
  }

  render() {
    const { showBoard } = this.state;
    return (
      <div>
        <AppTitleWrapper>
          <h1>Draw me a unicorn</h1>
        </AppTitleWrapper>
        <AppContainer>
          <button onClick={this.toggleBoard}>Draw now !</button>
          {showBoard && (
            <BoardProvider>
              <BoardScreen onSave={this.toggleBoard} />
            </BoardProvider>
          )}
        </AppContainer>
      </div>
    );
  }
}

const AppTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f6f6f6;
`;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

export default App;
