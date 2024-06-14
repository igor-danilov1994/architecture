import {startAgain} from "../../../core/state-manager.js";
import {ButtonComponent} from "../Button/Button.component.js";

export const LoseComponent = () => {
    const element = document.createElement('div')

    render(element)

    return {element}
}

const render = async (element) => {
    const titleElement = document.createElement('h1')
    titleElement.innerText = 'You are lose!'

    const button = ButtonComponent('start again', startAgain)

    element.append(titleElement, button.element)

    return element
}

