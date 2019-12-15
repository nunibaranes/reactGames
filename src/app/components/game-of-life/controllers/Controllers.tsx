
import React, { Component } from 'react';

import './Controllers.scss'

import Title from '../../common/title/Title';
import { IControllersProps } from "./controller.interface"

class Controllers extends Component {
    props: IControllersProps;

    static defaultProps = {
        additionalClass: '',
        titleAdditionsClass: '',
    }

    /**
     * getClasses
     * return classes refer to arguments
     * @param {String} elName
     * @param {Object} el
     * @param {Number} index
     */
    getClasses = (elData: any = null) => {
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
            titleAdditionsClass
        } = this.props;

        return (
            <section className={this.getClasses()}>
                <Title title={ title } additionalClass={titleAdditionsClass}></Title>
                <div className={`controllers-wrapper`}>
                    {
                        controllers.map((controller: any) => {
                            return (
                                <div
                                    key={controller.controllerName}
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
