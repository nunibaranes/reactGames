import React, { Component } from 'react';
import './Sudoku.scss';
import Title from '../common/title/Title.js';
import Board from '../common/board/Board.js';

class Sudoku extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
        title: 'Sudoku Game',
        boardData: {
          rows: 9,
          columns: 9,
          puzzel: []
        }
    };
  }

  render() {
    const { title, boardData } = this.state;
    return (
      <section className="sudoku wrapper wrap-with-border">
        <Title title={ title }></Title>
        <Board boardData={ boardData }></Board>
      </section>
    );
  }
}

export default Sudoku;
