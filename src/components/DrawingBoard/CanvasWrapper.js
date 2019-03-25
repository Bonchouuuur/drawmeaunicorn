import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withBoard } from './BoardProvider';

class CanvasWrapper extends Component {
  constructor(props, context) {
    super(props, context);
    this.onMouseDown = this._onMouseDown.bind(this);
    this.onMouseMove = this._onMouseMove.bind(this);
    this.onMouseOut = this._onMouseOut.bind(this);
    this.onMouseUp = this._onMouseUp.bind(this);
    this.onTouchStart = this._onTouchStart.bind(this);
    this.onTouchMove = this._onTouchMove.bind(this);
    this.onTouchEnd = this._onTouchEnd.bind(this);
    this.getScaledPosition = this._getScaledPosition.bind(this);
    this.onWheel = this._onWheel.bind(this);
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = this.refs.canvas.getContext('2d');
    this.props.initBoard({
      canvas,
      ctx,
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
    const { canvasDim } = this.props;
    return (
      <canvas
        ref="canvas"
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseOut}
        onMouseUp={this.onMouseUp}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        onWheel={this.onWheel}
        width={canvasDim}
        height={canvasDim}
      />
    );
  }
}

CanvasWrapper.propTypes = {
  // canvasDim: PropTypes.number.isRequired,
  // initBoard: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
  onTouchStart: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onWheel: PropTypes.func,
};

CanvasWrapper.defaultProps = {
  onMouseDown: null,
  onMouseMove: null,
  onMouseOut: null,
  onTouchStart: null,
  onTouchMove: null,
  onTouchEnd: null,
  onWheel: null,
};

export default withBoard(CanvasWrapper);
