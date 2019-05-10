import React, { Component } from 'react';
import './GameOfLife.scss';
import Settings from './settings/Settings.js'
import Controllers from './controllers/Controllers.js'

import Title from '../common/title/Title.js';
import Board from '../common/board/Board.js';

class GameOfLife extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
        title: 'Game Of Life',
        boardData: {
          rows: 40,
          columns: 40,
          cellData: {
            isActive: false,
          },
          cellWidth: '20', // TODO: add button to change cellWidth
          cellHeight: '20', // TODO: add button to change cellHeight
          defaultColor: 'red', // TODO: add button to change color
          gameIsRunning: false,
        },
        timeoutHandler: null,
        generation: 0,
        
        boardStatus: [],
    };
  }

  /**
   * toggleCellIsActiveStatus
   * check if cellObj exist to toggel spesific cell || set all cells isActive status to false
   * @param {Array} prevStateBoardStatus 
   * @param {Object} cellObj 
   */
  toggleCellIsActiveStatus = (prevStateBoardStatus, cellObj) => {
    const clonedBoardStatus = JSON.parse(JSON.stringify(prevStateBoardStatus));
    const cell = clonedBoardStatus[cellObj.x][cellObj.y];
    cell.isActive = cell !== undefined && !cell.isActive;

    return clonedBoardStatus;
  }

  getCleanBoard = () => {
    const { boardData, boardStatus } = this.state;
    const { rows, columns } = boardData;
    const cleanBoard = JSON.parse(JSON.stringify(boardStatus));

    for(let x = 0; x < rows; x++) {
      for(let y = 0; y < columns; y++) {
        const cell = cleanBoard[x][y];
        cell.isActive = false;
      }
    }

    return cleanBoard;
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
  setNextGenerationBoardStatus = (isRuning = false) => {
    const { boardData, boardStatus } = this.state;
    const { rows, columns } = boardData;
    const newBoard = this.getCleanBoard();

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
            const activeNeighbors = this.checkNeighbors(boardStatus, x, y);
            const cell = boardStatus[x][y];
            const newBoardCell = newBoard[x][y];
            newBoardCell.isActive = this.nextGenerationCellIsActive(cell, activeNeighbors)
        }
    }

    this.setState(prevState => ({
      boardStatus: newBoard,
      generation: prevState.generation + 1,
    }));

    if (isRuning) {
      const timeoutHandler = window.setTimeout(() => {
        this.setNextGenerationBoardStatus(isRuning);
      }, 100);

      this.setState({
        timeoutHandler
      });
    }
  }

  /**
   * nextGenerationCellIsActive
   * return refer to rules cell isActive status for next generation
   */
  nextGenerationCellIsActive = (cell, activeNeighbors) => {
    // TODO improve the conditions
    if (cell.isActive) {
      if (activeNeighbors < 2 || activeNeighbors > 3) {
        return false;
      } else {
        return true;
      }
    } else {
      if (activeNeighbors === 3) {
        return true;
      } else {
        return false;
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

  /**
   * runGame
   * call to method setNextGenerationBoardStatus
   * setState gameIsRunning to true 
   */
  runGame = () => {
    const defaultData = JSON.parse(JSON.stringify(this.state.boardData));
    const newBoarData = { ...defaultData, ...{ gameIsRunning: true }}
    this.setNextGenerationBoardStatus(true);
    this.setState({ boardData: newBoarData});
  }

  /**
   * stopGame
   * setState gameIsRunning to false 
   * timeoutHandler to null
   */
  stopGame = () => {
    const { timeoutHandler } = this.state;
    const defaultData = JSON.parse(JSON.stringify(this.state.boardData));
    const newBoarData = { ...defaultData, ...{ gameIsRunning: false }}
    this.setState({ 
      boardData: newBoarData,
      timeoutHandler: null
    });
    if (timeoutHandler) {
      window.clearTimeout(timeoutHandler);
    }
  }

  /**
   * clearBoard
   * setState to empty new board
   */
  clearBoard = () => {
    const newBoard = this.getCleanBoard();
    this.stopGame();
    this.setState({
      boardStatus: newBoard,
      generation: 0,      
    });
  }

  render() {
    const { 
      title, 
      boardData, 
      boardStatus, 
      generation
    } = this.state;

    const { gameIsRunning } = boardData;
    
    return (
      <section className='game-of-life wrapper wrap-with-border'>
        <Title additionalClass={'main-title align-center'} title={ title }></Title>
        <div className='controllers-and-settings wrapper'>
          {
            // <Settings title={'Settings'}></Settings>
          }
          <Controllers 
            title={'Controllers'}
            additionalClass={'align-left'}
            additionalTitleClass={'align-left'}
            gameIsRunning={gameIsRunning}
            onClickClearBoard={this.clearBoard}
            onClickRunGame={this.runGame}
            onClickStopGame={this.stopGame}
            onClickSetNGBoardStaus={this.setNextGenerationBoardStatus}
          ></Controllers>
        </div>
        <Board 
          boardData={ boardData }
          board={ boardStatus }
          cellClicked={ this.cellClicked }
          boardGenerated={this.boardGenerated}
          >
        </Board>
        <div className='generation-counter'>Generation: {generation}</div>
      </section>
    );
  }
}

export default GameOfLife;
