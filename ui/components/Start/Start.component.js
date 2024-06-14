import {ButtonComponent} from "../Button/Button.component.js";
import {start} from "../../../core/state-manager.js";
import {GAME_STATUSES} from "../../../core/consts.js";

export const StartComponents = () => {
    const element = document.createElement('div')

    if(GAME_STATUSES.SETTINGS) {
        render(element)
    }

    return {element}
}

const render = async (element) => {
    const onClickHandler = () => {
        start()
    }

    const button = ButtonComponent('Start', onClickHandler)

    element.append(button.element)

    return element
}

