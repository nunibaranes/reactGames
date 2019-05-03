import React, { Component } from 'react';
import './Main.scss';

// import ColorPicker from '../components/color-picker/ColorPicker';
// import Sudoku from '../components/sudoku/Sudoku';
import GameOfLife from '../components/game-of-life/GameOfLife';

class Main extends Component {
  render() {
    return (
      <section className="main" id="main">
        <GameOfLife></GameOfLife>    
      </section>
    );
  }
}

export default Main;
