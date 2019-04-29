import React from 'react';

import BrushWidth from './Popovers/BrushWidth';
import GridPopover from './Popovers/GridPopover';

const tools = [
  {
    label: 'Actions',
    groupKey: 'GP_ACTIONS',
    tools: [
      {
        enable: true,
        icon: 'save',
        key: 'BOARD_SAVE',
        label: 'Save',
        order: 0,
        type: 'ACTION'
      },
      {
        enable: true,
        icon: 'undo',
        key: 'BOARD_UNDO',
        label: 'Undo',
        order: 1,
        type: 'ACTION'
      },
      {
        enable: true,
        icon: 'redo',
        key: 'BOARD_REDO',
        label: 'Redo',
        order: 2,
        type: 'ACTION'
      },
      {
        enable: true,
        icon: 'trash-alt',
        key: 'BOARD_CLEAR',
        label: 'Clear',
        type: 'ACTION'
      }
    ]
  },
  {
    label: 'Zoom',
    groupKey: 'GP_MANIPULATIONS',
    tools: [
      {
        enable: true,
        icon: 'expand-arrows-alt',
        key: 'BOARD_MOVE',
        label: 'Hand',
        order: 5,
        type: 'MANIPULATE'
      }
    ]
  },
  {
    label: 'Grille',
    groupKey: 'GP_GRID',
    tools: [
      {
        Component: ({ toggleContent }) => (
          <GridPopover toggleContent={toggleContent} />
        ),
        enable: true,
        icon: 'th',
        key: 'BOARD_TOGGLE_GRID',
        label: 'Afficher',
        menuType: 'POPOVER',
        order: 5,
        type: 'ACTION'
      }
    ]
  },
  {
    label: 'Dessin',
    groupKey: 'GP_DRAW',
    tools: [
      {
        enable: true,
        icon: 'pencil-alt',
        key: 'BOARD_PEN',
        label: 'Pen',
        onClick: function({ canvas, ctx }) {
          ctx.strokeStyle = 'black';
        },
        order: 3,
        type: 'DRAW'
      },
      {
        enable: true,
        icon: 'eraser',
        key: 'BOARD_ERASER',
        label: 'Eraser',
        onClick: function({ canvas, ctx }) {
          ctx.strokeStyle = 'white';
        },
        order: 4,
        type: 'DRAW'
      }
    ]
  },
  {
    label: 'Épaisseur',
    groupKey: 'GP_DRAWSIZE',
    tools: [
      {
        Component: ({ toggleContent }) => (
          <BrushWidth toggleContent={toggleContent} />
        ),
        enable: true,
        icon: 'pencil-ruler',
        key: 'BOARD_CHANGE_BRUSH_WIDTH',
        label: 'KKK',
        menuType: 'POPOVER',
        order: 3,
        type: 'ACTION'
      }
    ]
  },
  {
    label: 'Couleur',
    groupKey: 'GP_DRAWCOLOR',
    tools: [
      {
        enable: true,
        key: 'BOARD_COLOR_PICKER',
        label: 'Colorpicker',
        order: 3,
        type: 'ACTION'
      }
    ]
  }
];

export function getDefaultTool() {
  return tools.find(toolGroup => toolGroup.groupKey === 'GP_DRAW').tools[0];
}

export default tools;
