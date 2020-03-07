import styled from 'styled-components';
import { StyledBoardCell, StyledBoardRow } from '../common/board/board.styles';
import { IBoardData } from '../common/board/Board.interface';

export const StyledSudokuFillSingleOption = styled('div')`
    width: 50px;
    height: 50px;
    border: 1px solid #909090;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const StyledSudokuFillOptions = styled('div')`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
`;

export const getStyledSudokuBoard = (props?: IBoardData) => {
    return `
        ${StyledBoardRow} {
            border-bottom: none;
            ${StyledBoardCell} {
                border-bottom: 1px solid #909090;
            }
            &:nth-child(3n) {
                ${StyledBoardCell} {
                    border-bottom: 2px solid #909090;
                }
    
                &:last-child {
                    ${StyledBoardCell} {
                        border-bottom: none;
                    }
                }
            }
    
            ${StyledBoardCell} {
                &:nth-child(3n) {
                    border-right: 2px solid #909090;
    
                    &:last-child {
                        border-right: none;
                    }
                }
    
                &.is-highlight {
                    background-color: #a3c6fc;
                }
    
                &:hover, &:focus {
                    box-shadow: 1px 1px #0046b0 inset, -1px -1px #0046b0 inset;
                }
            }  
        }`
}