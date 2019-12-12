import React, { Component } from 'react';
import './Main.scss';

import Sudoku from '../components/sudoku/Sudoku';
import GameOfLife from '../components/game-of-life/GameOfLife';

class Main extends Component {
  render() {
    return (
      <section className="main" id="main">
        <GameOfLife/>
        <Sudoku/>
      </section>
    );
  }
}

export default Main;
