import React, { Component } from 'react';
import styled from 'styled-components';
import BoardToolbarItem from './BoardToolbarItem';
import Modal from '../Modal/Modal';
import tools from './tools';

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
    const { style, canvas, changeSelectedTool, selectedTool } = this.props;
    const { showPicture } = this.state;
    return (
      <BoardToolbarWrapper style={style}>
        {tools.map(presetTool => (
          <BoardToolbarItem
            key={`tool-${presetTool.key}`}
            onClick={() => presetTool.enable && changeSelectedTool(presetTool)}
            isSelected={selectedTool.key === presetTool.key}
            isDisabled={!presetTool.enable}
          >
            {presetTool.label}
          </BoardToolbarItem>
        ))}
        <BoardToolbarItem onClick={this.handleExport} isDisabled={false}>
          Export
        </BoardToolbarItem>
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
                width="400"
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
  height: 100%;
  /* padding: 10px; */
`;

export default BoardToolbar;
