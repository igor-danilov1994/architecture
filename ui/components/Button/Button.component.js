import {GAME_STATUSES} from "../../../core/consts.js";

export const ButtonComponent = (inner, onClick) => {
    const element = document.createElement('button')

    if(GAME_STATUSES.SETTINGS) {
        render(element, onClick, inner)
    }

    return {
        element,
    }
}

const render = async (element, onClick, inner) => {
    element.addEventListener('click', onClick)
    element.append(inner)

    return element
}

