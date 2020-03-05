
import React from 'react';
import styled from 'styled-components';

import Title from '../../common/title/Title';
import { IControllersProps } from "./Controller.interface"
import { StyledButton } from '../../../styles/common/common.styles';

import './Controllers.scss'

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

const StyledControllers = styled('section')`
    display: flex;
    flex-direction: column;

    .controllers-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &.align-left {        
        .controllers-wrapper {
            justify-content:left;
        }
    }
    &.align-right {        
        .controllers-wrapper {
            justify-content: right;
        }
    }
    &.align-center {        
        .controllers-wrapper {
            justify-content: center;
        }
    }
`

Controllers.defaultProps = {
    additionalClass: '',
    titleAdditionsClass: '',
    disableNextGeneration: false,
};