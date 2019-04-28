import React, { Component } from 'react';

import DrawMeAUnicorn from 'drawmeaunicorn';

export default class App extends Component {
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
