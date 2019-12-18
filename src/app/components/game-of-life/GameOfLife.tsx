import React, { Component } from 'react';
import './GameOfLife.scss';

// import Settings from './settings/Settings.js'
import Controllers from './controllers/Controllers'
import Title from '../common/title/Title';
import Counter from '../common/counter/Counter'
import Board from '../common/board/Board';
import Popup from "../common/popup/Popup";

import { ICell } from "../common/board/cell/Cell.interface";
import { IBoardData } from "../common/board/Board.interface";
import { IController } from "./controllers/Controller.interface";

interface IGameOfLifeState {
  title: string,
  boardData: IBoardData,
  timeoutHandler: any | ReturnType<typeof setTimeout>,
  generation: number,
  boardStatus: ICell[][],
  disableNextGeneration,
  showGameOverPopup
};

class GameOfLife extends Component {
  state: IGameOfLifeState;
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
        disableNextGeneration: true,
        showGameOverPopup: false,
    };
  }

  componentDidUpdate() {
    const boardIsEmpty = JSON.stringify(this.state.boardStatus) === JSON.stringify(this.getCleanBoard());
    if (this.state.disableNextGeneration !== boardIsEmpty) {
      this.setState({
        disableNextGeneration: boardIsEmpty
      });
    }
  }

  /**
   * toggleCellIsActiveStatus
   * check if cellObj exist to toggel spesific cell || set all cells isActive status to false
   */
  toggleCellIsActiveStatus = (prevStateBoardStatus: ICell[][], cellObj: ICell): ICell[][] => {
    const clonedBoardStatus = JSON.parse(JSON.stringify(prevStateBoardStatus));
    const cell = clonedBoardStatus[cellObj.x][cellObj.y];
    cell.isActive = cell !== undefined && !cell.isActive;

    return clonedBoardStatus;
  }

  /**
   * getCleanBoard
   * create a new empty board
   */
  getCleanBoard = (): ICell[][] => {
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
   */
  checkNeighbors = (boardStatus: ICell[][], x: number, y: number): number => {
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
  setNextGenerationBoardStatus = (isRuning: boolean = false): void => {
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

    const shouldContiniueRuning = JSON.stringify(newBoard) !== JSON.stringify(boardStatus);

    if (shouldContiniueRuning) {
      this.setState((prevState: any) => ({
        boardStatus: newBoard,
        generation: prevState.generation + 1,
      }));
    } else {
      this.stopGame();
      this.toggleGameOverPopup(true)
      this.setState({disableNextGeneration: true})
    }

    if (shouldContiniueRuning && isRuning) {
      const timeoutHandler = window.setTimeout(() => {
        this.setNextGenerationBoardStatus(isRuning);
      }, 100);

      this.setState({
        timeoutHandler,
        disableNextGeneration: false,
      });
    } 

  }

  /**
   * nextGenerationCellIsActive
   * return refer to rules cell isActive status for next generation
   */
  nextGenerationCellIsActive = (cell: ICell, activeNeighbors: number): boolean => {
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
   * boardGenerated
   * setState boardStatus after boardGenerated
   */
  boardGenerated = (generatedBoard: ICell[][]): void => {
    this.setState({boardStatus: generatedBoard})
  }

  /**
   * cellClicked
   * setState boardStatus after cellCliked 
   */
  cellClicked = (cellObj: ICell): void => {
    this.setState((prevState: any) => ({
        boardStatus: this.toggleCellIsActiveStatus(prevState.boardStatus, cellObj),
    }));
  }

  /**
   * runGame
   * call to method setNextGenerationBoardStatus
   * setState gameIsRunning to true 
   */
  runGame = (): void => {
    const defaultData: IBoardData = JSON.parse(JSON.stringify(this.state.boardData));
    const newBoarData: IBoardData = { ...defaultData, ...{ gameIsRunning: true }}
    this.setNextGenerationBoardStatus(true);
    this.setState({ boardData: newBoarData});
  }

  /**
   * stopGame
   * setState gameIsRunning to false 
   * timeoutHandler to null
   */
  stopGame = (): void => {
    const { timeoutHandler } = this.state;
    const defaultData: IBoardData = JSON.parse(JSON.stringify(this.state.boardData));
    const newBoarData: IBoardData = { ...defaultData, ...{ gameIsRunning: false }}
    this.setState({ 
      boardData: newBoarData,
      timeoutHandler: null,
    });
    if (timeoutHandler) {
      window.clearTimeout(timeoutHandler);
    }
  }

  /**
   * clearBoard
   * setState to empty new board
   */
  clearBoard = (): void => {
    const newBoard: ICell[][] = this.getCleanBoard();
    this.stopGame();
    this.setState({
      boardStatus: newBoard,
      generation: 0,
      disableNextGeneration: true,
      showGameOverPopup: false,
    });
  }

  /**
   * onClickedController
   * call to controller.callback
   */
  onClickedController = (controller: IController): void => {
    controller.callback();
  }

  /**
   * getGameControllers
   */
  getGameControllers = (): IController[] => {
    const { 
      boardData,
    } = this.state;

    const { gameIsRunning } = boardData;

    return [
      {
        title: 'Clear',
        controllerName: 'clearBoardBtn',
        classes: 'btn control-clear-board-game',
        toggleDisabledClass: true,
        callback: () => { this.clearBoard(); }
      },
      {
        title: gameIsRunning ? 'Stop' : 'Run',
        controllerName: 'stopOrRunGameBtn',
        classes: gameIsRunning ? 'btn control-stop-game' : 'btn control-run-game',
        controllNextGeneration: true,
        callback: () => { 
          if ( gameIsRunning ) {
            this.stopGame();
          } else {
            this.runGame()
          }
        }
      },
      {
        title: 'Next Generation',
        controllerName: 'SetNGBoardStausBtn',
        classes: 'btn control-next-generation',
        toggleDisabledClass: true,
        controllNextGeneration: true,
        callback: () => { this.setNextGenerationBoardStatus(); }
      }
    ];
  }

  /**
   * toggleGameOverPopup
   */
  toggleGameOverPopup (to: boolean): void {
    this.setState({showGameOverPopup: to})
  }

  render() {
    const { 
      title, 
      boardData, 
      boardStatus, 
      generation,
      disableNextGeneration,
      showGameOverPopup
    } = this.state;

    const { gameIsRunning } = boardData;
    const controllers = this.getGameControllers();

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
            titleAdditionsClass={'align-left'}
            gameIsRunning={gameIsRunning}
            controllers={controllers}
            onControllerClicked={this.onClickedController}
            disableNextGeneration={disableNextGeneration}
          />
        </div>
        <Board 
          boardData={ boardData }
          board={ boardStatus }
          cellClicked={ this.cellClicked }
          boardGenerated={this.boardGenerated}
        />
        <Counter 
          title={'Generation:'} 
          additionalClass='generation-counter' 
          counter={generation}
        />
        {showGameOverPopup && (
          <Popup
            title="Game Over"
            additionalClass="inner-popup"
            titleAdditionalClass="align-center"
            onClosePopup={() => {
              this.toggleGameOverPopup(false);
            }}
          >
            <div className="game-over">
              <div>
                <span>Total Generations: {generation}</span>
              </div>
              <button className="btn" onClick={this.clearBoard}>New Game</button>
            </div>
          </Popup>
        )}
      </section>
    );
  }
}

export default GameOfLife;
