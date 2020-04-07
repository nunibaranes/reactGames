import React, { useState, useEffect, useCallback } from "react";

// import Settings from './settings/Settings.js';
import Controllers from "./controllers/Controllers";
import Title from "../common/title/Title";
import Counter from "../common/counter/Counter";
import Board from "../common/board/Board";
import Popup from "../common/popup/Popup";

import { ICell } from "../common/board/cell/Cell.interface";
import { BoardType, IBoardData } from "../common/board/Board.interface";
import { IController } from "./controllers/Controller.interface";

import { StyledWrapper, StyledButton } from "../../styles/common/common.styles";
import { StyledControllersAndSettings } from "./gameOfLife-styles";
import { Alignment } from "../../interfaces/common/ui";

export default function GameOfLife(props: {}) {
  const [boardData, setBoardData] = useState({
    rows: 40,
    columns: 40,
    cellData: {
      isActive: false,
    },
    cellWidth: "20", // TODO: add button to change cellWidth
    cellHeight: "20", // TODO: add button to change cellHeight
    defaultColor: "red", // TODO: add button to change color
    gameIsRunning: false,
    boardType: BoardType.GameOfLife,
  });
  const [timeoutHandler, setTimeoutHandler] = useState(null);
  const [generation, setGeneration] = useState(0);
  const [boardStatus, setBoardStatus] = useState([]);
  const [disableNextGeneration, setDisableNextGeneration] = useState(true);
  const [showGameOverPopup, setShowGameOverPopup] = useState(false);
  const { gameIsRunning } = boardData;

  /**
   * getGameControllers
   */
  const getGameControllers = (): IController[] => {
    return [
      {
        title: "Clear",
        controllerName: "clearBoardBtn",
        classes: "btn control-clear-board-game",
        toggleDisabledClass: true,
        callback: () => {
          clearBoard();
        },
      },
      {
        title: gameIsRunning ? "Stop" : "Run",
        controllerName: "stopOrRunGameBtn",
        classes: gameIsRunning
          ? "btn control-stop-game"
          : "btn control-run-game",
        controlsNextGeneration: true,
        callback: () => {
          if (gameIsRunning) {
            stopGame();
          } else {
            runGame();
          }
        },
      },
      {
        title: "Next Generation",
        controllerName: "SetNGBoardStatusBtn",
        classes: "btn control-next-generation",
        toggleDisabledClass: true,
        controlsNextGeneration: true,
        callback: () => {
          setNextGenerationBoardStatus();
        },
      },
    ];
  };

  const controllers = getGameControllers();

  useEffect(() => {
    if (boardStatus.length) {
      const boardIsEmpty =
        JSON.stringify(boardStatus) === JSON.stringify(getCleanBoard());
      setDisableNextGeneration(boardIsEmpty);
    }
  }, [disableNextGeneration, boardStatus]);

  useEffect(() => {
    getCleanBoard();
  }, []);

  /**
   * toggleCellIsActiveStatus
   * check if cellObj exist to toggle specific cell || set all cells isActive status to false
   */
  const toggleCellIsActiveStatus = (
    prevStateBoardStatus: ICell[][],
    cellObj: ICell
  ): ICell[][] => {
    const clonedBoardStatus = JSON.parse(JSON.stringify(prevStateBoardStatus));
    const cell = clonedBoardStatus[cellObj.x][cellObj.y];
    cell.isActive = cell !== undefined && !cell.isActive;

    return clonedBoardStatus;
  };

  /**
   * getCleanBoard
   * create a new empty board
   */
  const getCleanBoard = (): ICell[][] => {
    const { rows, columns } = boardData;

    const cleanBoard = JSON.parse(JSON.stringify(boardStatus));
    if (boardStatus.length) {
      for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
          const cell = cleanBoard[x][y];
          cell.isActive = false;
        }
      }
    }

    return cleanBoard;
  };

  /**
   * checkNeighbors
   * calculate active neighbors
   */
  const checkNeighbors = (
    boardStatus: ICell[][],
    x: number,
    y: number
  ): number => {
    const { rows, columns } = boardData;
    let neighborsCounter = 0;
    const neighborsOptions = [
      [-1, -1], // left bottom cell neighbor
      [-1, 0], // left cell neighbor
      [-1, 1], // left top cell neighbor
      [0, 1], // top cell neighbor
      [1, 1], // right top cell neighbor
      [1, 0], // right cell neighbor
      [1, -1], // right bottom cell neighbor
      [0, -1], // bottom cell neighbor
    ];

    // check neighbors options isActive status
    for (let i = 0; i < neighborsOptions.length; i++) {
      const neighbor = neighborsOptions[i];
      let neighborY = y + neighbor[0];
      let neighborX = x + neighbor[1];
      const hasActiveNeighbor =
        neighborX >= 0 && // neighbor x position bigger than 0
        neighborX < columns && // neighbor x position smaller than total columns number
        neighborY >= 0 && // neighbor y position bigger than 0
        neighborY < rows && // neighbor y position smaller than total rows number
        boardStatus[neighborX][neighborY].isActive; // neighbor isActive equal to true

      if (hasActiveNeighbor) {
        neighborsCounter++;
      }
    }

    return neighborsCounter;
  };

  /**
   * setNextGenerationBoardStatus
   * create empty newBoardStatus, and set newBoardStatus's cells refer to current boardStatus
   * setState boardStatus to newBoardStatus
   */
  const setNextGenerationBoardStatus = useCallback((): void => {
    const { rows, columns } = boardData;
    const newBoard = getCleanBoard();

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
        const activeNeighbors = checkNeighbors(boardStatus, x, y);
        const cell = boardStatus[x][y];
        const newBoardCell = newBoard[x][y];
        newBoardCell.isActive = nextGenerationCellIsActive(
          cell,
          activeNeighbors
        );
      }
    }

    const shouldContinueRunning =
      JSON.stringify(newBoard) !== JSON.stringify(boardStatus);

    if (shouldContinueRunning) {
      setBoardStatus(newBoard);
      setGeneration((prevState) => prevState + 1);
    } else {
      stopGame();
      toggleGameOverPopup(true);
      setDisableNextGeneration(true);
    }
  }, [boardStatus, boardData]);

  useEffect(() => {
    let timer: number = null;
    if (gameIsRunning) {
      timer = window.setTimeout(() => {
        setNextGenerationBoardStatus();
        setDisableNextGeneration(false);
      }, 100);
      setTimeoutHandler(timer);
    }
    return () => window.clearTimeout(timer);
  }, [gameIsRunning, generation]);

  /**
   * nextGenerationCellIsActive
   * return refer to rules cell isActive status for next generation
   */
  const nextGenerationCellIsActive = (
    cell: ICell,
    activeNeighbors: number
  ): boolean => {
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
  };

  /**
   * boardGenerated
   * setState boardStatus after boardGenerated
   */
  const boardGenerated = (generatedBoard: ICell[][]): void => {
    setBoardStatus(generatedBoard);
  };

  /**
   * cellClicked
   * setState boardStatus after cellClicked
   */
  const cellClicked = (cellObj: ICell): void => {
    setBoardStatus((prevState) => toggleCellIsActiveStatus(prevState, cellObj));
  };

  /**
   * runGame
   * call to method setNextGenerationBoardStatus
   * setState gameIsRunning to true
   */
  const runGame = (): void => {
    const newBoarData = {
      ...boardData,
      gameIsRunning: true,
    };

    setNextGenerationBoardStatus();
    setBoardData(newBoarData);
  };

  /**
   * stopGame
   * setState gameIsRunning to false
   * timeoutHandler to null
   */
  const stopGame = (): void => {
    const newBoarData = {
      ...boardData,
      gameIsRunning: false,
    };
    setBoardData(newBoarData);
    setTimeoutHandler(null);
    if (timeoutHandler) {
      window.clearTimeout(timeoutHandler);
    }
  };

  /**
   * clearBoard
   * setState to empty new board
   */
  const clearBoard = (): void => {
    const newBoard: ICell[][] = getCleanBoard();
    stopGame();
    setBoardStatus(newBoard);
    setGeneration(0);
    setDisableNextGeneration(true);
    setShowGameOverPopup(false);
  };

  /**
   * onClickedController
   * call to controller.callback
   */
  const onClickedController = (controller: IController): void => {
    controller.callback();
  };

  /**
   * toggleGameOverPopup
   */
  const toggleGameOverPopup = (to: boolean): void => {
    setShowGameOverPopup(to);
  };

  return (
    <StyledWrapper className="game-of-life" withBorder>
      <Title
        title={"Game Of Life"}
        alignment={Alignment.Center}
        isMainTitle
      ></Title>
      <StyledControllersAndSettings className="controllers-and-settings">
        {
          // <Settings title={'Settings'}></Settings>
        }
        <Controllers
          title={"Controllers"}
          alignment={Alignment.Left}
          titleAlignment={Alignment.Left}
          gameIsRunning={gameIsRunning}
          controllers={controllers}
          onControllerClicked={onClickedController}
          disableNextGeneration={disableNextGeneration}
          {...props}
        />
      </StyledControllersAndSettings>
      <Board
        additionalClass="game-of-life"
        boardData={boardData}
        board={boardStatus}
        cellClicked={cellClicked}
        boardGenerated={boardGenerated}
      />
      <Counter
        title={"Generation:"}
        additionalClass="generation-counter"
        counter={generation}
      />
      {showGameOverPopup && (
        <Popup
          title="Game Over"
          titleAlignment={Alignment.Center}
          onClosePopup={() => {
            toggleGameOverPopup(false);
          }}
          isInnerPopup
        >
          <div className="game-over">
            <div>
              <span>Total Generations: {generation}</span>
            </div>
            <StyledButton className="btn" onClick={clearBoard}>
              New Game
            </StyledButton>
          </div>
        </Popup>
      )}
    </StyledWrapper>
  );
}
