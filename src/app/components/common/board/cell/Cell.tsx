import React, { Component } from 'react';
import './Cell.scss';

import { ICellProps, ICell, ICellStyles} from "./cell.interface";

class Cell extends Component {
    props: ICellProps;

    static defaultProps = {
        gameIsRunning: false,
    }

    /**
     * getClasses
     * return classes refer to arguments
     */
    getClasses = (defaultClasses: string): string => {
        const { gameIsRunning } = this.props;
        const disabledClass = gameIsRunning ? 'disabled' : '';

        return `${defaultClasses} ${disabledClass}`; 
    }

    /**
     * cellStyles
     * return cell styles
     */
    cellStyles = (cellObj: ICell): ICellStyles => {
        const { cellWidth, cellHeight, selectedColor } = this.props;
        const defaultStyle = {width: `${cellWidth}px`, height: `${cellHeight}px`}
        const activStyles = { backgroundColor: selectedColor }
        const isActive = cellObj.isActive !== undefined && cellObj.isActive;
        return isActive ? {...defaultStyle, ...activStyles } : defaultStyle;
    }

    /**
     * handelOnClick
     * callback to cellOnClick
     */
    handelOnClick = (): void => {
        this.props.cellOnClick();
    }

    /**
     * handelOnMouseOver
     * callback to cellOnMouseOver
     */
    handelOnMouseOver = () => {
        this.props.cellOnMouseOver();
    }

    render() {
        const {cellData, defaultClasses} = this.props
        const value = cellData.value !== undefined && cellData.value ? cellData.value : '';

        return (
        <div 
            id={cellData.id}
            className={this.getClasses(defaultClasses)} 
            style={this.cellStyles(cellData)}
            onClick={this.handelOnClick}
            onMouseOver={this.handelOnMouseOver}
        >
            { value }
        </div>
        );
    }
}

export default Cell;
