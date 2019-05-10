
import React, { Component } from 'react';
import PropTypes from "prop-types";
import './Controllers.scss'
import Title from '../../common/title/Title.js';
class Controllers extends Component {
   static propTypes = {
        title: PropTypes.string.isRequired,
        controllers: PropTypes.array.isRequired,
        onControllerClicked: PropTypes.func.isRequired,
        additionalClass: PropTypes.string,
        additionalTitleClass: PropTypes.string,
    };
    
    static defaultProps = {
        additionalClass: '',
        additionalTitleClass: '',
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
        const {
            title,
            controllers,
            additionalTitleClass
        } = this.props;

        return (
            <section className={this.getClasses()}>
                <Title title={ title } additionalClass={additionalTitleClass}></Title>
                <div className={`controllers-wrapper`}>
                    {
                        controllers.map(controller => {
                            return (
                                <div 
                                    className={this.getClasses(controller)}
                                    onClick={() => { this.props.onControllerClicked(controller) }}
                                >
                                    {controller.title}
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        );
    }
}

export default Controllers;
