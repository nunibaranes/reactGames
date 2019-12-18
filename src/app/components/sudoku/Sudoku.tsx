import React, { Component } from "react";
import "./Sudoku.scss";
import Title from "../common/title/Title";
import Board from "../common/board/Board";
import Popup from "../common/popup/Popup";
import { ICell } from "../common/board/cell/Cell.interface";
import { IBoardData } from "../common/board/Board.interface";

interface ISudokuState {title: string,
  boardData: IBoardData,
  openPopup: boolean,
  boardStatus: ICell[][],
  selectedCell: ICell
};

class Sudoku extends Component {
  state: ISudokuState;
  constructor(props = {}) {
    super(props);
    this.state = {
      title: "Sudoku Game",
      boardData: {
        rows: 9,
        columns: 9,
        puzzel: [],
        cellWidth: "50", // TODO: add button to change cellWidth
        cellHeight: "50", // TODO: add button to change cellHeight
        defaultColor: "red" ,// TODO: add button to change color
        cellData: {
          isHighlight: false,
        },
      },
      openPopup: false,
      boardStatus: [],
      selectedCell: null
    };
  }

  /**
   * boardGenerated
   * setState boardStatus after boardGenerated
   */
  boardGenerated = (generatedBoard: ICell[][]): void => {
    this.setState({ boardStatus: generatedBoard });
  };
  /**
   * cellClicked
   * set cellObj as selectedCell and toggleOpenPopupState
   */
  cellClicked = (cellObj: ICell): void => {
    console.log("cellClicked cellObj => ", cellObj);
    this.setState({ selectedCell: cellObj });
    this.toggleOpenPopupState();
  };

  /**
   * toggleOpenPopupState
   * set state openPopup: boolean
   */
  toggleOpenPopupState = (): void => {
    console.log("toggleOpenPopupState ");
    this.setState((prevState: any) => ({
      openPopup: !prevState.openPopup
    }));
  };

  /**
   * getCellOptions
   */
  getCellOptions = (start: number, total: number): number[] => {
    const optionsTemplate = Array.from(Array(total).keys());
    const options = Array.from(optionsTemplate, (option, index) => {
      return index + start;
    });
    return options;
  };

  /**
   * setCellValue
   * set board status with the new cell value
   */
  setCellValue = (value: number | string): void => {
    const { selectedCell, boardStatus } = this.state;
    const cellWithValue = { ...selectedCell, value: value };
    const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus));
    clonedBoardStatus[cellWithValue.x][cellWithValue.y].value = value;
    this.setState({boardStatus: clonedBoardStatus})
    this.toggleOpenPopupState();
  };

  render() {
    const { title, boardData, boardStatus, openPopup } = this.state;
    const cellOptions = this.getCellOptions(1, 9);
    return (
      <section className="sudoku wrapper wrap-with-border">
        <Title additionalClass={"main-title align-center"} title={title} />
        <Board
          boardData={boardData}
          additionalClass="sudoku"
          board={boardStatus}
          cellClicked={this.cellClicked}
          highlightOptions={['cell', 'row', 'column']}
          boardGenerated={this.boardGenerated}
        />
        {openPopup && (
          <Popup
            additionalClass="inner-popup"
            onClosePopup={() => {
              this.toggleOpenPopupState();
            }}
          >
            <div className="cell-fill-options">
              {
                cellOptions.map((option: number) => {
                  return (
                    <div
                      key={option}
                      className='cell-fill-option'
                      onClick={() => {
                        this.setCellValue(option);
                      }}
                    >
                      {option}
                    </div>
                  );
                })
              }
              {
                <div 
                  className='cell-clean-option'
                  onClick={() => {
                    this.setCellValue('');
                  }}
                >
                  Clean
                </div>
              }
            </div>
          </Popup>
        )}
      </section>
    );
  }
}

export default Sudoku;
