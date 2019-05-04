import React, { Component } from 'react';
import './GameOfLife.scss';

import Title from '../common/title/Title.js';
import Board from '../common/board/Board.js';

class GameOfLife extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
        title: 'Game Of Life',
        boardData: {
          rows: 10,
          columns: 10,
          cellData: {
            isActive: false,
          },
          cellWidth: '50px', // TODO: add button to change cellWidth
          cellHeight: '50px', // TODO: add button to change cellHeight
          defaultColor: 'black', // TODO: add button to change color
        },
        boardStatus: [],
    };
  }

  /**
   * toggleCellIsActiveStatus
   * check if cellObj exist to toggel spesific cell || set all cells isActive status to false
   * @param {Array} prevStateBoardStatus 
   * @param {Object} cellObj 
   */
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

  /**
   * checkNeighbors
   * calculate active neighbors
   * @param {Array} boardStatus
   * @param {Number} x
   * @param {Number} y
   */
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

    // check neighbors options isActive status
    for (let i = 0; i < neighborsOptions.length; i++) {
      const neighbor = neighborsOptions[i];
      let neighborY = y + neighbor[0];
      let neighborX = x + neighbor[1];
      const hasActiveNeighbor = neighborX >= 0            // neighbor x position bigger than 0
                          && neighborX < columns    // neighbor x position smaller than total columns number
                          && neighborY >= 0         // neighbor y position bigger than 0
                          && neighborY < rows       // neighbor y position smaller than total rows number
                          && boardStatus[neighborX][neighborY].isActive; // neighbore isActive equal to true

      if (hasActiveNeighbor) {
        neighborsCounter++;
      }
    }

    return neighborsCounter;
  }

  /**
   * setNextGenerationBoardStatus
   * create empty newBoardStatus, and set newBoardStatus's cells refer to current boardStatus
   * setState boardStatus to newBoardStatus
   */
  setNextGenerationBoardStatus = () => {
    const { boardData, boardStatus } = this.state;
    const { rows, columns } = boardData;
    const newBoard = this.toggleCellIsActiveStatus(boardStatus, null);

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y< columns; y++) {
            const activeNeighbors = this.checkNeighbors(boardStatus, x, y);
            const cell = boardStatus[x][y];
            const newBoardCell = newBoard[x][y];
            newBoardCell.isActive = this.nextGenerationCellIsActive(cell, activeNeighbors)
        }
    }

    this.setState({boardStatus: newBoard});
  }

  /**
   * nextGenerationCellIsActive
   * return refer to rules cell isActive status for next generation
   */
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

  /**
   * cellClicked
   * setState boardStatus after boardGenerated
   * @param {Array} generatedBoard
   */
  boardGenerated = (generatedBoard) => {
    this.setState({boardStatus: generatedBoard})
  }

  /**
   * cellClicked
   * setState boardStatus after cellCliked 
   * @param {Object} cellObj 
   */
  cellClicked = (cellObj) => {
    this.setState(prevState => ({
        boardStatus: this.toggleCellIsActiveStatus(prevState.boardStatus, cellObj)
    }));
  }

  render() {
    const { title, boardData, boardStatus} = this.state;
    return (
      <section className='game-of-life wrapper wrap-with-border'>
        <Title title={ title }></Title>
        <div className='controllers-and-settings wrapper wrap-with-border'>
          <div className='settings'>
            <Title title={ 'Game Settings' }></Title>
          </div>
          <div className='controllers'>
            <Title title={ 'Game Controllers' }></Title>
            <div 
              className='control-next-generation' 
              onClick={() => { this.setNextGenerationBoardStatus() }}
            >
              Next Generation
            </div>
          </div>
        </div>
        <Board 
          boardData={ boardData }
          board={ boardStatus }
          cellClicked={ this.cellClicked }
          boardGenerated={this.boardGenerated}
          >
        </Board>
      </section>
    );
  }
}

export default GameOfLife;
