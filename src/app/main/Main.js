import React, { Component } from 'react';
import './Main.css';

import ColorPicker from '../color-picker/ColorPicker';

class Main extends Component {
  render() {
    return (
      <section className="main" id="main">
          <ColorPicker></ColorPicker>
      </section>
    );
  }
}

export default Main;
