
import React from 'react';

import Title from '../../common/title/Title';
import { IControllersProps } from "./Controller.interface";

import { StyledButton } from '../../../styles/common/common.styles';
import { StyledControllers } from '../gameOfLife-styles';

export default function Controllers(props: IControllersProps) {
    const {
        gameIsRunning,
        additionalClass = '',
        disableNextGeneration = false,
        title,
        controllers,
        titleAdditionsClass = '',
        onControllerClicked,
    } = props;

    return (
        <StyledControllers
         className={`controllers ${additionalClass}`}>
            <Title title={ title } additionalClass={titleAdditionsClass}></Title>
            <div className={`controllers-wrapper`}>

                {controllers.map((controller: any) => {
                    const shouldDisableNextGeneration = controller.controllNextGeneration && disableNextGeneration;
                    const shouldDisable = controller.toggleDisabledClass && gameIsRunning;
                    return (
                        <StyledButton
                            key={controller.controllerName}
                            onClick={() => {onControllerClicked(controller) }}
                            disabled={shouldDisable || shouldDisableNextGeneration}
                        >
                            {controller.title}
                        </StyledButton>
                    )
                })}

            </div>
        </StyledControllers>
    );   
}