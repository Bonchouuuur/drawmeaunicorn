import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { withBoard } from '../BoardProvider';

const WIDTHS = [
  { key: 'THE_SMALLER', value: 1 },
  { key: 'SMALL', value: 5 },
  { key: 'MEDIUM', value: 10 },
  { key: 'LARGER', value: 15 },
  { key: 'THE_LARGER', value: 20 }
];

const BrushWidth = ({ brushOptions, toggleContent, updateBrushOptions }) => {
  const handleUpdateSize = function(lineWidth) {
    updateBrushOptions({ width: lineWidth });
    toggleContent();
  };

  return (
    <BrushWidthContainer>
      {WIDTHS.map(wid => (
        <div
          key={`size-selector-${wid.key}`}
          className={
            brushOptions.width === wid.value
              ? 'current-selection'
              : 'default-option'
          }
          onClick={() => handleUpdateSize(wid.value)}
        >
          <BrushLevelSelector>
            <div style={{ height: wid.value }} />
          </BrushLevelSelector>
        </div>
      ))}
    </BrushWidthContainer>
  );
};

const BrushWidthContainer = styled.div`
  min-width: 140px;
  text-align: center;
  user-select: none;
  & > div  {
    cursor: pointer;
    &.default-option {
    }
    &.current-selection {
      background-color: #f6f6f6;
    }
  }
`;

const BrushLevelSelector = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  & > div {
    background-color: black;
    margin: 16px 0;
    width: 50px;
  }
`;

BrushWidth.propTypes = {
  brushOptions: PropTypes.object,
  toggleContent: PropTypes.func,
  updateBrushOptions: PropTypes.func
};

BrushWidth.defaultProps = {
  brushOptions: { width: null },
  toggleContent: () => {},
  updateBrushOptions: () => {}
};

export default withBoard(BrushWidth);
