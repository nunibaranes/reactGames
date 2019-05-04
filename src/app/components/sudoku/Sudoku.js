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
          puzzel: [],
          cellWidth: '20', // TODO: add button to change cellWidth
          cellHeight: '20', // TODO: add button to change cellHeight
          defaultColor: 'red', // TODO: add button to change color
        },
        boardStatus: [],
    };
  }

  render() {
    const { title, boardData, boardStatus } = this.state;
    return (
      <section className="sudoku wrapper wrap-with-border">
        <Title additionalClass={'main-title'} title={ title }></Title>
        <Board 
          boardData={ boardData }
          board={ boardStatus }></Board>
      </section>
    );
  }
}

export default Sudoku;
