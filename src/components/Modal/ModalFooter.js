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
  button {
    background-color: #e7e7e7;
    border: none;
    color: black;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
  }
`;

ModalFooter.propTypes = {
  className: PropTypes.string,
  closeLabel: PropTypes.string,
  onClose: PropTypes.func
};

export default ModalFooter;
