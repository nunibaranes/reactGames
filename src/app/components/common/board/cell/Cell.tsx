import React from 'react';

import { ICellProps, ICell, ICellStyles} from "./Cell.interface";
import { StyledBoardCell } from '../board.styles';

export default function Cell(props: ICellProps) {
    const {
        cellData,
        defaultClasses,
        gameIsRunning = false, 
        cellWidth,
        cellHeight,
        selectedColor,
        cellOnClick,
        cellOnMouseOver
    } = props

    const value = cellData.value !== undefined && cellData.value ? cellData.value : '';

    /**
     * getClasses
     * return classes refer to arguments
     */
    const getClasses = (defaultClasses: string): string => `${defaultClasses} ${gameIsRunning ? 'disabled' : ''}`; 
    
    /**
     * cellStyles
     * return cell styles
     */
    const cellStyles = (cellObj: ICell): ICellStyles => {
        const defaultStyle = {width: `${cellWidth}px`, height: `${cellHeight}px`}
        const activStyles = { backgroundColor: selectedColor }
        const isActive = cellObj.isActive !== undefined && cellObj.isActive;
        return isActive ? {...defaultStyle, ...activStyles } : defaultStyle;
    }

    /**
     * handelOnClick
     * callback to cellOnClick
     */
    const handelOnClick = (): void => {
        cellOnClick();
    }

    /**
     * handelOnMouseOver
     * callback to cellOnMouseOver
     */
    const handelOnMouseOver = () => {
        cellOnMouseOver();
    }


    return (
    <StyledBoardCell 
        id={cellData.id}
        className={getClasses(defaultClasses)} 
        style={cellStyles(cellData)}
        onClick={handelOnClick}
        onMouseOver={handelOnMouseOver}
    >
        { value }
    </StyledBoardCell>
    );
}