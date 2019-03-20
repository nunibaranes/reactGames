import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Board.scss'
class Board extends Component {
    static propTypes = {
        boardData: PropTypes.object.isRequired,
    };
    
    constructor(props = {}) {
        super(props);
        this.state = {
            board: []
        }
    }

    componentWillMount () {
        this.generatBoard();
    }

    generatBoard = () => {
        const { boardData } = this.props;
        const { rows, columns } = boardData;
        const puzzelTemp = Array.from(Array(rows).keys());
        const rowTemp = Array.from(Array(columns).keys());
        const newBoard = Array.from(puzzelTemp, row => {
            return Array.from(rowTemp, cell => '');
        })
        this.setState({
            board: newBoard,
        });
    }

    getClasses = (el, index) => {
        return `${el} ${el}${index}`; 
    }

    render() {
        const { board } = this.state;
        const { rows, columns } = board;
        const boardStyle = {
            gridTemplateRows: `repeat(9, 1fr)`
        }

        const rowStyle = {
            gridTemplateColumns: `repeat(9, 1fr)`,
        }

        const boardEl = board.map( (row, index) => {
            return (
                <div className={this.getClasses('row', index)} key={`row ${index}`} style={rowStyle}>
                    {
                        row.map( (cell, index) => {
                            return (
                                <div className={this.getClasses('cell', index)} key={`cell ${index}`}></div>
                            );
                        })
                    }
                </div>
            );
        })
        return (
            <div className="board" style={boardStyle}>
                {boardEl}
            </div>
        );
    }
}

export default Board;
