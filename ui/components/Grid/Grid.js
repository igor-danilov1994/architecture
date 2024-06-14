import {getGridSize, movePlayer} from "../../../core/state-manager.js";
import {CellComponent} from "./Cell/CellComponent.js";
import {MOVING_DIRECTION} from "../../../core/consts.js";

export const GridComponent = () => {
    const element = document.createElement('table');
    element.classList.add('grid');

    const localState = { cleanupFunctions: [] };

    document.addEventListener('keyup', keyUpHandler)

    function keyUpHandler(e) {
        switch (e.code) {
            case 'ArrowUp':
                movePlayer(1, MOVING_DIRECTION.UP)
                break
            case 'ArrowDown':
                    movePlayer(1, MOVING_DIRECTION.DOWN)
                break
            case 'ArrowLeft':
                movePlayer(1, MOVING_DIRECTION.LEFT)
                break
            case 'ArrowRight':
                movePlayer(1, MOVING_DIRECTION.RIGHT)
                break
            case 'KeyW':
                movePlayer(2, MOVING_DIRECTION.UP)
                break
            case 'KeyS':
                movePlayer(2, MOVING_DIRECTION.DOWN)
                break
            case 'KeyA':
                movePlayer(2, MOVING_DIRECTION.LEFT)
                break
            case 'KeyD':
                movePlayer(2, MOVING_DIRECTION.RIGHT)
                break
            default:
                console.log('keyUpHandler')
        }
    }

    render(element, localState);

    return {
        element,
        cleanup: () => {
            localState.cleanupFunctions.forEach(cf => cf());
            document.removeEventListener('keyup', keyUpHandler);
        }
    };
};

const render = async (element, localState) => {
    try {
        element.innerHTML = '';

        const { rowsCount, columnCount } = await getGridSize();

        localState.cleanupFunctions.forEach(cf => cf());
        localState.cleanupFunctions = [];

        for (let y = 0; y < rowsCount; y++) {
            const rowElement = document.createElement('tr');

            for (let x = 0; x < columnCount; x++) {
                const cellComponent = CellComponent(x, y);
                localState.cleanupFunctions.push(cellComponent.cleanup);
                rowElement.append(cellComponent.element);
            }

            element.append(rowElement);
        }
    } catch (error) {
        console.error('Error during grid rendering:', error);
    }
};
