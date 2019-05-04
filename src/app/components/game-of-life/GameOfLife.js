import React, { Component } from 'react';
import './GameOfLife.scss';
import Title from '../common/title/Title.js';
import Board from '../common/board/Board.js';

class GameOfLife extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
        value: 'Game Of Life',
        boardData: {
          rows: 20,
          columns: 20,
          cellData: {
            isActive: false,
          },
          cellWidth: '30px',
          cellHeight: '30px',
          defaultColor: 'black',
        },
        boardStatus: [],
    };
  }

  toggleCellIsActiveStatus (prevStateBoardStatus, cellObj) {
    const clonedBoardStatus = JSON.parse(JSON.stringify(prevStateBoardStatus));

    if (cellObj) {
      const cell = clonedBoardStatus[cellObj.x][cellObj.y];
      cell.isActive = !cell.isActive;
    } else {
      for(let x = 0; x < clonedBoardStatus.length; x++) {
        for(let y = 0; y < clonedBoardStatus.length; y++) {
          const cell = clonedBoardStatus[x][y];
          cell.isActive = false;
        }
      }
    }
    return clonedBoardStatus;
  }

  cellClicked = (cellObj) => {
    console.log('cellClicked setState')
    this.setState(prevState => ({
        boardStatus: this.toggleCellIsActiveStatus(prevState.boardStatus, cellObj)
    }));
  }

  checkNeighbors = (boardStatus, x, y) => {
    const { boardData } = this.state;
    const { rows, columns } = boardData;
    let neighborsCounter = 0;
    const neighborsOptions = [
      [-1, -1],   // left bottom cell neighbor
      [-1, 0],    // left cell neighbor
      [-1, 1],    // left top cell neighbor
      [0, 1],     // top cell neighbor
      [1, 1],     // right top cell neighbor
      [1, 0],     // right cell neighbor
      [1, -1],    // right bottom cell neighbor
      [0, -1],    // bottom cell neighbor
    ];

    for (let i = 0; i < neighborsOptions.length; i++) {
      const neighbor = neighborsOptions[i];
      let neighborY = y + neighbor[0];
      let neighborX = x + neighbor[1];
      const hasNeighbor = neighborX >= 0            // neighbor x position bigger than 0
                          && neighborX < columns    // neighbor x position smaller than total columns number
                          && neighborY >= 0         // neighbor y position bigger than 0
                          && neighborY < rows       // neighbor y position smaller than total rows number
                          && boardStatus[neighborX][neighborY].isActive; // neighbore isActive equal to true

      if (hasNeighbor) {
        neighborsCounter++;
      }
    }
    return neighborsCounter;
  }

  setNextGeneration = () => {
    const { boardData, boardStatus } = this.state;
    const { rows, columns } = boardData;
    const newBoard = this.toggleCellIsActiveStatus(this.state.boardStatus, null);

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y< columns; y++) {
            const activeNeighbors = this.checkNeighbors(boardStatus, x,y);
            const cell = boardStatus[x][y];
            const newBoardCell = newBoard[x][y];
            newBoardCell.isActive = this.nextGenerationCellIsActive(cell, activeNeighbors)
        }
    }

    this.setState({boardStatus: newBoard});
  }

  nextGenerationCellIsActive = (cell, activeNeighbors) => {
    if (cell.isActive) {
      if (activeNeighbors < 2 || activeNeighbors > 3) {
        return false;
      } else {
        return true;
      }
    } else {
      if (activeNeighbors === 3) {
         return true;
      }
    }
  }

  boardGenerated = (generatedBoard) => {
    console.log('boardGenerated setState to generatedBoard ', generatedBoard);
    this.setState({boardStatus: generatedBoard})
  }

  render() {
    const { value, boardData, boardStatus} = this.state;
    return (
      <section className='game-of-life wrapper wrap-with-border'>
        <Title value={ value }></Title>
        <Board 
          boardData={ boardData }
          board={ boardStatus }
          cellClicked={ this.cellClicked }
          boardGenerated={this.boardGenerated}
          >
        </Board>
        <div className='board-game-actions'>
          <div 
            className='generate-new-game' 
            onClick={() => { this.setNextGeneration() }}
          >
              next
          </div>
        </div>
      </section>
    );
  }
}

export default GameOfLife;
