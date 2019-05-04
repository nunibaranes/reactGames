
import React, { Component } from 'react';
import PropTypes from "prop-types";
import Title from '../../common/title/Title.js';
class Controllers extends Component {
   static propTypes = {
        title: PropTypes.string.isRequired,
        additionalClass: PropTypes.string,
        gameIsRunning: PropTypes.bool,
        onClickClearBoard: PropTypes.func,
        onClickRunGame: PropTypes.func,
        onClickStopGame: PropTypes.func,
        onClickSetNGBoardStaus: PropTypes.func,
    };
    static defaultProps = {
        additionalClass: '',
        gameIsRunning: false,
        onClickClearBoard: () => {},
        onClickRunGame: () => {},
        onClickStopGame: () => {},
        onClickSetNGBoardStaus: () => {},
    }

    /**
     * getClasses
     * return classes refer to arguments
     * @param {String} elName
     * @param {Object} el
     * @param {Number} index
     */
    getClasses = () => {
        const {additionalClass} = this.props;
        return `controllers ${additionalClass}`; 
    }

    render() {
        const {title, gameIsRunning} = this.props;

        return (
            <div className={this.getClasses()}>
            <Title title={ title }></Title>
                { 
                // clearBoard button
                <button 
                    className='control-clear-board-game' 
                    onClick={() => { this.props.onClickClearBoard() }}
                >
                    Clear
                </button>
                }
                { // stopGame or runGame button
                gameIsRunning ?
                <button className="control-stop-game"
                    onClick={() => { this.props.onClickStopGame() }}>Stop</button> :
                <button className="control-run-game"
                    onClick={() => { this.props.onClickRunGame() }}>Run</button>
                }
                { // setNextGenerationBoardStatus button
                <button 
                    className='control-next-generation' 
                    onClick={() => { this.props.onClickSetNGBoardStaus() }}
                >
                    Next Generation
                </button>
                }
            </div>
        );
    }
}

export default Controllers;
