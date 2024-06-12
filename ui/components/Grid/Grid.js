import {getGridSize, subscribe} from "../../../core/state-manager.js";
import {CellComponent} from "./Cell/CellComponent.js";

export const GridComponents = () => {
    const element = document.createElement('table')
    element.classList.add('grid')

    subscribe(() => {
        render(element)
    })

    render(element)

    return {element}
}

const render = async (element) => {
    element.innerHTML = ''
    const { rowsCount, columnCount } = await getGridSize()

    for (let y = 0; y < rowsCount; y++) {
        const rowElement = document.createElement('tr')

        for (let x = 0; x < columnCount; x++) {
            const cellComponent = CellComponent(x, y);

            rowElement.append(cellComponent.element)
        }
        element.append(rowElement)
    }

    return element
}
