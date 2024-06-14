import {GridComponent} from "./Grid/Grid.js";
import {SettingsComponents} from "./Settings/Settings.js";
import {ResultsPanelComponents} from "./ResultPanel/ResultsPanel.js";
import {LoseComponent} from "./Lose/Lose.component.js";
import {getGameStatus, subscribe} from "../../core/state-manager.js";
import {GAME_STATUSES} from "../../core/consts.js";
import {StartComponents} from "./Start/Start.component.js";
import {WinComponent} from "./Win/Win.component.js";
import {AudioComponent} from "./Audio/Audio.component.js";

export const AppComponent = () => {
    const localeState = {prevGameStatus: null, cleanupFunctions: []}
    const element = document.createElement('div')

    subscribe(() => {
        render(element, localeState)
    })

    const audioComponent  = AudioComponent()

    render(element, localeState)

    return {element}
}

const render = async (element, localeState) => {
    const gameStatus = await getGameStatus()

    if (gameStatus === localeState.prevGameStatus) {
        return
    }

    localeState.prevGameStatus = gameStatus

    const settingsComponent = SettingsComponents()

    localeState.cleanupFunctions.forEach(cf => cf())
    localeState.cleanupFunctions = []

    element.innerHTML = ''

    switch (gameStatus) {
        case GAME_STATUSES.SETTINGS:
            const startComponent = StartComponents()

            element.append(settingsComponent.element, startComponent.element)
            break
        case GAME_STATUSES.IN_PROGRESS:
            const gridComponent  = GridComponent()
            const resultsPanelComponent = ResultsPanelComponents()

            localeState.cleanupFunctions.push(gridComponent.cleanup)
            localeState.cleanupFunctions.push(resultsPanelComponent.cleanup)

            element.append(resultsPanelComponent.element, settingsComponent.element, gridComponent.element);
            break
        case GAME_STATUSES.LOSE:
            const loseComponent = LoseComponent()

            element.append(loseComponent.element)
            break
        case GAME_STATUSES.WIN:
            const winComponent = WinComponent()
            element.append(winComponent.element)
            break
        default:
          throw new Error('Not implemented!')
    }
}
