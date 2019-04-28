import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';

import { withBoard } from './BoardProvider';

class BoardToolbarItemColorPicker extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showColorPicker: false
    };
    this.toggleColorPicker = this._toggleColorPicker.bind(this);
    this.handleChange = this._handleChange.bind(this);
  }

  _toggleColorPicker() {
    this.setState({ showColorPicker: !this.state.showColorPicker });
  }

  _handleChange(color) {
    this.props.changeColor(color.hex);
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
          <div>
            <PickerWrapper>
              <SketchPicker
                color={selectedColor}
                onChange={this.handleChange}
                disableAlpha
              />
            </PickerWrapper>
            <PickerContainer onClick={this.toggleColorPicker} />
          </div>
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
  padding: 0 10px;
`;

const ColorPicker = styled.div`
  background-color: ${props => props.color};
  border-radius: 5px;
  height: 20px;
  width: 30px;
`;

const PickerWrapper = styled.div`
  position: absolute;
  z-index: 999;
`;

const PickerContainer = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 998;
`;

BoardToolbarItemColorPicker.propTypes = {
  isDisabled: PropTypes.bool,
  changeColor: PropTypes.func,
  selectedColor: PropTypes.string
};

export default withBoard(BoardToolbarItemColorPicker);
