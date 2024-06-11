export const GoogleComponent = async () => {
    const element = document.createElement('img')

    render(element)

    return {element}
}

const render = async (element) => {
    element.src = 'assets/images/google.png'

    return element
}
