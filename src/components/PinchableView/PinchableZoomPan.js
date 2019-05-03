// Based on https://github.com/gerhardsletten/react-pinch-zoom-pan

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import throttle from 'lodash.throttle';
import { Observable } from 'rxjs';

function eventPreventDefault(event) {
  event.preventDefault();
}

function isTouch() {
  return (
    'ontouchstart' in window ||
    navigator.MaxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

function hasTwoTouchPoints(event) {
  if (isTouch()) {
    return event.touches && event.touches.length === 2;
  } else {
    return event.altKey;
  }
}

// function isZoomed(scale) {
//   return scale > 1;
// }

// function between(min, max, val) {
//   return Math.min(max, Math.max(min, val));
// }

function normalizeTouch(e) {
  const p = isTouch() ? e.touches[0] : e;
  return {
    x: p.clientX,
    y: p.clientY
  };
}

class PinchableZoomPan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: {
        scale: props.initialScale,
        x: 0,
        y: 0
      },
      isPinching: false
    };
    this.pinchTimeoutTimer = null;
  }

  resize() {
    if (this.root) {
      const domNode = this.root;
      this.setState({
        size: {
          width: domNode.offsetWidth,
          height: domNode.offsetHeight
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.pinchSubscription) {
      this.pinchSubscription = null;
    }
    global.removeEventListener('resize', this.resizeThrottled);
  }

  componentDidMount() {
    this.handlePinch();
    this.resize();
    this.resizeThrottled = throttle(() => this.resize(), 500);
    global.addEventListener('resize', this.resizeThrottled);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.obj.scale !== nextProps.initialScale) {
      const obj = { ...this.state.obj, scale: nextProps.initialScale };
      this.setState({ obj });
    }
  }

  handlePinch() {
    const domNode = this.root;
    const touchStart = Observable.fromEvent(
      domNode,
      isTouch() ? 'touchstart' : 'mousedown'
    );
    const touchMove = Observable.fromEvent(
      window,
      isTouch() ? 'touchmove' : 'mousemove'
    );
    const touchEnd = Observable.fromEvent(
      window,
      isTouch() ? 'touchend' : 'mouseup'
    );

    function translatePos(point, size) {
      return {
        x: point.x - size.width / 2,
        y: point.y - size.height / 2
      };
    }

    let startX = 0;
    let startY = 0;

    const pinch = touchStart
      .do(event => {
        if (this.props.enableManipulation) {
          const { scale } = this.state.obj;
          startX = this.state.obj.x;
          startY = this.state.obj.y;
          if (
            hasTwoTouchPoints(event) ||
            scale > Math.min(this.props.minScale, this.props.initialScale)
          ) {
            eventPreventDefault(event);
          }
        }
      })
      .mergeMap(md => {
        if (this.props.enableManipulation) {
          const startPoint = normalizeTouch(md);
          const { size } = this.state;

          return touchMove
            .map(mm => {
              const { scale, x, y } = this.state.obj;
              const { maxScale } = this.props;
              const movePoint = normalizeTouch(mm);
              console.log(' SALUT JE SUIS LE MAX ', maxScale);
              if (hasTwoTouchPoints(mm)) {
                const scaleFactor =
                  isTouch() && mm.scale
                    ? mm.scale
                    : movePoint.x < size.width / 2
                    ? scale +
                      (translatePos(startPoint, size).x -
                        translatePos(movePoint, size).x) /
                        size.width
                    : scale +
                      (translatePos(movePoint, size).x -
                        translatePos(startPoint, size).x) /
                        size.width;
                const nextScale = Math.min(maxScale, scaleFactor);
                console.log(' NEXT SCALE : ', {
                  maxScale,
                  scaleFactor
                });
                return {
                  scale: nextScale,
                  x: nextScale < 1.01 ? 0 : x,
                  y: nextScale < 1.01 ? 0 : y
                };
              } else {
                console.log(' COUCOU JE SUIS PAR ICI JE SAIS PAS POURQUOI ');
                return {
                  x: movePoint.x - startPoint.x + startX,
                  y: movePoint.y - startPoint.y + startY
                };
              }
            })
            .takeUntil(touchEnd);
        } else {
          return touchMove;
        }
      });
    this.pinchSubscription = pinch.subscribe(newObject => {
      if (!!newObject.scale && this.state.obj.scale !== newObject.scale) {
        this.refreshPinchTimeoutTimer();
      }
      global.requestAnimationFrame(() => {
        this.setState({
          obj: Object.assign({}, this.state.obj, newObject)
        });
      });
    });
  }

  refreshPinchTimeoutTimer() {
    if (this.pinchTimeoutTimer) {
      clearTimeout(this.pinchTimeoutTimer);
    }
    if (!this.state.isPinching) {
      this.pinchStarted();
    }
    this.pinchTimeoutTimer = setTimeout(() => this.pinchStopped(), 500);
  }

  pinchStopped() {
    if (this.props.enableManipulation) {
      this.setState(
        {
          isPinching: false
        },
        () => {
          this.pinchTimeoutTimer = null;
          this.props.onPinchStop && this.props.onPinchStop(this.state.obj);
        }
      );
    }
  }

  pinchStarted() {
    if (this.props.enableManipulation) {
      this.setState(
        {
          isPinching: true
        },
        () => {
          this.props.onPinchStart && this.props.onPinchStart();
        }
      );
    }
  }

  render() {
    const { scale, x, y } = this.state.obj;
    return (
      <div
        ref={root => {
          this.root = root;
        }}
        style={{ height: '100%' }}
      >
        {this.props.render({
          x: x.toFixed(2),
          y: y.toFixed(2),
          scale: scale.toFixed(2)
        })}
      </div>
    );
  }
}

PinchableZoomPan.defaultProps = {
  enableManipulation: true,
  initialScale: 1,
  maxScale: 2,
  minScale: 1
};

PinchableZoomPan.propTypes = {
  enableManipulation: PropTypes.bool,
  initialScale: PropTypes.number,
  maxScale: PropTypes.number,
  onPinchStart: PropTypes.func,
  onPinchStop: PropTypes.func,
  render: PropTypes.func,
  minScale: PropTypes.number
};

export default PinchableZoomPan;
