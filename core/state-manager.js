const API_URL = "http://localhost:3000";

const eventSource = new EventSource(`${API_URL}/events`);

eventSource.addEventListener('message',  (e) => {
    const event = JSON.parse(e.data);

    _notifyObservers(event.name, event.payload)
})

//OBSERVER
let _observers = []
export function subscribe(observer)  {
    _observers.push(observer)
}

export function _unSubscribe(observer) {
    _observers = _observers.filter((o) => o !== observer);
}

/**
 * @param { payload } this object with prevPosition and newPosition
 */
function _notifyObservers(name, payload = {}) {
    const event = {
        name,
        payload
    }

    _observers.forEach(observer => {
        try {
            observer(event)
        } catch (e) {
            console.log(e)
        }
    })
}

// Interface
export const start = async () => {
    await fetch(`${API_URL}/start`)
}

export const startAgain = async () => {
    await fetch(`${API_URL}/startAgain`)
}

export const getGameStatus = async () => {
    const resp = await fetch(`${API_URL}/getGameStatus`)
    const respPayload = await resp.json()

    if (respPayload) return respPayload.data
}

export const getGoogle = async () => {
    const resp = await fetch(`${API_URL}/getGooglePoints`)
    const respPayload = await resp.json()

    if (respPayload) return respPayload.data
}

/**
 * @param {number} playerNumber - one based index og player
 * @returns {Promise<number>} number of points
 */
export const getPlayer = async (playerNumber) => {
    const resp = await fetch(`${API_URL}/getPlayerPoints?playerNumber=${playerNumber}`)
    const respPayload = await resp.json()

    if (respPayload) return respPayload.data
}

export const getGridSize = async () => {
    const resp = await fetch(`${API_URL}/getGridSize`)
    const respPayload = await resp.json()

    if (respPayload) return respPayload.data
}

export const getPositionGoogle = async () => {
    const resp = await fetch(`${API_URL}/getGooglePosition`)
    const respPayload = await resp.json()

    if (respPayload) return respPayload.data
}

export const getPositionPlayer = async (playerNumber) => {
    const resp = await fetch(`${API_URL}/getPositionPlayer?playerNumber=${playerNumber}`)
    const respPayload = await resp.json()

    if (respPayload) return respPayload.data
}

//
export const movePlayer = async (playerNumber, direction) => {
    await fetch(`${API_URL}/getMovePlayer?playerNumber=${playerNumber}&direction=${direction}`)
}
