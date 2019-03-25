import React, { Component, createContext } from 'react';
import tools from './tools';

export const BoardContext = createContext();

export default class BoardProvider extends Component {
  constructor(props, context) {
    super(props, context);
    this.initBoard = this._initBoard.bind(this);
    this.updateBoard = this._updateBoard.bind(this);
    this.handleImgOnLoad = this._handleImgOnLoad.bind(this);
    this.handleUndo = this._handleUndo.bind(this);
    this.handleRedo = this._handleRedo.bind(this);
    this.handleClear = this._handleClear.bind(this);
  }

  state = {
    canvas: null,
    ctx: null,
    undoList: [],
    redoList: [],
    selectedTool: tools.find(tool => tool.type !== 'ACTION'),
    redrawedImg: null,
  };

  _initBoard({ canvas, ctx }) {
    this.setState({ canvas, ctx });
  }

  _updateBoard({ redoList, undoList, redrawedImg }) {
    this.setState({
      redoList: redoList || this.state.redoList,
      undoList: undoList || this.state.undoList,
      redrawedImg: redrawedImg || this.state.redrawedImg,
    });
  }

  _handleImgOnLoad() {
    const img = this.refs.redrawedImg;
    this.state.ctx.drawImage(img, 0, 0);
  }

  _handleUndo() {
    if (this.state.undoList.length > 0) {
      const state = this.state.undoList.pop();
      this.setState({
        redoList: [...this.state.redoList, this.state.canvas.toDataURL()],
        undoList: this.state.undoList.filter(
          (item, index) => index !== this.state.undoList.length,
        ),
        redrawedImg: state,
      });
    }
  }

  _handleRedo() {
    if (this.state.redoList.length > 0) {
      const state = this.state.redoList.pop();
      this.setState({
        undoList: [...this.state.undoList, this.state.canvas.toDataURL()],
        redoList: this.state.redoList.filter(
          (item, index) => index !== this.state.redoList.length,
        ),
        redrawedImg: state,
      });
    }
  }

  _handleClear() {
    const { canvas, ctx } = this.state;
    const ctxBeforeAction = this.state.canvas.toDataURL();
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    this.setState({
      undoList: [...this.state.undoList, ctxBeforeAction],
      redoList: [],
      redrawedImg: this.state.canvas.toDataURL(),
    });
  }

  render() {
    const { redrawedImg } = this.state;
    return (
      <BoardContext.Provider
        value={{
          ...this.state,
          initBoard: this.initBoard,
          updateBoard: this.updateBoard,
          handleUndo: this.handleUndo,
          handleRedo: this.handleRedo,
          handleClear: this.handleClear,
        }}
      >
        {this.props.children}
        {redrawedImg && (
          <img
            src={redrawedImg}
            style={{ visibility: 'hidden', display: 'none' }}
            ref="redrawedImg"
            alt="Redrawed canvas due to undo/redo"
            onLoad={this.handleImgOnLoad}
          />
        )}
      </BoardContext.Provider>
    );
  }
}

export const withBoard = Component => props => {
  return (
    <BoardContext.Consumer>
      {context => {
        return <Component {...props} {...context} />;
      }}
    </BoardContext.Consumer>
  );
};
