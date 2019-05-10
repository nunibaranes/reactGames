import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Cell.scss'

class Cell extends Component {
    static propTypes = {
        cellData: PropTypes.object.isRequired,
        cellIndex: PropTypes.number.isRequired,
        cellWidth: PropTypes.string.isRequired,
        cellHeight: PropTypes.string.isRequired,
        cellOnClick: PropTypes.func.isRequired,
        selectedColor: PropTypes.string.isRequired, 
        gameIsRunning: PropTypes.bool,
    };

    static defaultProps = {
        gameIsRunning: false,
    }

    /**
     * getClasses
     * return classes refer to arguments
     * @param {Object} el
     * @param {Number} index
     */
    getClasses = (el, index) => {
        const isActive = el.isActive !== undefined && el.isActive;
        const defaultClasses = `cell cell${index}`;
        const { gameIsRunning } = this.props;
        const disabledClass = gameIsRunning ? 'disabled' : '';
        const isActiveClass = isActive ? 'isActive' : '';
        return `${defaultClasses} ${isActiveClass} ${disabledClass}`; 
    }

    /**
     * cellStyles
     * return cell styles
     * @param {Object} cellObj 
     */
    cellStyles = (cellObj) => {
        const { cellWidth, cellHeight, selectedColor } = this.props;
        const defaultStyle = {width: `${cellWidth}px`, height: `${cellHeight}px`}
        const activStyles = { backgroundColor: selectedColor }
        const isActive = cellObj.isActive !== undefined && cellObj.isActive;
        return isActive ? {...defaultStyle, ...activStyles } : defaultStyle;
    }

    handelOnClick = () => {
        this.props.cellOnClick();
    }

    render() {
        const {cellData, cellIndex} = this.props
        const value = cellData.value !== undefined && cellData.value ? cellData.value : '';

        return (
        <div 
            id={cellData.id}
            className={this.getClasses(cellData,  cellIndex)} 
            style={this.cellStyles(cellData)}
            onClick={this.handelOnClick}
        >
            { value }
        </div>
        );
    }
}

export default Cell;
