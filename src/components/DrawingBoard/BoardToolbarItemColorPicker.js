import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';

import { withBoard } from './BoardProvider';
import Modal from '../Modal/Modal';

class BoardToolbarItemColorPicker extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showColorPicker: false
    };
    this.toggleColorPicker = this._toggleColorPicker.bind(this);
    this.handleChange = this._handleChange.bind(this);
    this.handleClose = this._handleClose.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _toggleColorPicker() {
    if (this._isMounted) {
      this.setState({ showColorPicker: !this.state.showColorPicker });
    }
  }

  _handleChange(color) {
    this.props.changeColor(color.hex);
  }

  _handleClose() {
    if (this._isMounted) {
      this.setState({ showColorPicker: false });
    }
  }

  render() {
    const { isDisabled, selectedColor } = this.props;
    return (
      <BoardToolbarItemWrapper>
        <div
          onClick={this.toggleColorPicker}
          className={classNames({ disabled: isDisabled })}
        >
          <ColorPicker color={selectedColor} />
        </div>
        {this.state.showColorPicker && (
          <Modal
            onClose={this.handleClose}
            title='Couleur du trait'
            closeLabel='Enregistrer'
            width={300}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                padding: 10
              }}
            >
              <SketchPicker
                color={selectedColor}
                onChange={this.handleChange}
                disableAlpha
              />
            </div>
          </Modal>
        )}
      </BoardToolbarItemWrapper>
    );
  }
}

const BoardToolbarItemWrapper = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0 20px;
`;

const ColorPicker = styled.div`
  background-color: ${props => props.color};
  border-radius: 5px;
  height: 20px;
  width: 30px;
`;

BoardToolbarItemColorPicker.propTypes = {
  isDisabled: PropTypes.bool,
  changeColor: PropTypes.func,
  selectedColor: PropTypes.string
};

export default withBoard(BoardToolbarItemColorPicker);
