export default [
  {
    label: 'Crayon',
    key: 'BOARD_PEN',
    type: 'DRAW',
    enable: true,
    order: 1,
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
