# drawmeaunicorn

> Simple drawer that allows you to draw a unicorn at anytime anywhere

## Install

```bash
npm install --save https://github.com/Bonchouuuur/drawmeaunicorn.git
```

## Usage

```jsx
import React, { Component } from 'react';
import DrawMeAUnicorn from 'drawmeaunicorn';

class MyComponent extends Component {
  render() {
    return (
      <DrawMeAUnicorn
        onSave={imgAsb64 => {
          console.log(imgAsb64);
        }}
      />
    );
  }
}
```

## Props

| Name          | Type            | Required (default value) | What for                                          |
| ------------- | --------------- | ------------------------ | ------------------------------------------------- |
| onSave        | Function        | -                        | Callback when user exports its drawing            |
| backgroundImg | String (base64) | -                        | Image to load instead of a plain white background |

## License

MIT © [Bonchouuur](https://github.com/Bonchouuur)
