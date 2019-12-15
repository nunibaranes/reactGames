import { ICell } from "./cell/cell.interface";

export interface IBoardProps {
  boardData: IBoardData,
  additionalClass: string,
  board: ICell[][],
  cellClicked: (cell?: ICell) => void,
  cellHovered: (cell?: ICell) => void,
  boardGenerated: (generatedBoard?: ICell[][]) => void,
  highlightOptions: string[],
};

export interface IBoardState {
  boardStatus: ICell[][],
  selectedColor: string,
};

export interface IBoardData {
    rows: number,
    columns: number,
    puzzel?: [],
    cellData: ICell,
    cellWidth: string,
    cellHeight: string,
    defaultColor: string,
    gameIsRunning?: boolean
};