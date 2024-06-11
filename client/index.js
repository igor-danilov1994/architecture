import {AppComponent} from "./components/AppComponent.js";

const rootElement = document.getElementById('root')

rootElement.innerHTML = ''

const appElement = AppComponent()

rootElement.append(appElement.element)


