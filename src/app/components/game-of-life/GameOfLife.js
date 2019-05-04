import React, { Component } from 'react';
import './GameOfLife.scss';
import Title from '../common/title/Title.js';
import Board from '../common/board/Board.js';

class Sudoku extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
        value: 'Game Of Life',
        boardData: {
          rows: 20,
          columns: 20,
          cellData: {
            width: '30px',
            height: '30px',
            isActive: false,
          },
          defaultColor: 'black',
        },
        boardStatus: [],
    };
  }

  cellClicked = (cellObj) => {
      const { boardStatus } = this.state;
      const updatedBoard = boardStatus.map((row) => {
          row.map(cell => {
              if (cell === cellObj) {
                  cell.isActive = !cellObj.isActive;
                  return {...cell, ...cell.isActive}
              }
              return cell;
          })
          return row;
      }); 
      this.setState({boardStatus: updatedBoard})
  }

  boardGenerated = (generatedBoard) => {
    this.setState({boardStatus: generatedBoard})
  }

  render() {
    const { value, boardData} = this.state;
    return (
      <section className="game-of-life wrapper wrap-with-border">
        <Title value={ value }></Title>
        <Board 
          boardData={ boardData }
          cellClicked={ this.cellClicked }
          boardGenerated={ this.boardGenerated}
          >
        </Board>
      </section>
    );
  }
}

export default Sudoku;
