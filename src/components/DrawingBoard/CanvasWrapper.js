import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';

import { withBoard } from './BoardProvider';

class CanvasWrapper extends Component {
  constructor(props, context) {
    super(props, context);
    this.getScaledPosition = this._getScaledPosition.bind(this);
    this.onMouseDown = this._onMouseDown.bind(this);
    this.onMouseMove = this._onMouseMove.bind(this);
    this.onMouseOut = this._onMouseOut.bind(this);
    this.onMouseUp = this._onMouseUp.bind(this);
    this.onTouchEnd = this._onTouchEnd.bind(this);
    this.onTouchMove = this._onTouchMove.bind(this);
    this.onTouchStart = this._onTouchStart.bind(this);
    this.onWheel = this._onWheel.bind(this);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvas.current;
    const ctx = this.canvas.current.getContext('2d');
    this.props.initBoard({
      canvas,
      ctx
    });
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
  }

  _onMouseDown(e) {
    this.props.onMouseDown &&
      this.props.onMouseDown(e, this.getScaledPosition());
  }

  _onMouseUp(e) {
    this.props.onMouseUp && this.props.onMouseUp(e, this.getScaledPosition());
  }

  _onMouseMove(e) {
    this.props.onMouseMove &&
      this.props.onMouseMove(e, this.getScaledPosition());
  }

  _onMouseOut(e) {
    this.props.onMouseOut && this.props.onMouseOut(e, this.getScaledPosition());
  }

  _onTouchStart(e) {
    this.props.onTouchStart &&
      this.props.onTouchStart(e, this.getScaledPosition());
  }

  _onTouchMove(e) {
    this.props.onTouchMove &&
      this.props.onTouchMove(e, this.getScaledPosition());
  }

  _onTouchEnd(e) {
    this.touchMap = null;
    this.props.onTouchEnd && this.props.onTouchEnd(e, this.getScaledPosition());
  }

  _onWheel(e) {
    this.props.onWheel && this.props.onWheel(e, this.getScaledPosition());
  }

  _getScaledPosition() {
    const { x, y } = this.props.position;
    const scale = this.props.scaleObject ? this.props.scaleObject.scale : 1;
    return { x: x / scale, y: y / scale };
  }

  render() {
    const { canvasDim, gridOptions } = this.props;
    return (
      <div
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseOut}
        onMouseUp={this.onMouseUp}
        onTouchEnd={this.onTouchEnd}
        onTouchMove={this.onTouchMove}
        onTouchStart={this.onTouchStart}
        onWheel={this.onWheel}
        style={{ position: 'relative' }}
      >
        <canvas ref={this.canvas} width={canvasDim} height={canvasDim} />
        <GridPower gridOptions={gridOptions} />
      </div>
    );
  }
}

const GridPower = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  ${({ gridOptions }) =>
    gridOptions.display &&
    `
    background:
        linear-gradient(-90deg, rgba(0, 0, 0, .03) 1px, transparent 1px),
        linear-gradient(rgba(0, 0, 0, .03) 1px, transparent 1px),
        linear-gradient(-90deg, rgba(0, 0, 0, .03) 1px, transparent 1px),
        linear-gradient(rgba(0, 0, 0, .03) 1px, transparent 1px),
        linear-gradient(transparent 3px, transparent 3px, transparent 78px, transparent 78px),
        linear-gradient(-90deg, transparent 1px, transparent 1px),
        linear-gradient(-90deg, transparent 3px, transparent 3px, transparent 78px, transparent 78px),
        linear-gradient(transparent 1px, transparent 1px), transparent;
    background-size:
        ${gridOptions.size}px ${gridOptions.size}px,
        ${gridOptions.size}px ${gridOptions.size}px,
        ${gridOptions.size}px ${gridOptions.size}px,
        ${gridOptions.size}px ${gridOptions.size}px,
        ${gridOptions.size}px ${gridOptions.size}px,
        ${gridOptions.size}px ${gridOptions.size}px,
        ${gridOptions.size}px ${gridOptions.size}px,
        ${gridOptions.size}px ${gridOptions.size}px;
  `}
`;

CanvasWrapper.propTypes = {
  canvasDim: PropTypes.number,
  gridOptions: PropTypes.object,
  initBoard: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseUp: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchStart: PropTypes.func,
  onWheel: PropTypes.func,
  position: PropTypes.object,
  scaleObject: PropTypes.object
};

CanvasWrapper.defaultProps = {
  onMouseDown: null,
  onMouseMove: null,
  onMouseOut: null,
  onMouseUp: null,
  onTouchEnd: null,
  onTouchMove: null,
  onTouchStart: null,
  onWheel: null
};

export default withBoard(CanvasWrapper);
