
import React, { Component } from 'react';

import './Controllers.scss'

import Title from '../../common/title/Title';
import { IControllersProps, IController } from "./Controller.interface"


export default function Controllers(props: IControllersProps) {
    const {
        gameIsRunning,
        additionalClass,
        disableNextGeneration,
        title,
        controllers,
        titleAdditionsClass,
        onControllerClicked,
    } = props;

    /**
     * getClasses
     * return classes refer to arguments
     */
    const getClasses = (elData: IController = null): string => {
        const disabledClass = gameIsRunning || disableNextGeneration ? 'disabled' : '';
        let elDataClasses = '';
        if (elData) {
            // TODO: improve the condition
            const shouldDisableNextGeneration = elData.controllNextGeneration && disableNextGeneration
            
            elDataClasses = elData.toggleDisabledClass && gameIsRunning
            ? `${elData.classes} ${disabledClass}` 
            : (shouldDisableNextGeneration) ? `${elData.classes} ${disabledClass}` : `${elData.classes}`;
        }

        return (elDataClasses !== '') ? `${elDataClasses}` : `controllers ${additionalClass}`;
    }

    return (
        <section className={getClasses()}>
            <Title title={ title } additionalClass={titleAdditionsClass}></Title>
            <div className={`controllers-wrapper`}>
                {
                    controllers.map((controller: any) => {
                        return (
                            <div
                                key={controller.controllerName}
                                className={getClasses(controller)}
                                onClick={() => {onControllerClicked(controller) }}
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

Controllers.defaultProps = {
    additionalClass: '',
    titleAdditionsClass: '',
    disableNextGeneration: false,
};