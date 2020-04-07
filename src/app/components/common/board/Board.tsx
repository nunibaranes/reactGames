import React, { useState, useEffect, ReactElement } from "react";

import Cell from "./cell/Cell";
import { ICell } from "./cell/Cell.interface";
import { BoardType, IBoardProps } from "./Board.interface";
import { StyledBoard, StyledBoardRow } from "./board.styles";

export default function Board(props: IBoardProps) {
  const {
    boardData,
    board = [] as ICell[],
    additionalClass = "",
    boardGenerated = () => {},
    cellClicked = () => {},
    cellHovered,
  } = props;

  const { gameIsRunning = false, boardType = BoardType.Regular } = boardData;

  const [boardStatus, setBoardStatus] = useState(board);
  const [selectedColor, setSelectedColor] = useState(boardData.defaultColor);
  const boardClasses = `board ${additionalClass}`;

  useEffect(() => {
    const isNewBoard = boardStatus.length === 0;
    if (isNewBoard) {
      return generateBoard();
    }
  }, []);

  useEffect(() => {
    if (props.board.length !== 0 && props.board !== boardStatus) {
      setBoardStatus(props.board);
    }
  }, [props.board, boardStatus]);

  /**
   * generateBoard
   * generate new array by rows and columns
   * setState boardStatus to newBoard
   */
  const generateBoard = (): void => {
    const { rows, columns, cellData } = boardData;
    const puzzleTemp = Array.from(Array(rows).keys());
    const rowTemp = Array.from(Array(columns).keys());
    const newBoard = Array.from(puzzleTemp, (row, rIndex) => {
      return Array.from(rowTemp, (col, cIndex) => {
        const cell = {
          id: `R${rIndex}C${cIndex}`,
          y: cIndex,
          x: rIndex,
        };
        return { ...cell, ...cellData };
      });
    });
    setBoardStatus(newBoard);
    boardGenerated(newBoard);
  };

  /**
   * getClasses
   * return classes refer to arguments
   */
  const getClasses = ({
    elName,
    el,
    index,
  }: {
    elName: string;
    el?: Partial<ICell>;
    index: number;
  }): string => {
    const isActive = el && el.isActive;
    const isHighlight = el && el.isHighlight;
    const defaultClasses = `${elName} ${elName}${index}`;
    const isActiveClass = isActive ? "is-active" : "";
    const isHighlightClass = isHighlight ? "is-highlight" : "";

    return `${defaultClasses} ${isActiveClass} ${isHighlightClass}`;
  };

  /**
   * handleCellClick
   * callback to cellClicked
   */
  const handleCellClick = (cell: ICell): void => {
    cellClicked(cell);
  };

  /**
   * handleCellHovered
   * callback to cellHovered
   */
  const handleCellHovered = (cell: ICell): void => {
    if (cellHovered && typeof cellHovered === "function") {
      cellHovered(cell);
    }
  };

  const getCellsInRow = (row: ICell[]) =>
    (row as ICell[]).map((cell: ICell, index: number) => {
      return (
        <Cell
          cellData={cell}
          cellIndex={index}
          cellWidth={boardData.cellWidth}
          cellHeight={boardData.cellHeight}
          selectedColor={selectedColor}
          defaultClasses={getClasses({ elName: "cell", el: cell, index })}
          key={`cell ${index}`}
          cellOnClick={() => {
            handleCellClick(cell);
          }}
          cellOnMouseOver={() => {
            handleCellHovered(cell);
          }}
          gameIsRunning={gameIsRunning}
        />
      );
    });

  const boardEl = (boardStatus as Array<ICell[] | ICell[][]>).map(
    (row: ICell[], index: number) => {
      return (
        <StyledBoardRow
          className={getClasses({ elName: "row", index })}
          key={`row ${index}`}
        >
          {getCellsInRow(row)}
        </StyledBoardRow>
      );
    }
  );

  return (
    <StyledBoard boardData={boardData} className={boardClasses}>
      {boardEl}
    </StyledBoard>
  );
}
