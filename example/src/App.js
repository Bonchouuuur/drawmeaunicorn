import React, { Component } from "react";

import ExampleComponent from "drawmeaunicorn";

export default class App extends Component {
  render() {
    return (
      <div>
        <ExampleComponent onSave={() => console.log("BOUM")} />
      </div>
    );
  }
}
