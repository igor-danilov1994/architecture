import {ButtonComponent} from "../Button/Button.component.js";
import {startAgain} from "../../../core/state-manager.js";

export const WinComponent = () => {
    const element = document.createElement('div')

    render(element)

    return {element}
}

const render = async (element) => {
    const titleElement = document.createElement('h1')
    titleElement.innerText = 'You are win!'

    const button = ButtonComponent('start again', startAgain)

    element.append(titleElement, button.element)

    return element
}

