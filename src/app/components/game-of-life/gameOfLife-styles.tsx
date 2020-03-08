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

export const StyledControllers = styled('section')`
    display: flex;
    flex-direction: column;

    .controllers-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &.align-left {        
        .controllers-wrapper {
            justify-content:left;
        }
    }
    &.align-right {        
        .controllers-wrapper {
            justify-content: right;
        }
    }
    &.align-center {        
        .controllers-wrapper {
            justify-content: center;
        }
    }
`;

export const StyledControllersAndSettings = styled('section')`
    border-top: 1px solid #ddd;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 25px;

    input {
        height: 45px;
        width: 100%;
    }
`;

