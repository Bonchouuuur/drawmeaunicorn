// Based on https://github.com/gerhardsletten/react-pinch-zoom-pan

import PinchableZoomPan from './PinchableZoomPan';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const PinchableView = ({
  children,
  containerClassName,
  enableManipulation,
  holderClassName,
  initialScale,
  maxScale,
  minScale,
  onPinchStart,
  onPinchStop
}) => (
  <PinchableZoomPan
    enableManipulation={enableManipulation}
    initialScale={initialScale}
    maxScale={maxScale}
    minScale={minScale}
    onPinchStart={onPinchStart}
    onPinchStop={onPinchStop}
    render={obj => {
      return (
        <MainContainerStyled className={holderClassName}>
          <ContainerStyled className={containerClassName}>
            <SubContainerStyled>
              <MainContentStyled obj={obj} minScale={minScale}>
                {children}
              </MainContentStyled>
            </SubContainerStyled>
          </ContainerStyled>
        </MainContainerStyled>
      );
    }}
  />
);

const MainContainerStyled = styled.div`
  position: relative;
  height: 100%;
`;

const ContainerStyled = styled.div`
  background-color: #f2f2f2;
  overflow: hidden;
  padding-top: 100%;
  position: relative;
  height: 100%;
`;

const SubContainerStyled = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const MainContentStyled = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  transform: scale(${props => props.obj.scale})
    translateY(
      ${props =>
        parseFloat(props.obj.scale) === parseFloat(props.minScale)
          ? 0
          : props.obj.y}px
    )
    translateX(
      ${props =>
        parseFloat(props.obj.scale) === parseFloat(props.minScale)
          ? 0
          : props.obj.x}px
    );
  transition: 0.3s ease-out;
  width: 100%;
`;

PinchableView.defaultProps = {
  containerRatio: 100,
  enableManipulation: true,
  initialScale: 1,
  maxScale: 2,
  minScale: 1
};

PinchableView.propTypes = {
  children: PropTypes.element,
  containerClassName: PropTypes.string,
  enableManipulation: PropTypes.bool,
  holderClassName: PropTypes.string,
  initialScale: PropTypes.number,
  maxScale: PropTypes.number,
  minScale: PropTypes.number,
  onPinchStart: PropTypes.func,
  onPinchStop: PropTypes.func
};

export default PinchableView;
