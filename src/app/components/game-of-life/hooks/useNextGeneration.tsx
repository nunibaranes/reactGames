import { useState } from "react";
import { IBoardData } from "../../common/board/Board.interface";
import { ICell } from "../../common/board/cell/Cell.interface";

export default function useNextGeneration(
  boardStatus: ICell[][],
  boardData: IBoardData
) {
  const [isGameOver, setIsGameOver] = useState(false);
  const [board, setBoard] = useState(boardData.emptyBoard);
  const [generation, setGeneration] = useState(0);

  /**
   * nextGenerationCellIsActive
   * return refer to rules cell isActive status for next generation
   */
  const nextGenerationCellIsActive = (
    cell: ICell,
    activeNeighbors: number
  ): boolean => {
    const shouldActiveByNumOfNeighbors =
      activeNeighbors < 2 || activeNeighbors > 3 ? false : true;
    return cell.isActive ? shouldActiveByNumOfNeighbors : activeNeighbors === 3;
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
   * getNextGenerationBoard
   * create empty newBoardStatus, and set newBoardStatus's cells refer to current boardStatus
   * setState boardStatus to newBoardStatus
   */
  const getNextGenerationBoard = (): void => {
    const { rows, columns } = boardData;
    const newBoard =
      boardData.emptyBoard && JSON.parse(JSON.stringify(boardData.emptyBoard));

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
      setBoard(newBoard);
      setGeneration((prevState) => prevState + 1);
    } else {
      setIsGameOver(true);
      setBoard([]);
    }
  };

  return {
    nextGenerationBoard: board,
    getNextGenerationBoard,
    isGameOver,
    resetGameOver() {
      setIsGameOver(false);
    },
    generation,
    resetGeneration() {
      setGeneration(0);
    },
  };
}
