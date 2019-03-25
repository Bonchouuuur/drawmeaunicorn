export default [
  {
    label: 'Undo',
    key: 'BOARD_UNDO',
    type: 'ACTION',
    enable: true,
    order: 1,
  },
  {
    label: 'Redo',
    key: 'BOARD_REDO',
    type: 'ACTION',
    enable: true,
    order: 2,
  },
  {
    label: 'Pen',
    key: 'BOARD_PEN',
    type: 'DRAW',
    enable: true,
    order: 3,
    onClick: function({ canvas, ctx }) {
      ctx.strokeStyle = 'black';
    },
  },
  {
    label: 'Eraser',
    key: 'BOARD_ERASER',
    type: 'DRAW',
    enable: true,
    order: 4,
    onClick: function({ canvas, ctx }) {
      ctx.strokeStyle = 'white';
    },
  },
  {
    label: 'Hand',
    key: 'BOARD_MOVE',
    type: 'MANIPULATE',
    enable: true,
    order: 5,
  },
  {
    label: 'Clear',
    key: 'BOARD_CLEAR',
    type: 'ACTION',
    enable: true,
    order: 6,
    // onClick: function({ canvas, ctx }) {
    //   ctx.beginPath();
    //   ctx.fillStyle = 'white';
    //   ctx.fillRect(0, 0, canvas.width, canvas.height);
    //   ctx.closePath();
    // },
  },
  {
    label: 'Export',
    key: 'BOARD_EXPORT',
    type: 'ACTION',
    enable: true,
    order: 7,
  },
];
