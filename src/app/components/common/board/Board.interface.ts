import { ICell } from "./cell/Cell.interface";

export enum BoardType {
  Regular = "regular",
  GameOfLife = "game-of-life",
  Sudoku = "sudoku",
}
export interface IBoardProps {
  boardData: IBoardData;
  additionalClass?: string;
  board: ICell[][];
  cellClicked: (cell?: ICell) => void;
  cellHovered?: (cell?: ICell) => void;
}

export interface IBoardState {
  boardStatus: ICell[][];
  selectedColor: string;
}

export interface IBoardData {
  highlightOptions?: string[];
  rows: number;
  columns: number;
  puzzle?: ICell[][];
  cellData: ICell;
  cellWidth: string;
  cellHeight: string;
  defaultColor: string;
  gameIsRunning?: boolean;
  boardType?: BoardType;
}
