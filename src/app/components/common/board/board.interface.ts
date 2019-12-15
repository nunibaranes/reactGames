import { ICell } from "./cell/cell.interface";

export interface IBoardData {
    rows: number,
    columns: number,
    puzzel: [],
    cellWidth: string,
    cellHeight: string,
    defaultColor: string,
    cellData: ICell,
};