import { Alignment } from "../../../interfaces/common/ui";

export interface IControllersProps {
  title: string;
  controllers: IController[];
  onControllerClicked: (controller?: IController) => void;
  additionalClass?: string;
  alignment?: Alignment;
  titleAdditionsClass?: string;
  titleAlignment?: Alignment;
  gameIsRunning?: boolean;
  disableNextGeneration?: boolean;
}

export interface IController {
  title: string;
  controllerName: string;
  classes: string;
  toggleDisabledClass?: boolean;
  controlsNextGeneration?: boolean;
  callback: () => void;
}
