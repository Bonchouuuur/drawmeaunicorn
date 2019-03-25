import React from 'react';
import PropTypes from 'prop-types';
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
  display: flex;
`;

const ModalHeaderCloseWrapper = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ModalHeaderTitleWrapper = styled.div`
  flex: 2;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  & > p {
    margin: 0;
    font-size: 16px;
    line-height: 16px;
  }
`;

ModalHeader.propTypes = {
  onClose: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
};

export default ModalHeader;
