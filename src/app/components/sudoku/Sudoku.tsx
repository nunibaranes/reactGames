import React, { useState, useEffect } from "react";
import "./Sudoku.scss";
import Title from "../common/title/Title";
import Board from "../common/board/Board";
import Popup from "../common/popup/Popup";
import { ICell } from "../common/board/cell/Cell.interface";
import { IBoardData } from "../common/board/Board.interface";
import { StyledWrapper } from "../../styles/common/common.styles";

interface ISudokuState {title: string,
  boardData: IBoardData,
  openPopup: boolean,
  boardStatus: ICell[][],
  selectedCell: ICell
};

export default function Sudoku() {
  const initialBoardData: IBoardData = {
    rows: 9,
    columns: 9,
    puzzel: [],
    cellWidth: "50", // TODO: add button to change cellWidth
    cellHeight: "50", // TODO: add button to change cellHeight
    defaultColor: "red" ,// TODO: add button to change color
    cellData: {
      isHighlight: false,
    },
    highlightOptions: ['cell', 'row', 'column'],
  }
  
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
   * set state boardStatus with hilighted cells
   */
  const setBoardHighlightCells = (cellObj: ICell): void => {
    const { highlightOptions } = boardData;
    const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus));
    const shouldHighlightCell = highlightOptions.includes('cell');
    const shouldHighlightCRow = highlightOptions.includes('row');
    const shouldHighlightColumn = highlightOptions.includes('column');
    
    clonedBoardStatus.map((row: any[]): ICell[][] => {
        row.map( cell => {
            const highlightCell = shouldHighlightCell && cellObj.id === cell.id;
            const highlightRow = shouldHighlightCRow && cell.x === cellObj.x;
            const highlightColumn = shouldHighlightColumn && cell.y === cellObj.y;

            if (highlightCell || highlightRow || highlightColumn) {
                return cell.isHighlight = true;
            }
            return cell.isHighlight = false;
        })

        return row;
    });
    setBoardStatus(clonedBoardStatus);
  };

  /**
   * toggleOpenPopupState
   * set state openPopup: boolean
   */
  const toggleOpenPopupState = (): void => {
    togglePopup(!popupIsOpen)
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
    <StyledWrapper 
      className="sudoku"
      withBorder  
    >
      <Title additionalClass={"main-title align-center"} title={title} />
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
          additionalClass="inner-popup"
          onClosePopup={() => {toggleOpenPopupState();}}
        >
          <div className="cell-fill-options">
            {
              cellOptions.map((option: number) => {
                return (
                  <div
                    key={option}
                    className='cell-fill-option'
                    onClick={() => {setCellValue(option);}}
                  >
                    {option}
                  </div>
                );
              })
            }
            {
              <div 
                className='cell-clean-option'
                onClick={() => { setCellValue('');}}
              >
                Clean
              </div>
            }
          </div>
        </Popup>
      )}
    </StyledWrapper>
  );
}