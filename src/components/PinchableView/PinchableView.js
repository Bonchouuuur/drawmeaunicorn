// Based on https://github.com/gerhardsletten/react-pinch-zoom-pan

import React from 'react';
import PropTypes from 'prop-types';
import PinchableZoomPan from './PinchableZoomPan';
import styled from 'styled-components';

const PinchableView = ({
  initialScale,
  maxScale,
  holderClassName,
  containerClassName,
  children,
  onPinchStart,
  onPinchStop,
  enableManipulation,
}) => (
  <PinchableZoomPan
    initialScale={initialScale}
    maxScale={maxScale}
    render={obj => {
      return (
        <MainContainerStyled className={holderClassName}>
          <ContainerStyled className={containerClassName}>
            <SubContainerStyled>
              <MainContentStyled obj={obj}>{children}</MainContentStyled>
            </SubContainerStyled>
          </ContainerStyled>
        </MainContainerStyled>
      );
    }}
    onPinchStart={onPinchStart}
    onPinchStop={onPinchStop}
    enableManipulation={enableManipulation}
  />
);

const MainContainerStyled = styled.div`
  position: relative;
`;

const ContainerStyled = styled.div`
  padding-top: 100%;
  overflow: hidden;
  position: relative;
  background: '#f2f2f2';
`;

const SubContainerStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const MainContentStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: purple;
  transform: scale(${props => props.obj.scale})
    translateY(${props => props.obj.y}px) translateX(${props => props.obj.x}px);
  transition: 0.3s ease-out;
`;

PinchableView.defaultProps = {
  initialScale: 1,
  maxScale: 2,
  containerRatio: 100,
  enableManipulation: true,
};

PinchableView.propTypes = {
  containerRatio: PropTypes.number,
  initialScale: PropTypes.number,
  maxScale: PropTypes.number,
  children: PropTypes.element,
  containerClassName: PropTypes.string,
  holderClassName: PropTypes.string,
  onPinchStart: PropTypes.func,
  onPinchStop: PropTypes.func,
  enableManipulation: PropTypes.bool,
};

export default PinchableView;
