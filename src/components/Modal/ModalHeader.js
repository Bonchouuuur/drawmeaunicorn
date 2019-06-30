import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const ModalHeader = ({ title, onClose, className }) => {
  return (
    <ModalHeaderStyled className={className}>
      <ModalHeaderCloseWrapper onClick={onClose}>X</ModalHeaderCloseWrapper>
      <ModalHeaderTitleWrapper>
        <p>{title}</p>
      </ModalHeaderTitleWrapper>
    </ModalHeaderStyled>
  );
};

const ModalHeaderStyled = styled.div`
  position: relative;
`;

const ModalHeaderCloseWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalHeaderTitleWrapper = styled.div`
  padding: 15px 35px;
  text-align: center;
  & > p {
    font-size: 16px;
    line-height: 16px;
    margin: 0;
  }
`;

ModalHeader.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  title: PropTypes.string
};

export default ModalHeader;
