export const CellComponent = (x, y) => {
    const element = document.createElement('td')
    element.classList.add('td')

    render(element, x, y)

    return {element};
};

const render = async (element, x, y) => {
    element.append(`${x}, ${y}`)
}
