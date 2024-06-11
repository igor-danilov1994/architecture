export const SettingsComponents = () => {
    const element = document.createElement('div')

    render(element)

    return {element}
}

const render = async (element) => {
    element.append('Settings will be here')

    return element
}

