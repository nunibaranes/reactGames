import styled from 'styled-components';
import { BoardType } from './Board.interface';
import { getStyledSudokuBoard } from '../../sudoku/sudoku.styles';

export const StyledBoardCell = styled('div')`
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

export const StyledBoardRow = styled('div')`
    display: flex;
    border-bottom: 1px solid #909090;
`;

export const StyledBoard = styled('div')`
    border: 1px solid #909090;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: fit-content;
    margin: 0 auto;

    ${props => {
        const {boardType, gameIsRunning} = props;
        
        return `
        ${gameIsRunning && `
                cursor: default;
                pointer-events: none;
            `}

        ${StyledBoardRow} {
            &:last-child {
                border-bottom: none;
            }
        }

        ${boardType === BoardType.Sudoku && getStyledSudokuBoard()}
    `
    }}
`;