export default [
  {
    label: 'Crayon',
    key: 'BOARD_PEN',
    type: 'DRAW',
    enable: true,
    order: 1,
    onClick: function({ canvas, ctx }) {
      ctx.strokeStyle = 'black';
    },
  },
  {
    label: 'Gomme',
    key: 'BOARD_ERASER',
    type: 'DRAW',
    enable: true,
    order: 2,
    onClick: function({ canvas, ctx }) {
      ctx.strokeStyle = 'white';
    },
  },
  {
    label: 'Main',
    key: 'BOARD_MOVE',
    type: 'MANIPULATE',
    enable: true,
    order: 3,
  },
  {
    label: 'Vider',
    key: 'BOARD_CLEAR',
    type: 'ACTION',
    enable: true,
    order: 4,
    onClick: function({ canvas, ctx }) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
  },
  {
    label: 'Export',
    key: 'BOARD_EXPORT',
    type: 'ACTION',
    enable: true,
    order: 5,
  },
];
