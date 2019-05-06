import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Board.scss';

import Cell from './cell/Cell.js'
class Board extends Component {
    static propTypes = {
        boardData: PropTypes.object.isRequired,
        board: PropTypes.array,
        cellClicked: PropTypes.func,
        boardGenerated: PropTypes.func,
    };

    static defaultProps = {
        board: [],
        boardGenerated: () => {},
        cellClicked: () => {}
    }

    constructor(props = {}) {
        super(props);
        this.state = {
            boardStatus: props.board,
            selectedColor: props.boardData.defaultColor,
        }
    }

    componentWillMount () {
        const isNewBoard = this.state.boardStatus.length === 0;
        if (isNewBoard) {
            this.generatBoard();
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.board.length !== 0 && nextProps.board !== this.state.boardStatus) {
            this.setState({boardStatus: nextProps.board})
        }
    }

    /**
     * generatBoard
     * generate new array by rows and columns
     * setState boardStatus to newBoard
     */
    generatBoard = () => {
        const { boardData } = this.props;
        const { rows, columns, cellData } = boardData;
        const puzzelTemp = Array.from(Array(rows).keys());
        const rowTemp = Array.from(Array(columns).keys());
        const newBoard = Array.from(puzzelTemp, (row, rIndex) => {
            return Array.from(rowTemp, (col, cIndex) => { 
                const cell = {
                    id: `R${rIndex}C${cIndex}`,
                    y: cIndex,
                    x: rIndex,
                }
                return {...cell, ...cellData}
            });
        })

        this.props.boardGenerated(newBoard);
    
        this.setState({
            boardStatus: newBoard,
        });
    }

    /**
     * getClasses
     * return classes refer to arguments
     * @param {String} elName
     * @param {Object} el
     * @param {Number} index
     */
    getClasses = (elName, el, index) => {
        const isActive = el.isActive !== undefined && el.isActive;
        const defaultClasses = `${elName} ${elName}${index}`;
        return `${defaultClasses} ${isActive ? 'isActive' : ''}`; 
    }
    
    /**
     * handleCellClick
     * @param {Object} cell
     */
    handleCellClick = (cell) => {
        this.props.cellClicked(cell)
    }

    render() {
        const { boardStatus, selectedColor} = this.state;
        const { boardData } = this.props;
        const { gameIsRunning } = boardData;
        // TODO check if gameIsRuning is not undefined
        const boardClasses = `board ${gameIsRunning ? 'game-is-running' : ''}`;

        const boardEl = boardStatus.map( (row, index) => {
            return (
                <div className={this.getClasses('row', row, index)} key={`row ${index}`}>
                    {
                        row.map( (cell, index) => {
                            return (
                                <Cell
                                    cellData={cell}
                                    cellIndex={index}
                                    cellWidth={boardData.cellWidth}
                                    cellHeight={boardData.cellHeight}
                                    selectedColor={selectedColor}
                                    key={`cell ${index}`}
                                    cellOnClick={() => {this.handleCellClick(cell)}}
                                    gameIsRunning={gameIsRunning}
                                ></Cell>
                            );
                        })
                    }
                </div>
            );
        })
        return (
            <div className={boardClasses}>
                {boardEl}
            </div>
        );
    }
}

export default Board;
