import {GAME_STATUSES} from "./consts.js";

const _state = {
    gameState: GAME_STATUSES.SETTINGS,
    settings: {
        gridSize: {
            rowsCount: 4,
            columnCount: 4
        },
        pointsToLose: 5,
        pointsToWin: 5,
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
    _observers.filter((o) => o !== observer)
}

function _notifyObservers() {
    _observers.forEach(observer => {
        try {
            observer()
        } catch (e) {
            console.log(e)
        }
    })
}

function _generateToNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function _jumpGoogleToNewPosition() {
    const newPositions = {..._state.positions.google}

    do {
        var maxColumnCount = _state.settings.gridSize.columnCount
        var maxRowCount = _state.settings.gridSize.rowsCount
        var googlePosition = _state.positions.google
        var player1Position = _state.positions.players[0]
        var player2Position = _state.positions.players[1]

        newPositions.x = _generateToNumber(0, maxColumnCount)
        newPositions.y = _generateToNumber(0, maxRowCount)

        var isMatchGooglePosition = newPositions.x === googlePosition.x && newPositions.y === googlePosition.y
        var isMatchPlayer1Position = newPositions.x === player1Position.x && newPositions.y === player1Position.y
        var isMatchPlayer2Position = newPositions.x === player2Position.x && newPositions.y === player2Position.y
    } while (isMatchGooglePosition || isMatchPlayer1Position || isMatchPlayer2Position)

    _state.positions.google = newPositions
}

let googleJumpInterval;

// Interface
export const start = async () => {
    _state.positions.players[0] = {x: 0, y: 0};
    _state.positions.players[1] = {
        x: _state.settings.gridSize.columnCount - 1,
        y: _state.settings.gridSize.rowsCount - 1
    };
    _state.points.google = 0
    _state.points.players = [0, 0]
    _state.gameState = GAME_STATUSES.IN_PROGRESS

    _jumpGoogleToNewPosition()

    googleJumpInterval = setInterval(() => {
        _jumpGoogleToNewPosition()
        _state.points.google++

        if(_state.points.google === _state.settings.pointsToLose){
            clearInterval(googleJumpInterval)
            _state.gameState  = GAME_STATUSES.LOSE
        }

        _notifyObservers()
    }, _state.settings.googleJumpInterval)
    _notifyObservers()
}

export const startAgain = async () => {
    _state.gameState = GAME_STATUSES.SETTINGS
    _notifyObservers()
}

const _getPlayerIndexByNumber = (playerNumber) => {
    const playerIndex = playerNumber - 1

    if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
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
