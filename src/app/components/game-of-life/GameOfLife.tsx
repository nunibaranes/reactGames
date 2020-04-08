import React, { useState, useEffect } from "react";

// import Settings from './settings/Settings.js';
import Controllers, { getGameControllers } from "./controllers/Controllers";
import Title from "../common/title/Title";
import Counter from "../common/counter/Counter";
import Board from "../common/board/Board";
import Popup from "../common/popup/Popup";

import { IBoardData, BoardType } from "../common/board/Board.interface";
import { ICell } from "../common/board/cell/Cell.interface";
import { Alignment } from "../../interfaces/common/ui";

// custom hooks
import useNextGeneration from "./hooks/useNextGeneration";
import useTimer from "../../hooks/useTimer";

import { StyledWrapper, StyledButton } from "../../styles/common/common.styles";
import { StyledControllersAndSettings } from "./gameOfLife-styles";

const initialBoardData: IBoardData = {
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
};

export default function GameOfLife(props: {}) {
  const [boardData, setBoardData] = useState(initialBoardData);
  const [boardStatus, setBoardStatus] = useState([]);
  const {
    nextGenerationBoard,
    getNextGenerationBoard,
    generation,
    resetGeneration,
    resetGameOver,
    isGameOver,
  } = useNextGeneration(boardStatus, boardData);
  const [interval, setInterval] = useState(100);
  const { timerIsRunning, toggleTimerIsRunning } = useTimer(
    getNextGenerationBoard,
    interval
  );
  const [showGameOverPopup, setShowGameOverPopup] = useState(isGameOver);
  const [disableNextGeneration, setDisableNextGeneration] = useState(true);

  // Component updated - boardStatus changed
  useEffect(() => {
    if (boardStatus.length) {
      const boardIsEmpty =
        JSON.stringify(boardStatus) === JSON.stringify(boardData.emptyBoard);
      setDisableNextGeneration(boardIsEmpty);
    }
  }, [boardStatus]);

  // Component updated - nextGenerationBoard changed
  useEffect(() => {
    if (nextGenerationBoard && nextGenerationBoard.length) {
      setBoardStatus(nextGenerationBoard);
    } else {
      setDisableNextGeneration(true);
    }
  }, [nextGenerationBoard]);

  // Component updated - isGameOver changed
  useEffect(() => {
    setShowGameOverPopup(isGameOver);
    if (isGameOver) {
      toggleTimerIsRunning(false);
      setDisableNextGeneration(true);
    }
  }, [isGameOver]);

  // component did mount
  useEffect(() => {
    toggleTimerIsRunning(false);
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
    cell.isActive = cell && !cell.isActive;

    return clonedBoardStatus;
  };

  /**
   * boardGenerated
   * setState boardStatus after boardGenerated
   */
  const boardGenerated = (generatedBoard: ICell[][]): void => {
    setBoardStatus(generatedBoard);
    setBoardData((board) => {
      return {
        ...board,
        emptyBoard: generatedBoard,
      };
    });
  };

  /**
   * cellClicked
   * setState boardStatus after cellClicked
   */
  const cellClicked = (cellObj: ICell): void => {
    setBoardStatus((prevState) => toggleCellIsActiveStatus(prevState, cellObj));
    resetGameOver();
  };

  /**
   * runGame
   * call to method setNextGenerationBoardStatus
   * setState gameIsRunning to true
   */
  const runGame = (): void => {
    toggleTimerIsRunning(true);
  };

  /**
   * stopGame
   * setState gameIsRunning to false
   * timeoutHandler to null
   */
  const stopGame = (): void => {
    toggleTimerIsRunning(false);
  };

  /**
   * clearBoard
   * setState to empty new board
   */
  const clearBoard = (): void => {
    const newBoard: ICell[][] = JSON.parse(
      JSON.stringify(boardData.emptyBoard)
    );
    setBoardStatus(newBoard);
    resetGameOver();
    resetGeneration();
    setDisableNextGeneration(true);
  };

  const controllers = getGameControllers({
    timerIsRunning,
    isGameOver,
    clearBoard,
    stopGame,
    runGame,
    getNextGenerationBoard,
  });

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
          gameIsRunning={timerIsRunning}
          controllers={controllers}
          onControllerClicked={(controller) => {
            controller.callback();
          }}
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
            setShowGameOverPopup(false);
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
