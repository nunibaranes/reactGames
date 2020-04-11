import React, { useState } from "react";
import { ICell, ICellGenerator, ICellData } from "./cell/Cell.interface";
import { IBoardData } from "./Board.interface";

const generateCell = ({ x, y, cellData }: ICellGenerator): ICell => {
  return {
    id: `R${x}C${y}`,
    y,
    x,
    ...cellData,
  };
};

const generateBoard = ({
  rows = 20,
  columns = 20,
  fill = generateCell,
  cellData,
}: {
  rows: number;
  columns: number;
  fill?: (cellGenerator: ICellGenerator) => void;
  cellGenerator?: ICellGenerator;
  cellData: ICellData;
}) => {
  const puzzleTemp = Array.from(Array(rows).keys());
  const rowTemp = Array.from(Array(columns).keys());
  return Array.from(puzzleTemp, (row, rIndex) => {
    return Array.from(rowTemp, (col, cIndex) =>
      fill({ x: cIndex, y: rIndex, cellData })
    );
  });
};

export default function useBoard({ boardData }: { boardData: IBoardData }) {
  const { rows, columns, cellData } = boardData;
  const [board, setBoard] = useState(
    generateBoard({ rows, columns, cellData })
  );

  function clearBoard() {
    setBoard(generateBoard({ rows, columns, cellData }));
  }

  return {
    board,
    clearBoard,
  };
}
