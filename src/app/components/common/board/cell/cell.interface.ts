
export interface ICellProps {
    cellData: ICell,
    cellIndex: number,
    cellWidth: string,
    cellHeight: string,
    selectedColor: string, 
    cellOnClick: (cell?: ICell) => void,
    cellOnMouseOver: (cell?: ICell) => void,
    defaultClasses: string,
    gameIsRunning?: boolean
};

export interface ICell {
    isHighlight?: boolean,
    isActive?: boolean,
    id?: string,
    y?: number,
    x?: number,
    value?: string,
};

export interface ICellStyles {
    width: string,
    height: string,
    backgroundColor?: string,
};