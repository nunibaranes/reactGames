import React, { useState, useEffect, memo } from "react";

import Cell from "./cell/Cell";
import { ICell } from "./cell/Cell.interface";
import { IBoardProps } from "./Board.interface";
import { StyledBoard, StyledBoardRow } from "./board.styles";

const propsAreEquals = (prevProps: IBoardProps, nextProps: IBoardProps) => {
  const boardIsEqual =
    JSON.stringify(prevProps.board) === JSON.stringify(nextProps.board);

  return (
    boardIsEqual &&
    prevProps.boardData.gameIsRunning === nextProps.boardData.gameIsRunning
  );
};

export default memo(function Board(props: IBoardProps) {
  const {
    boardData,
    board = [] as ICell[],
    additionalClass = "",
    cellClicked = () => {},
    cellHovered,
  } = props;
  const { gameIsRunning = false } = boardData;
  const [boardStatus, setBoardStatus] = useState(board);
  const [selectedColor, setSelectedColor] = useState(boardData.defaultColor);
  const boardClasses = `board ${additionalClass}`;

  useEffect(() => {
    if (props.board && props.board.length && props.board !== boardStatus) {
      setBoardStatus(props.board);
    }
  }, [props.board, boardStatus]);

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
            cellClicked && cellClicked(cell);
          }}
          cellOnMouseOver={() => {
            cellHovered && cellHovered(cell);
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
}, propsAreEquals);
