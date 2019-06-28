import Popover from 'react-popover';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { withBoard } from './BoardProvider';

class BoardToolbarItemPopover extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isOpen: false
    };
    this.togglePopover = this._togglePopover.bind(this);
  }

  _togglePopover() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { style, isDisabled, isSelected, tool } = this.props;
    const { isOpen } = this.state;
    const classes = classNames({ selected: isSelected, disabled: isDisabled });
    return (
      <BoardToolbarItemWrapper
        className={classes}
        onClick={this.showPop}
        style={style}
      >
        <Popover
          body={<tool.Component toggleContent={this.togglePopover} />}
          isOpen={isOpen}
          onOuterAction={this.togglePopover}
          preferPlace='below'
        >
          {tool.icon && (
            <FontAwesomeIcon icon={tool.icon} onClick={this.togglePopover} />
          )}
        </Popover>
      </BoardToolbarItemWrapper>
    );
  }
}

const BoardToolbarItemWrapper = styled.div`
  align-items: center;
  color: black;
  cursor: pointer;
  display: flex;
  font-size: 18px;
  justify-content: center;
  padding: 0 20px;
  &.selected {
    border: 1px solid grey;
    box-sizing: border-box;
    text-decoration: underline;
  }
  &.disabled {
    color: lightgray;
  }
`;

BoardToolbarItemPopover.propTypes = {
  isDisabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  style: PropTypes.object,
  tool: PropTypes.object
};

export default withBoard(BoardToolbarItemPopover);
