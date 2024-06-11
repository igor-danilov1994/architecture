import {getGoogle, getPlayer} from "../../../core/state-manager.js";

export const ResultsPanelComponents =  () => {
    const element = document.createElement('div')
    render(element)

    return {element}
}


const render = async (element) => {
    const google = await getGoogle()
    const player1 = await getPlayer(1)
    const player2 = await getPlayer(2)

    element.append(`Google: ${google}, Player1: ${player1}, Player2: ${player2}`)
}
