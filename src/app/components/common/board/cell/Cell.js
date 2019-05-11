import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Cell.scss'

class Cell extends Component {
    static propTypes = {
        cellData: PropTypes.object.isRequired,
        cellIndex: PropTypes.number.isRequired,
        cellWidth: PropTypes.string.isRequired,
        cellHeight: PropTypes.string.isRequired,
        selectedColor: PropTypes.string.isRequired, 
        cellOnClick: PropTypes.func.isRequired,
        cellOnMouseOver: PropTypes.func.isRequired,
        defaultClasses: PropTypes.string.isRequired,
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
    getClasses = (defaultClasses) => {
        const { gameIsRunning } = this.props;
        const disabledClass = gameIsRunning ? 'disabled' : '';

        return `${defaultClasses} ${disabledClass}`; 
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
