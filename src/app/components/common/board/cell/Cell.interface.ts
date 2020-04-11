export interface ICellProps {
  cellData: ICell;
  cellIndex: number;
  cellWidth: string;
  cellHeight: string;
  selectedColor: string;
  cellOnClick: (cell?: ICell) => void;
  cellOnMouseOver: (cell?: ICell) => void;
  defaultClasses: string;
  gameIsRunning?: boolean;
}

export interface ICell {
  isHighlight?: boolean;
  isActive?: boolean;
  id?: string;
  y?: number;
  x?: number;
  value?: () => string | number | string | number;
}

export interface ICellStyles {
  width: string;
  height: string;
  backgroundColor?: string;
}

export type ICellData = Partial<ICell>;

export interface ICellGenerator extends ICell {
  cellData?: ICellData;
}
