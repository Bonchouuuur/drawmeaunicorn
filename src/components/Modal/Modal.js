import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';

const Modal = ({ children, onClose, title }) => {
  return (
    <ModalStyled>
      <ModalContainer>
        <ModalHeader
          className='bottom-bordered'
          onClose={onClose}
          title={title || 'Modal'}
        />
        <div>{children}</div>
        <ModalFooter onClose={onClose} className='top-bordered' />
      </ModalContainer>
    </ModalStyled>
  );
};

const ModalStyled = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 300;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  width: 70%;
`;

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  title: PropTypes.string
};

export default Modal;
