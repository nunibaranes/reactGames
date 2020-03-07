import styled from 'styled-components';
import { IBoardData } from '../common/board/Board.interface';
import { StyledBoardRow } from '../common/board/board.styles';

export const getStyledGameOfLifeBoard = (boardData: IBoardData) => {
    const { gameIsRunning } = boardData;
    
    return `
        ${gameIsRunning && `
                cursor: default;
                pointer-events: none;
            `}

        ${StyledBoardRow} {
            &:last-child {
                border-bottom: none;
            }
        }`
}