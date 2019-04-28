import React from 'react';
import PropTypes from 'prop-types';
import BoardScreen from './components/DrawingBoard/BoardScreen';
import BoardProvider from './components/DrawingBoard/BoardProvider';

const DrawMeAUnicorn = ({ onSave }) => (
  <BoardProvider>
    <BoardScreen onSave={onSave} />
  </BoardProvider>
);

DrawMeAUnicorn.propTypes = {
  onSave: PropTypes.func
};

DrawMeAUnicorn.defaultProps = {
  onSave: () => {}
};

export default DrawMeAUnicorn;
