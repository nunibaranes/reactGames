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


    ${props => {
        const { alignment } = props;

        if (alignment) {
            return `${StyledControllersActions} {
                justify-content: ${alignment};
            }`
        }
    }}
`;

export const StyledControllersActions = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
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
export const StyledSettings = styled('div')`
    border-right: 1px solid #ddd;

    input {
        max-width: 100px;
    }
`;

