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
  display: flex;
`;

const ModalHeaderCloseWrapper = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex: 15px 0 0;
  justify-content: center;
  padding: 5px 10px;
`;

const ModalHeaderTitleWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 2;
  justify-content: center;
  padding: 15px 35px;
  margin-left: -35px;
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
