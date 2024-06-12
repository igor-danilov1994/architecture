import {getPositionGoogle, getPositionPlayer} from "../../../../core/state-manager.js";
import {GoogleComponent} from "../../common/Google/Google.component.js";
import {PlayerComponent} from "../../common/Player/Player.component.js";


export const CellComponent = (x, y) => {
    const element = document.createElement('td')
    element.classList.add('td')

    render(element, x, y)

    return {element};
};

const render = async (element, x, y) => {
    const googleComponent = await GoogleComponent()
    const player1Component = await PlayerComponent(1)
    const player2Component = await PlayerComponent(2)

    const googlePosition = await getPositionGoogle()
    const player1Position = await getPositionPlayer(1)
    const player2Position = await getPositionPlayer(2)

    if (googlePosition.x === x && googlePosition.y === y) {
        element.append(googleComponent.element)
    }
    if (player1Position.x === x && player1Position.y === y) {
        element.append(player1Component.element)
    }
    if (player2Position.x === x && player2Position.y === y) {
        element.append(player2Component.element)
    }
}
