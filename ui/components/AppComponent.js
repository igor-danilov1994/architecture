import {GridComponents} from "./Grid/Grid.js";
import {SettingsComponents} from "./Settings/Settings.js";
import {ResultsPanelComponents} from "./ResultPanel/ResultsPanel.js";

export const AppComponent = () => {
    const element = document.createElement('div')

    const gridComponent  = GridComponents()
    const settingsComponent = SettingsComponents()
    const resultsPanelComponent = ResultsPanelComponents()

    element.append(resultsPanelComponent.element, settingsComponent.element, gridComponent.element);

    return {element}
}
