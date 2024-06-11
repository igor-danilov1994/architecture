export const PlayerComponent = async (playerNumber) => {
    const element = document.createElement('img')

    render(element, playerNumber)

    return {element}
}

const render = async (element, playerNumber) => {
    element.src = `assets/images/player${playerNumber}.png`

    return element
}
