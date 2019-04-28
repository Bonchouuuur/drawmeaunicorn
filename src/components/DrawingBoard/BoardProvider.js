import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

import { getDefaultTool } from './tools';

export const BoardContext = createContext();

export default class BoardProvider extends Component {
  constructor(props, context) {
    super(props, context);
    this.changeColor = this._changeColor.bind(this);
    this.handleClear = this._handleClear.bind(this);
    this.handleImgOnLoad = this._handleImgOnLoad.bind(this);
    this.handleRedo = this._handleRedo.bind(this);
    this.handleUndo = this._handleUndo.bind(this);
    this.initBoard = this._initBoard.bind(this);
    this.switchSelectedTool = this._switchSelectedTool.bind(this);
    this.updateBoard = this._updateBoard.bind(this);
    this.updateBrushOptions = this._updateBrushOptions.bind(this);
    this.updateGridOptions = this._updateGridOptions.bind(this);
    this.redrawedImg = React.createRef();
  }

  state = {
    brushOptions: {
      width: 1,
      style: 'SOLID'
    },
    canvas: null,
    ctx: null,
    gridOptions: {
      display: true,
      size: 100
    },
    redoList: [],
    redrawedImg: null,
    selectedColor: '#000000',
    selectedTool: getDefaultTool(),
    undoList: []
  };

  _initBoard({ canvas, ctx }) {
    this.setState({ canvas, ctx });
  }

  _updateBoard({ redoList, undoList, redrawedImg }) {
    this.setState({
      redoList: redoList || this.state.redoList,
      redrawedImg: redrawedImg || this.state.redrawedImg,
      undoList: undoList || this.state.undoList
    });
  }

  _handleImgOnLoad() {
    const img = this.redrawedImg.current;
    this.state.ctx.drawImage(img, 0, 0);
  }

  _handleUndo() {
    if (this.state.undoList.length > 0) {
      const state = this.state.undoList.pop();
      this.setState({
        redoList: [...this.state.redoList, this.state.canvas.toDataURL()],
        redrawedImg: state,
        undoList: this.state.undoList.filter(
          (item, index) => index !== this.state.undoList.length
        )
      });
    }
  }

  _handleRedo() {
    if (this.state.redoList.length > 0) {
      const state = this.state.redoList.pop();
      this.setState({
        undoList: [...this.state.undoList, this.state.canvas.toDataURL()],
        redrawedImg: state,
        redoList: this.state.redoList.filter(
          (item, index) => index !== this.state.redoList.length
        )
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
      redrawedImg: this.state.canvas.toDataURL(),
      redoList: [],
      undoList: [...this.state.undoList, ctxBeforeAction]
    });
  }

  _switchSelectedTool(newTool) {
    this.setState({ selectedTool: newTool });
  }

  _changeColor(newColor) {
    this.setState({ selectedColor: newColor });
    const { ctx } = this.state;
    ctx.strokeStyle = newColor;
  }

  _updateGridOptions(gridOptions) {
    this.setState({
      gridOptions: Object.assign({}, this.state.gridOptions, gridOptions)
    });
  }

  _updateBrushOptions(brushOptions) {
    this.setState(
      {
        brushOptions: Object.assign({}, this.state.brushOptions, brushOptions)
      },
      () => {
        const { ctx, brushOptions } = this.state;
        ctx.lineWidth = brushOptions.width;
        ctx.setLineDash(brushOptions.style === 'DASHED' ? [5, 15] : []);
      }
    );
  }

  render() {
    const { redrawedImg } = this.state;
    return (
      <BoardContext.Provider
        value={{
          ...this.state,
          changeColor: this.changeColor,
          handleClear: this.handleClear,
          handleRedo: this.handleRedo,
          handleUndo: this.handleUndo,
          initBoard: this.initBoard,
          switchSelectedTool: this.switchSelectedTool,
          updateBoard: this.updateBoard,
          updateBrushOptions: this.updateBrushOptions,
          updateGridOptions: this.updateGridOptions
        }}
      >
        {this.props.children}
        {redrawedImg && (
          <img
            alt='Redrawed canvas due to undo/redo'
            onLoad={this.handleImgOnLoad}
            ref={this.redrawedImg}
            src={redrawedImg}
            style={{ visibility: 'hidden', display: 'none' }}
          />
        )}
      </BoardContext.Provider>
    );
  }
}

BoardProvider.propTypes = {
  children: PropTypes.node
};

export function withBoard(Component) {
  return function(props) {
    return (
      <BoardContext.Consumer>
        {context => {
          return <Component {...props} {...context} />;
        }}
      </BoardContext.Consumer>
    );
  };
}
