import React, { useState, useEffect, useCallback, useMemo } from "react";

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
import useGameOfLife from "./hooks/useGameOfLife";
import useTimer from "../../hooks/useTimer";

import { StyledWrapper, StyledButton } from "../../styles/common/common.styles";
import { StyledControllersAndSettings } from "./gameOfLife-styles";
import { IController } from "./controllers/Controller.interface";
import { generateBoard, cloneBoard } from "../common/board/boardUtils";

const initialBoardData: IBoardData = {
  rows: 40,
  columns: 40,
  cellData: {
    isActive: false,
  },
  cellWidth: "20", // TODO: add button to change cellWidth
  cellHeight: "20", // TODO: add button to change cellHeight
  defaultColor: "red", // TODO: add button to change color
  boardType: BoardType.GameOfLife,
  gameIsRunning: false,
};

export default function GameOfLife(props: {}) {
  initialBoardData.puzzle = generateBoard(initialBoardData);
  const [boardData, setBoardData] = useState(initialBoardData);

  const {
    boardStatus,
    updateBoardStatus,
    getNextGenerationBoard,
    generation,
    resetGeneration,
    resetGameOver,
    isGameOver,
  } = useGameOfLife(boardData);

  const [interval, setInterval] = useState(100);
  const { timerIsRunning, toggleTimerIsRunning } = useTimer(
    getNextGenerationBoard,
    interval
  );
  const [showGameOverPopup, setShowGameOverPopup] = useState(isGameOver);
  const [disableNextGeneration, setDisableNextGeneration] = useState(true);

  // Component updated - boardStatus changed
  useEffect(() => {
    const boardIsEmpty =
      JSON.stringify(boardStatus) === JSON.stringify(boardData.puzzle);
    setDisableNextGeneration(boardIsEmpty);
  }, [boardStatus]);

  // Component updated - isGameOver changed
  useEffect(() => {
    setShowGameOverPopup(isGameOver);
    if (isGameOver) {
      toggleTimerIsRunning(false);
      setDisableNextGeneration(true);
    }
  }, [isGameOver]);

  // Component updated - timerIsRunning changed
  useEffect(() => {
    setBoardData((prevBoardData) => {
      return { ...prevBoardData, gameIsRunning: timerIsRunning };
    });
  }, [timerIsRunning]);

  const toggleCellIsActive = (
    prevStateBoardStatus: ICell[][],
    cellObj: ICell
  ): ICell[][] => {
    const clonedBoardStatus = cloneBoard(prevStateBoardStatus);
    const cell = clonedBoardStatus[cellObj.x][cellObj.y];
    cell.isActive = cell && !cell.isActive;

    return clonedBoardStatus;
  };

  const cellClicked = (cellObj: ICell): void => {
    updateBoardStatus(toggleCellIsActive(boardStatus, cellObj));
    resetGameOver();
  };

  const toggleGame = useCallback(
    (to: boolean): void => toggleTimerIsRunning(to),
    []
  );

  const clearBoard = useCallback((): void => {
    updateBoardStatus(initialBoardData.puzzle);
    resetGameOver();
    resetGeneration();
    setDisableNextGeneration(true);
  }, []);

  const onControllerClicked = useCallback((controller: IController) => {
    controller.callback();
  }, []);

  const controllers = useMemo(
    () => (
      <Controllers
        title={"Controllers"}
        alignment={Alignment.Left}
        titleAlignment={Alignment.Left}
        gameIsRunning={timerIsRunning}
        controllers={getGameControllers({
          timerIsRunning,
          isGameOver,
          clearBoard,
          toggleGame,
          getNextGenerationBoard,
        })}
        onControllerClicked={onControllerClicked}
        disableNextGeneration={disableNextGeneration}
        {...props}
      />
    ),
    [
      disableNextGeneration,
      timerIsRunning,
      isGameOver,
      onControllerClicked,
      getNextGenerationBoard,
    ]
  );

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
        {controllers}
      </StyledControllersAndSettings>
      <Board
        additionalClass="game-of-life"
        boardData={boardData}
        board={boardStatus}
        cellClicked={cellClicked}
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
