import React, { Component } from 'react';

import DrawMeAUnicorn from 'drawmeaunicorn';

export default class App extends Component {
  render() {
    return (
      <div
        style={{
          height: '100vh',
          width: '100vw',
          position: 'relative'
        }}
      >
        <DrawMeAUnicorn
          onSave={imgAsb64 => {
            console.log(imgAsb64);
          }}
        />
      </div>
    );
  }
}
