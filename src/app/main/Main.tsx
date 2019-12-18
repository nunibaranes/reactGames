import React from 'react';
import './Main.scss';

import Sudoku from '../components/sudoku/Sudoku';
import GameOfLife from '../components/game-of-life/GameOfLife';

function Main() {
  return (
    <section className="main" id="main">
      <GameOfLife/>
      <Sudoku/>
    </section>
  );
}

export default Main;
