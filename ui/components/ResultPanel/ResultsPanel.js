import {
    _unSubscribe,
    getGoogle,
    getPlayer,
    subscribe
} from "../../../core/state-manager.js";
import {EVENTS} from "../../../core/consts.js";

export const ResultsPanelComponents =  () => {
    const element = document.createElement('div')

    const observer = (e) => {
       if(e.name === EVENTS.SCORE_CHANGED) {
           render(element)
       }
    }

    subscribe(observer)

    render(element)

    return {element, cleanup: () => {_unSubscribe(observer)}}
}

const render = async (element) => {
    element.innerHTML = ''

    const [google, player1, player2] = await Promise.all([
        getGoogle(),
        getPlayer(1),
        getPlayer(2),
    ]);

    element.append(`Google: ${JSON.stringify(google, null, 2)}, Player1: ${JSON.stringify(player1, null, 2)}, Player2: ${JSON.stringify(player2, null, 2)}`)
}
