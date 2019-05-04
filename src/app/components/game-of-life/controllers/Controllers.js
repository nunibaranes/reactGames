
import React, { Component } from 'react';
import PropTypes from "prop-types";
import Title from '../../common/title/Title.js';
class Controllers extends Component {
   static propTypes = {
        title: PropTypes.string.isRequired,
        additionalClass: PropTypes.string,
        gameIsRunning: PropTypes.bool
    };
    static defaultProps = {
      additionalClass: '',
      gameIsRunning: false,
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
                    onClick={() => { this.clearBoard() }}
                >
                    Clear
                </button>
                }
                { // stopGame or runGame button
                gameIsRunning ?
                <button className="control-stop-game"
                    onClick={() => { this.stopGame() }}>Stop</button> :
                <button className="control-run-game"
                    onClick={() => { this.runGame() }}>Run</button>
                }
                { // setNextGenerationBoardStatus button
                <button 
                    className='control-next-generation' 
                    onClick={() => { this.setNextGenerationBoardStatus() }}
                >
                    Next Generation
                </button>
                }
            </div>
        );
    }
}

export default Controllers;
