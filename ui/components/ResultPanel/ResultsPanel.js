import {getGoogle, getPlayer, subscribe} from "../../../core/state-manager.js";


export const ResultsPanelComponents =  () => {
    const element = document.createElement('div')

    subscribe(() => {
        render(element)
    })

    render(element)

    return {element}
}


const render = async (element) => {
    element.innerHTML = ''
    const google = await getGoogle()
    const player1 = await getPlayer(1)
    const player2 = await getPlayer(2)

    element.append(`Google: ${JSON.stringify(google, null, 2)}, Player1: ${JSON.stringify(player1, null, 2)}, Player2: ${JSON.stringify(player2, null, 2)}`)
}
