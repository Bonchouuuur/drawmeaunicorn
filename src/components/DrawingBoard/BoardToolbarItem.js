import React, { Component } from 'react';
import styled from 'styled-components';

class BoardToolbarItem extends Component {
  render() {
    const { style, children, onClick } = this.props;
    return (
      <BoardToolbarItemWrapper style={style} onClick={onClick}>
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
`;

export default BoardToolbarItem;
