import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BoardToolbarItem from './BoardToolbarItem';
import Modal from '../Modal/Modal';
import tools from './tools';
import { withBoard } from './BoardProvider';

class BoardToolbar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showPicture: false,
    };
    this.handleExport = this._handleExport.bind(this);
  }

  _handleExport() {
    this.setState({ showPicture: true });
  }

  render() {
    const {
      style,
      canvas,
      switchSelectedTool,
      selectedTool,
      ctx,
      handleUndo,
      handleRedo,
      handleClear,
    } = this.props;
    const { showPicture } = this.state;
    return (
      <BoardToolbarWrapper style={style}>
        {tools.map(tool => (
          <BoardToolbarItem
            key={`tool-${tool.key}`}
            onClick={() => {
              tool.onClick && tool.onClick({ canvas, ctx });
              tool.enable && tool.type !== 'ACTION' && switchSelectedTool(tool);
              tool.enable && tool.key === 'BOARD_EXPORT' && this.handleExport();
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
            }}
            isSelected={selectedTool.key === tool.key}
            isDisabled={
              !tool.enable ||
              (tool.key === 'BOARD_UNDO' && this.props.undoList.length === 0) ||
              (tool.key === 'BOARD_REDO' && this.props.redoList.length === 0)
            }
          >
            {tool.label}
          </BoardToolbarItem>
        ))}
        {showPicture && (
          <Modal
            onClose={() => this.setState({ showPicture: false })}
            title="Export du dessin"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}
            >
              <img
                src={canvas.toDataURL()}
                alt="Draw representation"
                width="200"
              />
            </div>
          </Modal>
        )}
      </BoardToolbarWrapper>
    );
  }
}

const BoardToolbarWrapper = styled.div`
  background-color: #e6e6e6;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 70px;
`;

BoardToolbar.propTypes = {
  ctx: PropTypes.objectOf(CanvasRenderingContext2D),
  canvas: PropTypes.instanceOf(Element),
  selectedTool: PropTypes.object,
  switchSelectedTool: PropTypes.func,
  boardUndo: PropTypes.func,
  boardRedo: PropTypes.func,
};

export default withBoard(BoardToolbar);
