import React, { Component } from 'react';
import styled from 'styled-components';
import BoardToolbarItem from './BoardToolbarItem';
import Modal from '../Modal/Modal';

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
    const { style, canvas } = this.props;
    const { showPicture } = this.state;
    return (
      <BoardToolbarWrapper style={style}>
        <BoardToolbarItem>Crayon</BoardToolbarItem>
        <BoardToolbarItem>Droite</BoardToolbarItem>
        <BoardToolbarItem onClick={this.handleExport}>Export</BoardToolbarItem>
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
