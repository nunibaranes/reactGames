import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Board.scss'
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

    generatBoard = () => {
        const { boardData } = this.props;
        const { rows, columns, cellDefault } = boardData;
        const puzzelTemp = Array.from(Array(rows).keys());
        const rowTemp = Array.from(Array(columns).keys());
        const newBoard = Array.from(puzzelTemp, (row, rIndex) => {
            return Array.from(rowTemp, (col, cIndex) => { 
                const cell = {
                    id: `R${rIndex}C${cIndex}`,
                }
                return {...cell, ...cellDefault}
            });
        })

        this.props.boardGenerated(newBoard);
    
        this.setState({
            boardStatus: newBoard,
        });
    }

    getClasses = (elName, el, index) => {
        const isActive = el.isActive !== undefined && el.isActive;
        return `${elName} ${elName}${index} ${isActive ? 'isActive' : ''}`; 
    }

    // getGridTemplate = (num, value) => {
    //     const arr = Array.from({length: num}, (v, i) => '1fr');
    //     console.log(arr);
    //     const gridTemplate = arr.map( () => {
    //         return value;
    //     }); 
    //     return arr.join(', ');
    // }

    cellStyles = (cellObj) => {
        const { selectedColor } = this.state;
        const cellActivStyles = { backgroundColor: selectedColor }
        return cellObj.isActive ? cellActivStyles : {};
    }

    handleCellClick = (cell) => {
        this.props.cellClicked(cell)
    }

    render() {
        const { boardStatus } = this.state;
        // const { boardData } = this.props;
        // const { rows, columns, cell } = boardData;
        console.log('render boardStatus ', boardStatus);
        const boardStyle = {
            gridTemplateRows: 'repeat(9, 1fr)',
        }

        const rowStyle = {
            gridTemplateColumns: `repeat(9, 1fr)`,
        }

        const boardEl = boardStatus.map( (row, index) => {
            return (
                <div className={this.getClasses('row', row, index)} key={`row ${index}`} style={rowStyle}>
                    {
                        row.map( (cell, index) => {
                            return (
                                <div 
                                    className={this.getClasses('cell', cell,  index)} 
                                    key={`cell ${index}`}
                                    onClick={() => {this.handleCellClick(cell)}}
                                    style={this.cellStyles(cell)}
                                ></div>
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
