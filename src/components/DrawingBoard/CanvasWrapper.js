import React, { Component } from 'react';

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
    this.props.initBoard({
      canvas: this.refs.canvas,
      wrapper: this.refs.canvascontainer,
    });
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
    return (
      <div
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseOut}
        onMouseUp={this.onMouseUp}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        onWheel={this.onWheel}
        ref="canvascontainer"
        style={{ backgroundColor: 'green' }}
      >
        <canvas
          ref="canvas"
          width={this.props.canvasDim}
          height={this.props.canvasDim}
        />
      </div>
    );
  }
}

export default CanvasWrapper;
