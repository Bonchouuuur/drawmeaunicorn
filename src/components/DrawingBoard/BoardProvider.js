import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

import { getDefaultTool } from './tools';

export const BoardContext = createContext();

export default class BoardProvider extends Component {
  constructor(props, context) {
    super(props, context);
    this.changeColor = this._changeColor.bind(this);
    this.cleanGrid = this._cleanGrid.bind(this);
    this.drawGrid = this._drawGrid.bind(this);
    this.handleClear = this._handleClear.bind(this);
    this.handleImgOnLoad = this._handleImgOnLoad.bind(this);
    this.handleRedo = this._handleRedo.bind(this);
    this.handleUndo = this._handleUndo.bind(this);
    this.initBoard = this._initBoard.bind(this);
    this.initFinal = this._initFinal.bind(this);
    this.initGrid = this._initGrid.bind(this);
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
    gridCanvas: null,
    finalCanvas: null,
    ctx: null,
    gridCtx: null,
    finalCtx: null,
    gridOptions: {
      display: false,
      size: 100
    },
    redoList: [],
    redrawedImg: null,
    selectedColor: '#000000',
    selectedTool: getDefaultTool(),
    undoList: []
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.gridCtx === null && this.state.gridCtx) ||
      prevState.gridOptions.size !== this.state.gridOptions.size ||
      prevState.gridOptions.display !== this.state.gridOptions.display
    ) {
      this.drawGrid();
    }
  }

  _initBoard({ canvas, ctx }) {
    if (this._isMounted) {
      this.setState({ canvas, ctx });
    }
  }

  _initGrid({ gridCanvas, gridCtx }) {
    if (this._isMounted) {
      this.setState({ gridCanvas, gridCtx });
    }
  }

  _initFinal({ finalCanvas, finalCtx }) {
    if (this._isMounted) {
      this.setState({ finalCanvas, finalCtx });
    }
  }

  _updateBoard({ redoList, undoList, redrawedImg }) {
    if (this._isMounted) {
      this.setState({
        redoList: redoList || this.state.redoList,
        redrawedImg: redrawedImg || this.state.redrawedImg,
        undoList: undoList || this.state.undoList
      });
    }
  }

  _handleImgOnLoad() {
    const img = this.redrawedImg.current;
    this.state.ctx.drawImage(img, 0, 0);
  }

  _handleUndo() {
    if (this.state.undoList.length > 0) {
      const state = this.state.undoList.pop();
      if (this._isMounted) {
        this.setState({
          redoList: [...this.state.redoList, this.state.canvas.toDataURL()],
          redrawedImg: state,
          undoList: this.state.undoList.filter(
            (item, index) => index !== this.state.undoList.length
          )
        });
      }
    }
  }

  _handleRedo() {
    if (this.state.redoList.length > 0) {
      const state = this.state.redoList.pop();
      if (this._isMounted) {
        this.setState({
          undoList: [...this.state.undoList, this.state.canvas.toDataURL()],
          redrawedImg: state,
          redoList: this.state.redoList.filter(
            (item, index) => index !== this.state.redoList.length
          )
        });
      }
    }
  }

  _handleClear() {
    const { canvas, ctx } = this.state;
    const ctxBeforeAction = this.state.canvas.toDataURL();
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    if (this._isMounted) {
      this.setState({
        redrawedImg: this.state.canvas.toDataURL(),
        redoList: [],
        undoList: [...this.state.undoList, ctxBeforeAction]
      });
    }
  }

  _switchSelectedTool(newTool) {
    if (this._isMounted) {
      this.setState({ selectedTool: newTool });
    }
  }

  _changeColor(newColor) {
    if (this._isMounted) {
      this.setState({ selectedColor: newColor });
    }
    const { ctx } = this.state;
    ctx.strokeStyle = newColor;
  }

  _updateGridOptions(gridOptions) {
    if (this._isMounted) {
      this.setState({
        gridOptions: Object.assign({}, this.state.gridOptions, gridOptions)
      });
    }
  }

  _updateBrushOptions(brushOptions) {
    if (this._isMounted) {
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
  }

  _drawGrid() {
    const { gridOptions, gridCtx, gridCanvas } = this.state;
    this.cleanGrid();
    if (gridOptions && gridOptions.display) {
      gridCtx.beginPath();
      gridCtx.strokeStyle = 'rgba(0,0,0,0.07)';
      gridCtx.lineWidth = 1;
      let lastVertical = 0;
      let lastHorizontal = 0;
      while (lastVertical + gridOptions.size < gridCanvas.width) {
        lastVertical = lastVertical + gridOptions.size;
        gridCtx.moveTo(lastVertical, 0);
        gridCtx.lineTo(lastVertical, gridCanvas.height);
      }
      while (lastHorizontal + gridOptions.size < gridCanvas.height) {
        lastHorizontal = lastHorizontal + gridOptions.size;
        gridCtx.moveTo(0, lastHorizontal);
        gridCtx.lineTo(gridCanvas.width, lastHorizontal);
      }
      gridCtx.stroke();
    }
  }

  _cleanGrid() {
    const { gridCtx, gridCanvas } = this.state;
    gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    gridCtx.beginPath();
    gridCtx.fillStyle = 'transparent';
    gridCtx.fillRect(0, 0, gridCanvas.width, gridCanvas.height);
    gridCtx.closePath();
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
          initFinal: this.initFinal,
          initGrid: this.initGrid,
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
