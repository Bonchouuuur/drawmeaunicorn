import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEraser,
  faExpandArrowsAlt,
  faPencilAlt,
  faPencilRuler,
  faRedo,
  faSave,
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
  faSave,
  faShareSquare,
  faTh,
  faTrashAlt,
  faUndo
);

const BoardScreen = ({ onSave }) => (
  <BoardScreenStyled className='DrawMeAUnicorn-MainBoard'>
    <BoardToolbar onSave={onSave} />
    <Board />
  </BoardScreenStyled>
);

const BoardScreenStyled = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  user-select: none;
  z-index: 10;
`;

BoardScreen.propTypes = {
  onSave: PropTypes.func
};

export default withBoard(BoardScreen);
