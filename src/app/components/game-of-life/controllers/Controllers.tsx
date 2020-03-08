
import React from 'react';

import Title from '../../common/title/Title';
import { IControllersProps } from "./Controller.interface";

import { StyledButton } from '../../../styles/common/common.styles';
import { StyledControllers, StyledControllersActions } from '../gameOfLife-styles';

export default function Controllers(props: IControllersProps) {
    const {
        gameIsRunning,
        alignment,
        additionalClass = '',
        disableNextGeneration = false,
        title,
        controllers,
        titleAdditionsClass = '',
        titleAlignment,
        onControllerClicked,
    } = props;

    return (
        <StyledControllers
         className={`controllers ${additionalClass}`}
         alignment={alignment}
         >
            <Title title={ title } additionalClass={titleAdditionsClass} alignment={titleAlignment}></Title>
            <StyledControllersActions className={`controllers-wrapper`}>
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
            </StyledControllersActions>
        </StyledControllers>
    );   
}