import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import BoardToolbarItem from './BoardToolbarItem';
import BoardToolbarItemColorPicker from './BoardToolbarItemColorPicker';
import BoardToolbarItemPopover from './BoardToolbarItemPopover';
import Modal from '../Modal/Modal';
import tools from './tools';
import { withBoard } from './BoardProvider';

class BoardToolbar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showPicture: false
    };
    this.handleExport = this._handleExport.bind(this);
    this.handleSave = this._handleSave.bind(this);
  }

  _handleExport() {
    this.setState({ showPicture: true });
  }

  _handleSave() {
    const {
      canvas,
      gridOptions,
      onSave,
      finalCanvas,
      gridCanvas,
      finalCtx
    } = this.props;
    finalCtx.beginPath();
    finalCtx.fillStyle = 'white';
    finalCtx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
    finalCtx.drawImage(canvas, 0, 0);
    finalCtx.drawImage(gridCanvas, 0, 0);
    finalCtx.closePath();
    onSave &&
      onSave({
        img: canvas.toDataURL(),
        imgWGrid: gridOptions.display
          ? finalCanvas.toDataURL()
          : canvas.toDataURL()
      });
  }

  render() {
    const {
      canvas,
      ctx,
      handleClear,
      handleRedo,
      handleUndo,
      selectedTool,
      style,
      switchSelectedTool
    } = this.props;
    const { showPicture } = this.state;
    return (
      <MainWrapper>
        <BoardToolbarWrapper style={style}>
          {tools.map(toolGroup => {
            return (
              <div
                key={`toolgroup-${toolGroup.groupKey}`}
                className='group-container'
              >
                <div>
                  {toolGroup.tools.map(tool => {
                    let ToolBarItemComponent = BoardToolbarItem;
                    if (tool.key === 'BOARD_COLOR_PICKER') {
                      ToolBarItemComponent = BoardToolbarItemColorPicker;
                    } else if (tool.menuType === 'POPOVER') {
                      ToolBarItemComponent = BoardToolbarItemPopover;
                    }
                    return (
                      <ToolBarItemComponent
                        tool={tool}
                        key={`tool-${tool.key}`}
                        onClick={() => {
                          tool.onClick && tool.onClick({ canvas, ctx });
                          tool.enable &&
                            tool.type !== 'ACTION' &&
                            switchSelectedTool(tool);
                          // tool.enable &&
                          //   tool.key === 'BOARD_EXPORT' &&
                          //   this.handleExport();
                          tool.enable &&
                            tool.key === 'BOARD_SAVE' &&
                            this.handleSave();
                          tool.key === 'BOARD_UNDO' &&
                            tool.enable &&
                            handleUndo &&
                            handleUndo();
                          tool.key === 'BOARD_REDO' &&
                            tool.enable &&
                            handleRedo &&
                            handleRedo();
                          tool.key === 'BOARD_CLEAR' &&
                            tool.enable &&
                            handleClear &&
                            handleClear();
                          tool.enable &&
                            tool.key === 'BOARD_TOGGLE_GRID' &&
                            this.props.toggleGrid();
                        }}
                        isSelected={selectedTool.key === tool.key}
                        isDisabled={
                          !tool.enable ||
                          (tool.key === 'BOARD_UNDO' &&
                            this.props.undoList.length === 0) ||
                          (tool.key === 'BOARD_REDO' &&
                            this.props.redoList.length === 0)
                        }
                      >
                        {tool.label}
                      </ToolBarItemComponent>
                    );
                  })}
                </div>
                <span>{toolGroup.label}</span>
              </div>
            );
          })}
          {showPicture && (
            <Modal
              onClose={() => this.setState({ showPicture: false })}
              title='Export du dessin'
            >
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  padding: 10
                }}
              >
                <img
                  alt='Draw representation'
                  src={canvas.toDataURL()}
                  width='200'
                />
              </div>
            </Modal>
          )}
        </BoardToolbarWrapper>
      </MainWrapper>
    );
  }
}

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 110px;
  justify-content: flex-start;
  overflow-x: scroll;
  background-color: #e6e6e6;
  overflow-y: hidden;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BoardToolbarWrapper = styled.div`
  align-items: center;
  background-color: #e6e6e6;
  display: flex;
  height: 100px;
  justify-content: center;
  .group-container {
    display: flex;
    height: 45px;
    position: relative;
    border-right: 1px solid #d6d6d6;
    min-height: 45px;
    padding: 0 15px;
    & > div {
      display: flex;
    }
    & > span {
      bottom: -15px;
      font-size: 11px;
      left: 0;
      position: absolute;
      right: 0;
      text-align: center;
    }
    &:last-of-type {
      border-right: 0;
    }
  }
`;

BoardToolbar.propTypes = {
  canvas: PropTypes.object,
  ctx: PropTypes.object,
  finalCanvas: PropTypes.object,
  finalCtx: PropTypes.object,
  gridCanvas: PropTypes.object,
  gridOptions: PropTypes.object,
  handleClear: PropTypes.func,
  handleRedo: PropTypes.func,
  handleUndo: PropTypes.func,
  onSave: PropTypes.func,
  redoList: PropTypes.array,
  selectedTool: PropTypes.object,
  style: PropTypes.object,
  switchSelectedTool: PropTypes.func,
  toggleGrid: PropTypes.func,
  undoList: PropTypes.array
};

export default withBoard(BoardToolbar);
