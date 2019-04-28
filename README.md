# drawmeaunicorn

> Simple drawer that allows you to draw a unicorn at anytime everywhere

## Install

```bash
npm install --save drawmeaunicorn
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

## License

MIT © [Bonchouuur](https://github.com/Bonchouuur)
