import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { withBoard } from '../BoardProvider';

const SIZES = [
  { label: 'Petite', value: 10 },
  { label: 'Moyenne', value: 50 },
  { label: 'Grande', value: 100 }
];

const GridPopover = ({ gridOptions, updateGridOptions, toggleContent }) => {
  const handleHide = function() {
    updateGridOptions({ display: false });
    toggleContent();
  };

  const handleUpdateSize = function(size) {
    updateGridOptions({ display: true, size });
    toggleContent();
  };

  return (
    <GridPopoverContainer>
      <p
        className={gridOptions.display ? 'default-option' : 'current-selection'}
        onClick={() => handleHide()}
      >
        Masquer
      </p>
      {SIZES.map(size => (
        <p
          key={`size-selector-${size.label}`}
          className={
            gridOptions.display && gridOptions.size === size.value
              ? 'current-selection'
              : 'default-option'
          }
          onClick={() => handleUpdateSize(size.value)}
        >
          {size.label}
        </p>
      ))}
    </GridPopoverContainer>
  );
};

const GridPopoverContainer = styled.div`
  min-width: 140px;
  text-align: center;
  user-select: none;
  & > p  {
    cursor: pointer;
    margin: 0;
    padding: 16px 0;
    &.current-selection {
      background-color: #f6f6f6;
    }
  }
`;

GridPopover.propTypes = {
  gridOptions: PropTypes.object,
  toggleContent: PropTypes.func,
  updateGridOptions: PropTypes.func
};

GridPopover.defaultProps = {
  gridOptions: { display: null, size: null },
  toggleContent: () => {},
  updateGridOptions: () => {}
};

export default withBoard(GridPopover);
