const _state = {
    settings: {
        gridSize: {
            rowsCount: 4,
            columnCount: 4
        },
    },
    positions: {
        google: {
            x: 1,
            y: 1
        },
        players: [{x: 1, y: 3}, {x: 3, y: 3}],
    },
    points: {
        google: 12,
        players: [10, 11]
    }
}

const _getPlayerIndexByNumber = (playerNumber) => {
    const playerIndex = playerNumber - 1

    if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
        throw new Error('Incorrect player number')
    }

    return playerIndex;
}

// Interface
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
