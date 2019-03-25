export default [
  {
    label: 'Crayon',
    key: 'BOARD_PEN',
    type: 'DRAW',
    enable: true,
    order: 1,
    // onClick: function({canvas, ctx}) {
    // }
  },
  {
    label: 'Gomme',
    key: 'BOARD_ERASER',
    type: 'DRAW',
    enable: false,
    order: 2,
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
    type: 'BOARD_ACTION',
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
  // {
  //   label: 'Ligne',
  //   key: 'BOARD_LINE',
  //   enable: false,
  //   order: 3,
  // },
  // {
  //   label: 'Rectangle',
  //   key: 'BOARD_RECT',
  //   enable: false,
  //   order: 3,
  // },
  // {
  //   label: 'Déplacer',
  //   key: 'BOARD_MOVE',
  //   enable: false,
  //   order: 4,
  // },
];
