
import React from 'react';
import styled from 'styled-components';

import Title from '../../common/title/Title';
import { IControllersProps, IController } from "./Controller.interface"
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
        isDarkMode,
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
                            <StyledButton
                                key={controller.controllerName}
                                className={getClasses(controller)}
                                onClick={() => {onControllerClicked(controller) }}
                                isDarkMode={isDarkMode}
                            >
                                {controller.title}
                            </StyledButton>
                        )
                    })
                }

            </div>
        </section>
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