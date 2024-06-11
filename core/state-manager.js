const _state = {
    settings: {
        gridSize: {
            rowsCount: 4,
            columnCount: 4
        },
    },
    points: {
        google: 12,
        players: [10, 11]
    }
}

export const getGoogle = async () => {
    return _state.points.google
}

/**
 * @param {number} playerNumber - one based index og player
 * @returns {Promise<number>} number of points
 */
export const getPlayer = async (playerNumber) => {
    const playerIndex = playerNumber - 1

    if (playerIndex < 0 || playerIndex > _state.points.players.length - 1 ) {
        throw new Error('Incorrect player number')
    }

    return _state.points.players[playerIndex]
}

export const getGridSize = async () => {
    return _state.settings.gridSize
}
