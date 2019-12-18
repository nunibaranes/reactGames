import React from 'react';
import './Cell.scss';

import { ICellProps, ICell, ICellStyles} from "./cell.interface";

function Cell(props: ICellProps) {

    /**
     * getClasses
     * return classes refer to arguments
     */
    const getClasses = (defaultClasses: string): string => {
        const { gameIsRunning } = props;
        const disabledClass = gameIsRunning ? 'disabled' : '';

        return `${defaultClasses} ${disabledClass}`; 
    }

    /**
     * cellStyles
     * return cell styles
     */
    const cellStyles = (cellObj: ICell): ICellStyles => {
        const { cellWidth, cellHeight, selectedColor } = props;
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
        props.cellOnClick();
    }

    /**
     * handelOnMouseOver
     * callback to cellOnMouseOver
     */
    const handelOnMouseOver = () => {
        props.cellOnMouseOver();
    }


        const {cellData, defaultClasses} = props
        const value = cellData.value !== undefined && cellData.value ? cellData.value : '';

        return (
        <div 
            id={cellData.id}
            className={getClasses(defaultClasses)} 
            style={cellStyles(cellData)}
            onClick={handelOnClick}
            onMouseOver={handelOnMouseOver}
        >
            { value }
        </div>
        );

}

Cell.defaultProps = {
    gameIsRunning: false,
}

export default Cell;
