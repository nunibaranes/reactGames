import React, { Component } from 'react';
import './Main.scss';

// import ColorPicker from '../components/color-picker/ColorPicker';
import Sudoku from '../components/sudoku/Sudoku';

class Main extends Component {
  render() {
    return (
      <section className="main" id="main">
        <Sudoku></Sudoku>
      </section>
    );
  }
}

export default Main;
