import {
    _unSubscribe,
    getPositionGoogle,
    getPositionPlayer,
    subscribe
} from "../../../../core/state-manager.js";
import {GoogleComponent} from "../../common/Google/Google.component.js";
import {PlayerComponent} from "../../common/Player/Player.component.js";
import {EVENTS} from "../../../../core/consts.js";

export const CellComponent = (x, y) => {
    const localState = { renderVersion: 0 }
    const element = document.createElement('td');
    element.classList.add('td');

    const observer = (e) => {
        if ([
            EVENTS.GOOGLE_JUMPED,
            EVENTS.PLAYER1_MOVED,
            EVENTS.PLAYER2_MOVED
        ].every(name => e.name !== name)) return;

        const { prevPosition, newPosition } = e.payload;

        if ((prevPosition.x === x && prevPosition.y === y) || (newPosition.x === x && newPosition.y === y)) {
            render(element, x, y, localState);
        }
    };

    subscribe(observer);

    render(element, x, y, localState);

    return {
        element,
        cleanup: () => {
            _unSubscribe(observer);
        }
    };
};

const render = async (element, x, y, localState) => {
    localState.renderVersion++
    const currentRenderVersion = localState.renderVersion;

    try {
        element.innerHTML = '';

        const [googleComponent, player1Component, player2Component] = await Promise.all([
            GoogleComponent(),
            PlayerComponent(1),
            PlayerComponent(2)
        ]);

        //Abort double render
        if(currentRenderVersion < localState.renderVersion) return

        const [googlePosition, player1Position, player2Position] = await Promise.all([
            getPositionGoogle(),
            getPositionPlayer(1),
            getPositionPlayer(2)
        ]);

        if (googlePosition.x === x && googlePosition.y === y) {
            element.append(googleComponent.element);
        }
        if (player1Position.x === x && player1Position.y === y) {
            element.append(player1Component.element);
        }
        if (player2Position.x === x && player2Position.y === y) {
            element.append(player2Component.element);
        }
    } catch (error) {
        console.error('Error during rendering:', error);
    }
};
