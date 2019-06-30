import PropTypes from 'prop-types';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

import BoardScreen from './components/DrawingBoard/BoardScreen';
import BoardProvider from './components/DrawingBoard/BoardProvider';

const GlobalStyle = createGlobalStyle`
.top-bordered {
  border-top: 1px solid #dbdbdb;
}

.left-bordered {
  border-left: 1px solid #dbdbdb;
}

.right-bordered {
  border-right: 1px solid #dbdbdb;
}

.bottom-bordered {
  border-bottom: 1px solid #dbdbdb;
}

.Popover {
  z-index: 99999;
}

.Popover-body {
  background-color: white;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
}

.Popover-tipShape {
  fill: #dbdbdb;
}
`;

const DrawMeAUnicorn = ({ onSave, backgroundImg }) => (
  <BoardProvider backgroundImg={backgroundImg}>
    <GlobalStyle />
    <BoardScreen onSave={onSave} />
  </BoardProvider>
);

DrawMeAUnicorn.propTypes = {
  backgroundImg: PropTypes.string,
  onSave: PropTypes.func
};

DrawMeAUnicorn.defaultProps = {
  backgroundImg: null,
  onSave: () => {}
};

export default DrawMeAUnicorn;
