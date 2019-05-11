import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Board.scss";

import Cell from "./cell/Cell.js";
class Board extends Component {
    static propTypes = {
        boardData: PropTypes.object.isRequired,
        additionalClass: PropTypes.string,
        board: PropTypes.array,
        cellClicked: PropTypes.func,
        cellHovered: PropTypes.func,
        boardGenerated: PropTypes.func,
        highlightOptions: PropTypes.array
    };

    static defaultProps = {
        additionalClass: "",
        board: [],
        boardGenerated: () => {},
        cellClicked: () => {},
        cellHovered: () => {},
        highlightOptions: []
    };

    constructor(props = {}) {
        super(props);
        this.state = {
        boardStatus: props.board,
        selectedColor: props.boardData.defaultColor
        };
    }

    componentWillMount() {
        const isNewBoard = this.state.boardStatus.length === 0;
        if (isNewBoard) {
        this.generatBoard();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
        nextProps.board.length !== 0 &&
        nextProps.board !== this.state.boardStatus
        ) {
        this.setState({ boardStatus: nextProps.board });
        }
    }

    /**
     * generatBoard
     * generate new array by rows and columns
     * setState boardStatus to newBoard
     */
    generatBoard = () => {
        const { boardData, boardGenerated } = this.props;
        const { rows, columns, cellData } = boardData;
        const puzzelTemp = Array.from(Array(rows).keys());
        const rowTemp = Array.from(Array(columns).keys());
        const newBoard = Array.from(puzzelTemp, (row, rIndex) => {
        return Array.from(rowTemp, (col, cIndex) => {
            const cell = {
            id: `R${rIndex}C${cIndex}`,
            y: cIndex,
            x: rIndex
            };
            return { ...cell, ...cellData };
        });
        });

        this.setState({
        boardStatus: newBoard
        });

        boardGenerated(newBoard);
    };

    /**
     * getClasses
     * return classes refer to arguments
     * @param {String} elName
     * @param {Object} el
     * @param {Number} index
     */
    getClasses = (elName, el, index) => {
        const isActive = el.isActive !== undefined && el.isActive;
        const isHighlight = el.isHighlight !== undefined && el.isHighlight;
        const defaultClasses = `${elName} ${elName}${index}`;
        const isActiveClass = isActive ? 'is-active' : '';
        const isHighlightClass = isHighlight ? 'is-highlight' : '';

        return `${defaultClasses} ${isActiveClass} ${isHighlightClass}`;
    };

    /**
     * handleCellClick
     * @param {Object} cell
     */
    handleCellClick = cell => {
        this.props.cellClicked(cell);
    };

    handleCellHovered = cell => {
        if (this.props.highlightOptions.length > 0 && cell.isHighlight !== undefined) {
        this.setHighlightCell(cell);
        }

        this.props.cellHovered(cell);
    };

    setHighlightCell = cellObj => {
        console.log("handleCellHovered cell => ", cellObj);
        const { boardStatus } = this.state;
        const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus));
        clonedBoardStatus.map(row => {
            row.map( cell => {
                if (cellObj.id === cell.id ) {
                    return cell.isHighlight = true;
                } else {}
                return cell.isHighlight = false;
            })

            return row;
        });
        this.setState({boardStatus: clonedBoardStatus});
    };

  render() {
    const { boardStatus, selectedColor } = this.state;
    const { boardData, additionalClass } = this.props;
    const { gameIsRunning } = boardData;
    const isRunning = gameIsRunning !== undefined && gameIsRunning ? gameIsRunning : false;
    const boardClasses = `board ${additionalClass} ${isRunning ? 'game-is-running' : ''}`;

    const boardEl = boardStatus.map((row, index) => {
      return (
        <div
          className={this.getClasses("row", row, index)}
          key={`row ${index}`}
        >
          {row.map((cell, index) => {
            return (
              <Cell
                cellData={cell}
                cellIndex={index}
                cellWidth={boardData.cellWidth}
                cellHeight={boardData.cellHeight}
                selectedColor={selectedColor}
                defaultClasses={this.getClasses("cell", cell, index)}
                key={`cell ${index}`}
                cellOnClick={() => {
                  this.handleCellClick(cell);
                }}
                cellOnMouseOver={() => {
                  this.handleCellHovered(cell);
                }}
                gameIsRunning={gameIsRunning}
              />
            );
          })}
        </div>
      );
    });
    return <div className={boardClasses}>{boardEl}</div>;
  }
}

export default Board;
