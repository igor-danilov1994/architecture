import {start} from "../../../core/state-manager.js";

export const StartComponents = () => {
    const element = document.createElement('div')

    render(element)

    return {element}
}

const render = async (element) => {
    const button = document.createElement('button')

    button.innerHTML = 'Start'

    button.addEventListener('click', () => {
        start()
    })
    element.append(button)

    return element
}

