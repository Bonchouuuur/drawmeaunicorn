import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalFooter = ({ onClose, className }) => {
  return (
    <ModalFooterStyled className={className}>
      <button onClick={onClose}>Annuler</button>
    </ModalFooterStyled>
  );
};

const ModalFooterStyled = styled.div`
  display: flex;
  padding: 10px 15px;
  align-items: center;
  justify-content: flex-end;
`;

ModalFooter.propTypes = {
  onClose: PropTypes.func,
  className: PropTypes.string,
};

export default ModalFooter;
