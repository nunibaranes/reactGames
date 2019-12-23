import React, { useState, useEffect, useRef } from "react";
import './GameOfLife.scss';

// import Settings from './settings/Settings.js'
import Controllers from './controllers/Controllers'
import Title from '../common/title/Title';
import Counter from '../common/counter/Counter'
import Board from '../common/board/Board';
import Popup from "../common/popup/Popup";

import { ICell } from "../common/board/cell/Cell.interface";
import { IBoardData } from "../common/board/Board.interface";
import { IController } from "./controllers/Controller.interface";

export default function GameOfLife() {
    const initialBoardData: IBoardData = {
        rows: 40,
        columns: 40,
        cellData: {
        isActive: false,
        },
        cellWidth: '20', // TODO: add button to change cellWidth
        cellHeight: '20', // TODO: add button to change cellHeight
        defaultColor: 'red', // TODO: add button to change color
        gameIsRunning: false,
    }
    const title: string = "Game Of Life";
    const [timeoutHandler, setTimeoutHandler] = useState(null);
    const [generation, setGeneration] = useState(0);
    const [boardData, setBoardData] = useState(initialBoardData);
    const [boardStatus, setBoardStatus] = useState([]);
    const [disableNextGeneration, toggleDisableNextGeneration] = useState(true);
    const [showGameOverPopup, toggleShowGameOverPopup] = useState(false);
    const [cleanBoard, setCleanBoard] = useState([]);
    const [initBoard, setInitBoard] = useState(false);

    const { gameIsRunning } = boardData;
    const controllers: IController[] = [
        {
            title: 'Clear',
            controllerName: 'clearBoardBtn',
            classes: 'btn control-clear-board-game',
            toggleDisabledClass: true,
            callback: () => { clearBoard(); }
        },
        {
            title: gameIsRunning ? 'Stop' : 'Run',
            controllerName: 'stopOrRunGameBtn',
            classes: gameIsRunning ? 'btn control-stop-game' : 'btn control-run-game',
            controllNextGeneration: true,
            callback: () => { 
                if ( gameIsRunning ) {
                    stopGame();
                } else {
                    runGame()
                }
            }
        },
        {
            title: 'Next Generation',
            controllerName: 'SetNGBoardStausBtn',
            classes: 'btn control-next-generation',
            toggleDisabledClass: true,
            controllNextGeneration: true,
            callback: () => { setNextGenerationBoardStatus(); }
        }
    ];

    
    useEffect(() => {
        setTimeoutHandler(null);
    }, []);

    useEffect(() => {
        console.log("*** useEffect timeoutHandler ", timeoutHandler);
        if (initBoard) {
            const boardIsEmpty = JSON.stringify(boardStatus) === JSON.stringify(getCleanBoard());
            if (disableNextGeneration !== boardIsEmpty) {
                toggleDisableNextGeneration(boardIsEmpty);
            }
        }
    });

    useEffect(() => {
        if (boardStatus.length && !initBoard) {
            console.log("*** useEffect boardStatus ", boardStatus)
            setInitBoard(true);
            getCleanBoard();
        }
    });

    /**
     * toggleCellIsActiveStatus
     * check if cellObj exist to toggel spesific cell || set all cells isActive status to false
     */
    const toggleCellIsActiveStatus = (prevStateBoardStatus: ICell[][], cellObj: ICell): ICell[][] => {
        const clonedBoardStatus = JSON.parse(JSON.stringify(prevStateBoardStatus));
        const cell = clonedBoardStatus[cellObj.x][cellObj.y];
        cell.isActive = cell !== undefined && !cell.isActive;
        return clonedBoardStatus;
    }

    /**
     * getCleanBoard
     * create a new empty board
     */
    const getCleanBoard = (): ICell[][] => {
        const { rows, columns } = boardData;
        console.log("*** getCleanBoard");
        if (boardStatus.length && !cleanBoard.length) {
            const newCleanBoard = JSON.parse(JSON.stringify(boardStatus));
            for(let x = 0; x < rows; x++) {
                for(let y = 0; y < columns; y++) {
                    const cell = newCleanBoard[x][y];
                    cell.isActive = false;
                }
            }
            console.log("*** getCleanBoard set newCleanBoard ", newCleanBoard);
            setCleanBoard(newCleanBoard);
            return newCleanBoard;
        }
        console.log("*** getCleanBoard default cleanBoard ", JSON.parse(JSON.stringify(cleanBoard)));
        return JSON.parse(JSON.stringify(cleanBoard));
    }

    /**
     * checkNeighbors
     * calculate active neighbors
     */
    const checkNeighbors = (boardStatus: ICell[][], x: number, y: number): number => {
        const { rows, columns } = boardData;
        let neighborsCounter = 0;
        const neighborsOptions = [
            [-1, -1],   // left bottom cell neighbor
            [-1, 0],    // left cell neighbor
            [-1, 1],    // left top cell neighbor
            [0, 1],     // top cell neighbor
            [1, 1],     // right top cell neighbor
            [1, 0],     // right cell neighbor
            [1, -1],    // right bottom cell neighbor
            [0, -1],    // bottom cell neighbor
        ];

        // check neighbors options isActive status
        for (let i = 0; i < neighborsOptions.length; i++) {
            const neighbor = neighborsOptions[i];
            let neighborY = y + neighbor[0];
            let neighborX = x + neighbor[1];
            const hasActiveNeighbor = neighborX >= 0            // neighbor x position bigger than 0
                                        && neighborX < columns    // neighbor x position smaller than total columns number
                                        && neighborY >= 0         // neighbor y position bigger than 0
                                        && neighborY < rows       // neighbor y position smaller than total rows number
                                        && boardStatus[neighborX][neighborY].isActive; // neighbore isActive equal to true

            if (hasActiveNeighbor) {
                neighborsCounter++;
            }
        }

        return neighborsCounter;
    }

    /**
     * setNextGenerationBoardStatus
     * create empty newBoardStatus, and set newBoardStatus's cells refer to current boardStatus
     * setState boardStatus to newBoardStatus
     */
    const setNextGenerationBoardStatus = (isRuning: boolean = false): void => {
        const { rows, columns } = boardData;
        const newBoard = getCleanBoard();

        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < columns; y++) {
                const cell = boardStatus[x][y];
                const newBoardCell = newBoard[x][y];
                const activeNeighbors = checkNeighbors(boardStatus, x, y);
                const newBoarsCellIsActive = nextGenerationCellIsActive(cell, activeNeighbors);
                newBoardCell.isActive = newBoarsCellIsActive
            }
        }

        console.log("*** setNextGenerationBoardStatus newBoard ", newBoard)
        console.log("*** setNextGenerationBoardStatus boardStatus ", boardStatus)

        const shouldContiniueRuning = JSON.stringify(newBoard) !== JSON.stringify(boardStatus);
        console.log("*** setNextGenerationBoardStatus shouldContiniueRuning ", shouldContiniueRuning);

        if (shouldContiniueRuning) {
            setBoardStatus(newBoard);
            setGeneration(prevGeneration => prevGeneration + 1);
            // TODO: Wrong flow, should use custom hook 
            if (isRuning) {
                const newTimeoutHandler = window.setTimeout(() => {
                    setNextGenerationBoardStatus(true);
                }, 100);
    
                setTimeoutHandler(newTimeoutHandler);
                toggleDisableNextGeneration(false);
            }
        } else {
            stopGame();
            toggleGameOverPopup(true);
            toggleDisableNextGeneration(true);
        }


    }

    /**
     * nextGenerationCellIsActive
     * return refer to rules cell isActive status for next generation
     */
    const nextGenerationCellIsActive = (cell: ICell, activeNeighbors: number): boolean => {
        // TODO improve the conditions
        if (cell.isActive) {
            if (activeNeighbors < 2 || activeNeighbors > 3) {
                return false;
            } else {
                return true;
            }
        } else {
            if (activeNeighbors === 3) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * boardGenerated
     * setState boardStatus after boardGenerated
     */
    const boardGenerated = (generatedBoard: ICell[][]): void => {
        setBoardStatus(generatedBoard)
    }

    /**
     * cellClicked
     * setState boardStatus after cellCliked 
     */
    const cellClicked = (cellObj: ICell): void => {
        setBoardStatus(toggleCellIsActiveStatus(boardStatus, cellObj))
    }

    /**
     * runGame
     * call to method setNextGenerationBoardStatus
     * setState gameIsRunning to true 
     */
    const runGame = (): void => {
        const defaultData: IBoardData = JSON.parse(JSON.stringify(boardData));
        const newBoardData: IBoardData = { ...defaultData, ...{ gameIsRunning: true }}
        setNextGenerationBoardStatus(true);
        setBoardData(newBoardData)
    }

    /**
     * stopGame
     * setState gameIsRunning to false 
     * timeoutHandler to null
     */
    const stopGame = (): void => {
        const defaultData: IBoardData = JSON.parse(JSON.stringify(boardData));
        const newBoardData: IBoardData = { ...defaultData, ...{ gameIsRunning: false }}
        setBoardData(newBoardData);
        setTimeoutHandler(null);
        if (timeoutHandler) {
            window.clearTimeout(timeoutHandler);
        }
    }

    /**
     * clearBoard
     * setState to empty new board
     */
    const clearBoard = (): void => {
        const newBoard: ICell[][] = getCleanBoard();
        stopGame();
        setBoardStatus(newBoard);
        setGeneration(0);
        toggleDisableNextGeneration(true);
        toggleShowGameOverPopup(false);
    }

    /**
     * onClickedController
     * call to controller.callback
     */
    const onClickedController = (controller: IController): void => {
        controller.callback();
    }

    /**
     * toggleGameOverPopup
     */
    const toggleGameOverPopup = (to: boolean): void => {
        toggleShowGameOverPopup(to);
    }


    return (
        <section className='game-of-life wrapper wrap-with-border'>
            <Title additionalClass={'main-title align-center'} title={ title }></Title>
            <div className='controllers-and-settings wrapper'>
            {
                // <Settings title={'Settings'}></Settings>
            }
            <Controllers 
                title={'Controllers'}
                additionalClass={'align-left'}
                titleAdditionsClass={'align-left'}
                gameIsRunning={gameIsRunning}
                controllers={controllers}
                onControllerClicked={onClickedController}
                disableNextGeneration={disableNextGeneration}
            />
            </div>
            <Board 
            boardData={ boardData }
            board={ boardStatus }
            cellClicked={ cellClicked }
            boardGenerated={boardGenerated}
            />
            <Counter 
            title={'Generation:'} 
            additionalClass='generation-counter' 
            counter={generation}
            />
            {showGameOverPopup && (
            <Popup
                title="Game Over"
                additionalClass="inner-popup"
                titleAdditionalClass="align-center"
                onClosePopup={() => {
                toggleGameOverPopup(false);
                }}
            >
                <div className="game-over">
                <div>
                    <span>Total Generations: {generation}</span>
                </div>
                <button className="btn" onClick={clearBoard}>New Game</button>
                </div>
            </Popup>
            )}
        </section>
    );
}