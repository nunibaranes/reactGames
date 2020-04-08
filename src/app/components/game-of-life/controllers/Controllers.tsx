import React from "react";

import Title from "../../common/title/Title";
import { IControllersProps, IController } from "./Controller.interface";

import { StyledButton } from "../../../styles/common/common.styles";
import {
  StyledControllers,
  StyledControllersActions,
} from "../gameOfLife-styles";

/**
 * getGameControllers
 */
export const getGameControllers = ({
  timerIsRunning,
  isGameOver,
  clearBoard,
  stopGame,
  runGame,
  getNextGenerationBoard,
}: {
  timerIsRunning: boolean;
  isGameOver: boolean;
  clearBoard: () => void;
  stopGame: () => void;
  runGame: () => void;
  getNextGenerationBoard: () => void;
}): IController[] => {
  return [
    {
      title: "Clear",
      controllerName: "clearBoardBtn",
      classes: "btn control-clear-board-game",
      toggleDisabledClass: true,
      callback: () => {
        clearBoard();
      },
    },
    {
      title: timerIsRunning ? "Stop" : "Run",
      controllerName: "stopOrRunGameBtn",
      classes: timerIsRunning
        ? "btn control-stop-game"
        : "btn control-run-game",
      controlsNextGeneration: true,
      isDisabled: isGameOver,
      callback: () => {
        if (timerIsRunning) {
          stopGame();
        } else {
          runGame();
        }
      },
    },
    {
      title: "Next Generation",
      controllerName: "SetNGBoardStatusBtn",
      classes: "btn control-next-generation",
      toggleDisabledClass: true,
      controlsNextGeneration: true,
      isDisabled: isGameOver,
      callback: () => {
        getNextGenerationBoard();
      },
    },
  ];
};

export default function Controllers(props: IControllersProps) {
  const {
    gameIsRunning,
    alignment,
    additionalClass = "",
    disableNextGeneration = false,
    title,
    controllers,
    titleAdditionsClass = "",
    titleAlignment,
    onControllerClicked,
  } = props;

  return (
    <StyledControllers
      className={`controllers ${additionalClass}`}
      alignment={alignment}
    >
      <Title
        title={title}
        additionalClass={titleAdditionsClass}
        alignment={titleAlignment}
      ></Title>
      <StyledControllersActions className={`controllers-wrapper`}>
        {controllers.map((controller: IController) => {
          const shouldDisableNextGeneration =
            controller.controlsNextGeneration && disableNextGeneration;
          const shouldDisable = controller.toggleDisabledClass && gameIsRunning;
          return (
            <StyledButton
              key={controller.controllerName}
              onClick={() => {
                onControllerClicked(controller);
              }}
              disabled={
                shouldDisable ||
                controller.isDisabled ||
                shouldDisableNextGeneration
              }
            >
              {controller.title}
            </StyledButton>
          );
        })}
      </StyledControllersActions>
    </StyledControllers>
  );
}
