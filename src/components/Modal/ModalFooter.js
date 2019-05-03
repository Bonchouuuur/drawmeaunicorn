import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const ModalFooter = ({ onClose, className, closeLabel }) => {
  return (
    <ModalFooterStyled className={className}>
      <button onClick={onClose}>{closeLabel || 'Annuler'}</button>
    </ModalFooterStyled>
  );
};

const ModalFooterStyled = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding: 10px 15px;
`;

ModalFooter.propTypes = {
  className: PropTypes.string,
  closeLabel: PropTypes.string,
  onClose: PropTypes.func
};

export default ModalFooter;
