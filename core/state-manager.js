import {EVENTS, GAME_STATUSES, MOVING_DIRECTION} from "./consts.js";

const _state = {
    gameState: GAME_STATUSES.SETTINGS,
    settings: {
        gridSize: {
            rowsCount: 4,
            columnCount: 4
        },
        pointsToLose: 50,
        pointsToWin: 20,
        /**
         * in milliseconds
         */
        googleJumpInterval: 2000,
    },
    positions: {
        google: {
            x: 0,
            y: 0
        },
        players: [{x: 1, y: 3}, {x: 3, y: 3}],
    },
    points: {
        google: 0,
        players: [0, 0]
    }
}


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

function _generateToNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function _jumpGoogleToNewPosition() {
    const prevPosition = { ..._state.positions.google };
    const newPositions = { ..._state.positions.google };

    do {
        var maxColumnCount = _state.settings.gridSize.columnCount;
        var maxRowCount = _state.settings.gridSize.rowsCount;

        newPositions.x = _generateToNumber(0, maxColumnCount);
        newPositions.y = _generateToNumber(0, maxRowCount);
    } while (
        _checkGooglePosition(newPositions) ||
        _doesPositionMatchWithPlayersPosition(newPositions, 0) ||
        _doesPositionMatchWithPlayersPosition(newPositions, 1));

    _state.positions.google = newPositions;

    return prevPosition;
}


let googleJumpInterval;

// Interface
export const start = async () => {
    if (_state.gameState !== GAME_STATUSES.SETTINGS) {
        throw new Error('Incorrect transition!')
    }

    _state.positions.players[0] = {x: 0, y: 0};
    _state.positions.players[1] = {
        x: _state.settings.gridSize.columnCount - 1,
        y: _state.settings.gridSize.rowsCount - 1
    };

    _jumpGoogleToNewPosition()
    _notifyObservers(EVENTS.SCORE_CHANGED)

    _state.points.google = 0
    _state.points.players = [0, 0]
    _state.gameState = GAME_STATUSES.IN_PROGRESS

    googleJumpInterval = setInterval(() => {
        const prevPosition = _jumpGoogleToNewPosition();

        _notifyObservers(EVENTS.GOOGLE_JUMPED, {
            prevPosition: prevPosition,
            newPosition: { ..._state.positions.google }
        });

        _state.points.google++;
        _notifyObservers(EVENTS.SCORE_CHANGED);

        if (_state.points.google === _state.settings.pointsToLose) {
            clearInterval(googleJumpInterval);
            _state.gameState = GAME_STATUSES.LOSE;
            _notifyObservers(EVENTS.STATUS_CHANGED);
        } else {
            _notifyObservers(EVENTS.STATUS_CHANGED);
        }
    }, _state.settings.googleJumpInterval);


    _state.gameState = GAME_STATUSES.IN_PROGRESS
    _notifyObservers(EVENTS.STATUS_CHANGED)
}

export const startAgain = async () => {
    _state.gameState = GAME_STATUSES.SETTINGS
    _notifyObservers(EVENTS.STATUS_CHANGED)
}

const _getPlayerIndexByNumber = (playerNumber) => {
    const playerIndex = playerNumber - 1

    if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
        debugger
        throw new Error('Incorrect player number')
    }

    return playerIndex;
}

export const getGameStatus = async () => {
    return _state.gameState
}

export const getGoogle = async () => {
    return _state.points.google
}

/**
 * @param {number} playerNumber - one based index og player
 * @returns {Promise<number>} number of points
 */
export const getPlayer = async (playerNumber) => {
    const playerIndex = _getPlayerIndexByNumber(playerNumber);

    return _state.points.players[playerIndex]
}

export const getGridSize = async () => {
    return {..._state.settings.gridSize}
}

export const getPositionGoogle = async () => {
    return {..._state.positions.google}
}

export const getPositionPlayer = async (playerNumber) => {
    const playerIndex = _getPlayerIndexByNumber(playerNumber);

    return {..._state.positions.players[playerIndex]}
}

//
export const movePlayer = async (playerNumber, direction) => {
    if (_state.gameState !== GAME_STATUSES.IN_PROGRESS) {
        return
    }
    const playerIndex = _getPlayerIndexByNumber(playerNumber);
    const newPosition = {..._state.positions.players[playerIndex]}
    const prevPosition = {..._state.positions.players[playerIndex]}

    switch (direction) {
        case MOVING_DIRECTION.UP:
            newPosition.y--
            break
        case MOVING_DIRECTION.DOWN:
            newPosition.y++
            break
        case MOVING_DIRECTION.LEFT:
            newPosition.x--
            break
        case MOVING_DIRECTION.RIGHT:
            newPosition.x++
            break
        default:
            throw new Error('Incorrect movePlayer direction')
    }

    const isValidRange = _isPositionInValidRange(newPosition)
    if (!isValidRange) return

    const isPlayer1PositionTheSame = _doesPositionMatchWithPlayersPosition(newPosition, 0)
    if (isPlayer1PositionTheSame) return

    const isPlayer2PositionTheSame = _doesPositionMatchWithPlayersPosition(newPosition, 1)
    if (isPlayer2PositionTheSame) return

    const isGooglePositionTheSame = _checkGooglePosition(newPosition)

    if (isGooglePositionTheSame) {
        _catchGoogle(playerNumber)
    }

    _state.positions.players[playerIndex] = newPosition

    _notifyObservers(`PLAYER${playerNumber}_MOVED`, {
        prevPosition,
        newPosition
    })
}

const _isPositionInValidRange = (newPosition) => {
    if (newPosition.x < 0 || newPosition.x >= _state.settings.gridSize.columnCount) return false
    if (newPosition.y < 0 || newPosition.y >= _state.settings.gridSize.rowsCount) return false

    return true
}

const _doesPositionMatchWithPlayersPosition = (newPositions, playerIndex) => {
    return  newPositions.x === _state.positions.players[playerIndex].x &&
        newPositions.y === _state.positions.players[playerIndex].y
}

const _checkGooglePosition = (newPositions) => {
    return newPositions.x === _state.positions.google.x && newPositions.y === _state.positions.google.y;
}

const  _catchGoogle = (playerNumber) => {
    const playerIndex = _getPlayerIndexByNumber(playerNumber)
    _state.points.players[playerIndex]++
    _notifyObservers(EVENTS.SCORE_CHANGED)

    if (_state.points.players[playerIndex] === _state.settings.pointsToWin){
        _state.gameState = GAME_STATUSES.WIN
        _notifyObservers(EVENTS.STATUS_CHANGED)

        clearInterval(googleJumpInterval);
    } else {
        const prevPosition = {..._state.positions.google}
        const newPosition = {..._state.positions.google}

        _jumpGoogleToNewPosition()
        _notifyObservers(EVENTS.GOOGLE_JUMPED, {
            prevPosition,
            newPosition,
        })
    }
}
