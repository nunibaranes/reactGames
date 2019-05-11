import React, { Component } from "react";
import "./Sudoku.scss";
import Title from "../common/title/Title.js";
import Board from "../common/board/Board.js";
import Popup from "../common/popup/Popup.js";
class Sudoku extends Component {
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
   * @param {Array} generatedBoard
   */
  boardGenerated = generatedBoard => {
    this.setState({ boardStatus: generatedBoard });
  };

  cellClicked = cellObj => {
    console.log("cellClicked cellObj => ", cellObj);
    this.setState({ selectedCell: cellObj });
    this.toggleOpenPopupState();
  };

  toggleOpenPopupState = () => {
    console.log("toggleOpenPopupState ");
    this.setState(prevState => ({
      openPopup: !prevState.openPopup
    }));
  };

  getCellOptions = (start, total) => {
    const optionsTemplate = Array.from(Array(total).keys());
    const options = Array.from(optionsTemplate, (option, index) => {
      return index + start;
    });

    return options;
  };

  setCellValue = value => {
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
          additionalClass={"sudoku"}
          board={boardStatus}
          cellClicked={this.cellClicked}
          highlightOptions={['cell', 'row', 'column']}
          boardGenerated={this.boardGenerated}
        />
        {openPopup && (
          <Popup
            additionalClass={"inner-popup"}
            onClosePopup={() => {
              this.toggleOpenPopupState();
            }}
          >
            <div className="cell-fill-options">
              {
                cellOptions.map(option => {
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
