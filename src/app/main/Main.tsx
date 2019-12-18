import React from 'react';
import './Main.scss';

import Sudoku from '../components/sudoku/Sudoku';
import GameOfLife from '../components/game-of-life/GameOfLife';

export default function Main() {
  return (
    <section className="main" id="main">
      <GameOfLife/>
      <Sudoku/>
    </section>
  );
}