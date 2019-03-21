import React, { Component } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

class BoardToolbarItem extends Component {
  render() {
    const { style, children, onClick, isDisabled, isSelected } = this.props;
    return (
      <BoardToolbarItemWrapper
        style={style}
        onClick={onClick}
        className={classNames({ selected: isSelected, disabled: isDisabled })}
      >
        {children}
      </BoardToolbarItemWrapper>
    );
  }
}

const BoardToolbarItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 5px;
  &.selected {
    text-decoration: underline;
  }
  cursor: pointer;
  &.disabled {
    cursor: not-allowed;
  }
`;

export default BoardToolbarItem;
