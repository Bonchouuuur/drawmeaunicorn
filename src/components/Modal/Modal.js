import React from 'react';
import styled from 'styled-components';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';

const Modal = ({ children, onClose, title }) => {
  return (
    <ModalStyled>
      <ModalContainer>
        <ModalHeader
          title={title || 'Modal'}
          onClose={onClose}
          className="bottom-bordered"
        />
        <div>{children}</div>
        <ModalFooter onClose={onClose} className="top-bordered" />
      </ModalContainer>
    </ModalStyled>
  );
};

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 300;
`;

const ModalContainer = styled.div`
  width: 70%;
  border-radius: 5px;
  background-color: white;
  padding: 5px;
`;

export default Modal;
