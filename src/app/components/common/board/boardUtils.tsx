import { ICell, ICellGenerator, ICellData } from "./cell/Cell.interface";

const generateCell = ({ x, y, cellData }: ICellGenerator): ICell => {
  const cell = {
    id: `R${x}C${y}`,
    y,
    x,
    ...cellData,
  };
  return { ...cell, ...cellData };
};

export const generateBoard = ({
  rows = 20,
  columns = 20,
  fill = generateCell,
  cellData,
}: {
  rows: number;
  columns: number;
  cellData: ICellData;
  fill?: (cellGenerator: ICellGenerator) => ICell;
  cellGenerator?: ICellGenerator;
}): ICell[][] => {
  const puzzleTemp = Array.from(Array(rows));
  const rowTemp = Array.from(Array(columns));
  const newBoard = Array.from(puzzleTemp, (r, rIndex) => {
    const row: ICell[] = Array.from(rowTemp, (c, cIndex) =>
      fill({ x: rIndex, y: cIndex, cellData })
    );
    return row;
  });
  return newBoard;
};

export const cloneBoard = (board: ICell[][]) =>
  JSON.parse(JSON.stringify(board));
