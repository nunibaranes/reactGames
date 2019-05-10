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
        cellWidth: "20", // TODO: add button to change cellWidth
        cellHeight: "20", // TODO: add button to change cellHeight
        defaultColor: "red" // TODO: add button to change color
      },
      openPopup: false,
      boardStatus: []
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
    this.toggleOpenPopupState();
  };

  toggleOpenPopupState = () => {
    console.log("toggleOpenPopupState ");
    this.setState(prevState => ({
      openPopup: !prevState.openPopup
    }));
  };

  render() {
    const { title, boardData, boardStatus, openPopup } = this.state;
    console.log("render openPopup => ", openPopup);
    return (
      <section className="sudoku wrapper wrap-with-border">
        <Title additionalClass={"main-title"} title={title} />
        <Board
          boardData={boardData}
          board={boardStatus}
          cellClicked={this.cellClicked}
          boardGenerated={this.boardGenerated}
        />
        {openPopup && (
          <Popup
            title={"popup is open"}
            onClosePopup={() => {this.toggleOpenPopupState()}}
          />
        )}
      </section>
    );
  }
}

export default Sudoku;
