import React, { useState, useEffect } from "react";

import Title from "../common/title/Title";
import Board from "../common/board/Board";
import Popup from "../common/popup/Popup";
import { ICell } from "../common/board/cell/Cell.interface";
import { BoardType, IBoardData } from "../common/board/Board.interface";
import { StyledWrapper } from "../../styles/common/common.styles";
import {
  StyledSudokuFillOptions,
  StyledSudokuFillSingleOption,
} from "./sudoku.styles";
import { Alignment } from "../../interfaces/common/ui";

export default function Sudoku() {
  const initialBoardData: IBoardData = {
    rows: 9,
    columns: 9,
    puzzle: [],
    cellWidth: "50", // TODO: add button to change cellWidth
    cellHeight: "50", // TODO: add button to change cellHeight
    defaultColor: "red", // TODO: add button to change color
    cellData: {
      isHighlight: false,
    },
    highlightOptions: ["cell", "row", "column"],
    boardType: BoardType.Sudoku,
  };

  /**
   * getCellOptions
   */
  const getCellOptions = (start: number, total: number): number[] => {
    const optionsTemplate = Array.from(Array(total).keys());
    const options = Array.from(optionsTemplate, (option, index) => {
      return index + start;
    });
    return options;
  };

  const title: string = "Sudoku Game";
  const [cellOptions, setCellOptions] = useState([]);
  const [boardData, setBoardData] = useState(initialBoardData);
  const [popupIsOpen, togglePopup] = useState(false);
  const [boardStatus, setBoardStatus] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    setCellOptions(getCellOptions(1, 9));
  }, []);

  /**
   * boardGenerated
   * setState boardStatus after boardGenerated
   */
  const boardGenerated = (generatedBoard: ICell[][]): void => {
    setBoardStatus(generatedBoard);
  };

  /**
   * cellClicked
   * set cellObj as selectedCell and toggleOpenPopupState
   */
  const cellClicked = (cellObj: ICell): void => {
    setSelectedCell(cellObj);
    toggleOpenPopupState();
  };

  /**
   * setBoardHighlightCells
   * set state boardStatus with highlighted cells
   */
  const setBoardHighlightCells = (cellObj: ICell): void => {
    const { highlightOptions } = boardData;
    const shouldHighlightCell = highlightOptions.includes("cell");
    const shouldHighlightCRow = highlightOptions.includes("row");
    const shouldHighlightColumn = highlightOptions.includes("column");

    const clonedBoardStatus = boardStatus.map((row: ICell[]): ICell[] => {
      return row.map((cell) => {
        const highlightCell = shouldHighlightCell && cellObj.id === cell.id;
        const highlightRow = shouldHighlightCRow && cell.x === cellObj.x;
        const highlightColumn = shouldHighlightColumn && cell.y === cellObj.y;

        if (highlightCell || highlightRow || highlightColumn) {
          return { ...cell, isHighlight: true };
        }
        return { ...cell, isHighlight: false };
      });
    });
    setBoardStatus(clonedBoardStatus);
  };

  /**
   * toggleOpenPopupState
   * set state openPopup: boolean
   */
  const toggleOpenPopupState = (): void => {
    togglePopup(!popupIsOpen);
  };

  /**
   * setCellValue
   * set board status with the new cell value
   */
  const setCellValue = (value: number | string): void => {
    const cellWithValue = { ...selectedCell, value: value };
    const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus));
    clonedBoardStatus[cellWithValue.x][cellWithValue.y].value = value;
    setBoardStatus(clonedBoardStatus);
    toggleOpenPopupState();
  };

  return (
    <StyledWrapper className="sudoku" withBorder>
      <Title title={title} alignment={Alignment.Center} isMainTitle />
      <Board
        boardData={boardData}
        additionalClass="sudoku"
        board={boardStatus}
        cellClicked={cellClicked}
        cellHovered={setBoardHighlightCells}
        boardGenerated={boardGenerated}
      />
      {popupIsOpen && (
        <Popup
          onClosePopup={() => {
            toggleOpenPopupState();
          }}
          isInnerPopup
        >
          <StyledSudokuFillOptions className="cell-fill-options">
            {cellOptions.map((option: number) => {
              return (
                <StyledSudokuFillSingleOption
                  key={option}
                  className="cell-fill-option"
                  onClick={() => {
                    setCellValue(option);
                  }}
                >
                  {option}
                </StyledSudokuFillSingleOption>
              );
            })}
            {
              <StyledSudokuFillSingleOption
                className="cell-clean-option"
                onClick={() => {
                  setCellValue("");
                }}
              >
                Clean
              </StyledSudokuFillSingleOption>
            }
          </StyledSudokuFillOptions>
        </Popup>
      )}
    </StyledWrapper>
  );
}
