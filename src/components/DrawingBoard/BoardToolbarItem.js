import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class BoardToolbarItem extends Component {
  render() {
    const {
      children,
      isDisabled,
      isSelected,
      onClick,
      style,
      tool
    } = this.props;
    return (
      <BoardToolbarItemWrapper
        className={classNames({ selected: isSelected, disabled: isDisabled })}
        onClick={onClick}
        style={style}
      >
        <div
          className={classNames({ selected: isSelected, disabled: isDisabled })}
        >
          {tool.icon ? <FontAwesomeIcon icon={tool.icon} /> : children}
        </div>
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
  padding: 0 8px;
  &.selected {
    text-decoration: underline;
  }
  & > div {
    padding 10px 12px;
    &.selected {
      box-sizing: border-box;
      border: 1px solid grey;
    }
  }
  &.disabled {
    color: lightgray;
  }
`;

BoardToolbarItem.propTypes = {
  children: PropTypes.node,
  isDisabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  tool: PropTypes.object
};

export default BoardToolbarItem;
