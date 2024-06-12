import {startAgain} from "../../../core/state-manager.js";


export const LoseComponent = () => {
    const element = document.createElement('div')

    render(element)

    return {element}
}

const render = async (element) => {
    const titleElement = document.createElement('h1')
    titleElement.innerText = 'You are lose!'

    const button = document.createElement('button')
    button.addEventListener('click', () => {
        startAgain()
    })
    button.innerHTML = 'Start again'

    element.append(titleElement, button)

    return element
}

