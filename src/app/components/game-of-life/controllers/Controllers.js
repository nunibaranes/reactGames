
import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Controllers.scss'
import Title from '../../common/title/Title.js';
class Controllers extends Component {
   static propTypes = {
        title: PropTypes.string.isRequired,
        additionalClass: PropTypes.string,
        additionalTitleClass: PropTypes.string,
        gameIsRunning: PropTypes.bool,
        onClickClearBoard: PropTypes.func,
        onClickRunGame: PropTypes.func,
        onClickStopGame: PropTypes.func,
        onClickSetNGBoardStaus: PropTypes.func,
    };
    static defaultProps = {
        additionalClass: '',
        additionalTitleClass: '',
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
    getClasses = (elData = null) => {
        const {gameIsRunning, additionalClass} = this.props;
        const disabledClass = gameIsRunning ? 'disabled' : '';
        let elDataClasses = '';
        if (elData) {
            elDataClasses = elData.toggleDisabledClass ? `${elData.classes} ${disabledClass}` : `${elData.classes}`;
        }
        return (elDataClasses !== '') ? `${elDataClasses}` : `controllers ${additionalClass}`; 
    }

    render() {
        const {title, gameIsRunning, additionalTitleClass} = this.props;
        const clearBoardBtn = {
            classes: 'btn control-clear-board-game',
            toggleDisabledClass: true,
        }

        const stopOrRunGameBtn = {
            classes: gameIsRunning ? 'btn control-stop-game' : 'btn control-run-game',
        }

        const SetNGBoardStausBtn = {
            classes: 'btn control-next-generation',
            toggleDisabledClass: true,
        }
        return (
            <section className={this.getClasses()}>
                <Title title={ title } additionalClass={additionalTitleClass}></Title>
                <div className={`controllers-wrapper`}>
                    { 
                        // onClickClearBoard button
                        <div 
                            className={this.getClasses(clearBoardBtn)} 
                            onClick={() => { this.props.onClickClearBoard() }}
                        >
                            Clear
                        </div>
                    }
                    { // onClickStopGame or onClickRunGame button
                        gameIsRunning ?
                        <div className={this.getClasses(stopOrRunGameBtn)}
                            onClick={() => { this.props.onClickStopGame() }}>
                            Stop
                        </div> :
                        <div className={this.getClasses(stopOrRunGameBtn)}
                            onClick={() => { this.props.onClickRunGame() }}>
                            Run
                        </div>
                    }
                    { // onClickSetNGBoardStaus button
                        <div 
                            className={this.getClasses(SetNGBoardStausBtn)} 
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
