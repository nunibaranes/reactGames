import styled from "styled-components";
import BoardType, { IBoardProps, IBoardData } from "./Board.interface";
import { getStyledSudokuBoard } from "../../sudoku/sudoku.styles";
import { getStyledGameOfLifeBoard } from "../../game-of-life/gameOfLife-styles";

export const StyledBoardCell = styled("div")`
  border-right: 1px solid #909090;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:last-child {
    border-right: none;
  }
`;

export const StyledBoardRow = styled("div")`
  display: flex;
  border-bottom: 1px solid #909090;

  &:last-child {
    border-bottom: 0;
  }
`;

export const StyledBoard = styled("div")`
  border: 1px solid #909090;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: fit-content;
  margin: 0 auto;

  ${(props: {
    children: React.ReactNode;
    boardData: IBoardData;
    className: string;
  }) => {
    const { boardData } = props;
    const { boardType } = boardData;

    switch (boardType) {
      case BoardType.GameOfLife:
        return getStyledGameOfLifeBoard(boardData);
      case BoardType.Sudoku:
        return getStyledSudokuBoard();
      default:
        break;
    }
  }}
`;
