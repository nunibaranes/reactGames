export interface IControllersProps {
    title: string,
    controllers: IController[],
    onControllerClicked: (controller?: IController) => void,
    additionalClass?: string,
    titleAdditionsClass?: string,
    gameIsRunning?: boolean,
    disableNextGeneration?: boolean
}

export interface IController {
    title: string,
    controllerName: string,
    classes: string,
    toggleDisabledClass?: boolean,
    controllNextGeneration?: boolean,
    callback: () => void,
}