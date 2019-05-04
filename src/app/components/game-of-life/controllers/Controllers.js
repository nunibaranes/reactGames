
import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Controllers.scss'
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
            <section className={this.getClasses()}>
                <Title title={ title }></Title>
                <div>
                    { // onClickClearBoard button
                        <div 
                            className='btn control-clear-board-game' 
                            onClick={() => { this.props.onClickClearBoard() }}
                        >
                            Clear
                        </div>
                    }
                    { // onClickStopGame or onClickRunGame button
                        gameIsRunning ?
                        <div className="btn control-stop-game"
                            onClick={() => { this.props.onClickStopGame() }}>
                            Stop
                        </div> :
                        <div className="btn control-run-game"
                            onClick={() => { this.props.onClickRunGame() }}>
                            Run
                        </div>
                    }
                    { // onClickSetNGBoardStaus button
                        <div 
                            className='btn control-next-generation' 
                            onClick={() => { this.props.onClickSetNGBoardStaus() }}
                        >
                            Next Generation
                        </div>
                    }
                </div>
            </section>
        );
    }
}

export default Controllers;
