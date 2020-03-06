import { ICell } from "./cell/Cell.interface";

export enum BoardType {
  Regular = 'regular',
  Sudoku = 'sudoku',
}
export interface IBoardProps {
  boardData: IBoardData,
  additionalClass: string,
  board: ICell[][],
  cellClicked: (cell?: ICell) => void,
  cellHovered?: (cell?: ICell) => void,
  boardGenerated: (generatedBoard?: ICell[][]) => void,
};

export interface IBoardState {
  boardStatus: ICell[][],
  selectedColor: string,
};

export interface IBoardData {
    highlightOptions?: string[],
    rows: number,
    columns: number,
    puzzel?: [],
    cellData: ICell,
    cellWidth: string,
    cellHeight: string,
    defaultColor: string,
    gameIsRunning?: boolean,
    boardType?: BoardType,
};