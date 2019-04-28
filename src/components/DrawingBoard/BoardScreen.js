import React from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEraser,
  faExpandArrowsAlt,
  faPencilAlt,
  faPencilRuler,
  faRedo,
  faShareSquare,
  faTh,
  faTrashAlt,
  faUndo
} from '@fortawesome/free-solid-svg-icons';

import Board from './Board';
import BoardToolbar from './BoardToolbar';
import { withBoard } from './BoardProvider';

library.add(
  faEraser,
  faExpandArrowsAlt,
  faPencilAlt,
  faPencilRuler,
  faRedo,
  faShareSquare,
  faTh,
  faTrashAlt,
  faUndo
);

const BoardScreen = () => (
  <BoardScreenStyled>
    <BoardToolbar />
    <Board />
  </BoardScreenStyled>
);

const BoardScreenStyled = styled.div`
  align-items: center;
  background-color: white;
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  user-select: none;
  width: 100vw;
  z-index: 10;
`;

// BoardScreen.propTypes = {
//   onSave: PropTypes.func // Used when saving canvas modifications
// };

// BoardScreen.defaultProps = {
//   onSave: () => {}{onSave}
// };

export default withBoard(BoardScreen);
