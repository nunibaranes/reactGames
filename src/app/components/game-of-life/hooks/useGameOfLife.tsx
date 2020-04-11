import { useState } from "react";
import { generateBoard } from "../../common/board/boardUtils";
import { IBoardData } from "../../common/board/Board.interface";
import { ICell } from "../../common/board/cell/Cell.interface";

const randomActiveCell = (): boolean => Boolean(Math.round(Math.random()));

export default function useGameOfLife(boardData: IBoardData) {
  const { rows, columns, cellData, puzzle } = boardData;
  const [board, setBoard] = useState(puzzle);
  const [isGameOver, setIsGameOver] = useState(false);
  const [generation, setGeneration] = useState(0);

  function getCell(x: number, y: number, row: ICell[] = board[x]) {
    return row ? row[y] || undefined : undefined;
  }

  function isActive<T extends boolean | number>(x: number, y: number): T {
    const cell = getCell(x, y);
    const isActive = cell && (cell.isActive as T);
    return isActive;
  }

  function countNeighbors(x: number, y: number) {
    let countActive: (x: number, y: number) => number;
    countActive = isActive;
    return (
      // left bottom cell neighbor
      countActive(x - 1, y - 1) +
      // left cell neighbor
      countActive(x - 1, y) +
      // left top cell neighbor
      countActive(x - 1, y + 1) +
      // bottom cell neighbor
      countActive(x, y - 1) +
      // top cell neighbor
      countActive(x, y + 1) +
      // right bottom cell neighbor
      countActive(x + 1, y - 1) +
      // right cell neighbor
      countActive(x + 1, y) +
      // right cell neighbor
      countActive(x + 1, y + 1)
    );
  }

  function nextGeneration() {
    const newBoard = [];
    for (let x = 0; x < rows; x++) {
      const newRow = [];
      for (let y = 0; y < columns; y++) {
        const neighbors = countNeighbors(x, y);
        const cell = getCell(x, y);
        const activeCell = { ...cell, isActive: true };
        const offCell = { ...cell, isActive: false };

        if (cell.isActive) {
          if (neighbors < 2 || neighbors > 3) {
            newRow.push(offCell);
          } else {
            newRow.push(activeCell);
          }
        } else if (neighbors === 3) {
          newRow.push(activeCell);
        } else {
          newRow.push(offCell);
        }
      }
      newBoard.push(newRow);
    }

    const hasChanges = JSON.stringify(newBoard) !== JSON.stringify(board);

    if (hasChanges) {
      setGeneration((prevState) => prevState + 1);
    } else {
      setIsGameOver(true);
    }

    setBoard(newBoard);
  }

  function reset() {
    setBoard(generateBoard(boardData));
  }

  return {
    boardStatus: board,
    updateBoardStatus(newBoard: ICell[][]) {
      setBoard(newBoard);
    },
    getNextGenerationBoard() {
      nextGeneration();
    },
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
