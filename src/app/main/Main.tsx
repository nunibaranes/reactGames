import React from 'react';
import './Main.scss';

import Sudoku from '../components/sudoku/Sudoku';
import GameOfLife from '../components/game-of-life/GameOfLife';
import Paint from '../components/paint/Paint';

export default function Main() {
  return (
    <section className="main" id="main">
      <GameOfLife/>
      <Sudoku/>
      <Paint/>
    </section>
  );
}