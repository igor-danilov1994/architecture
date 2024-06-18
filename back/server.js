import express from 'express';
import cors from 'cors';
import {
    start,
    getGameStatus,
    getPositionGoogle,
    startAgain,
    getPositionPlayer,
    getGridSize,
    getPlayer,
    getGoogle,
    movePlayer,
    subscribe,
    _unSubscribe
} from "../core/state-manager-server.js"

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const observer = (e) => {
        res.write(`data: ${JSON.stringify(e)}\n\n`);
    }

    subscribe(observer)

    req.on('close', () => {
        _unSubscribe(observer)
        res.end();
    });
})


app.get('/start', async (req, res) => {
    await start()
    res.send(200)
})

app.get('/startAgain', async (req, res) => {
    await startAgain()
    res.send(200)
})

app.get('/getGameStatus', async (req, res) => {
    const gameStatus = await getGameStatus()
    res.send({data: gameStatus})
})

app.get('/getGridSize', async (req, res) => {
    const gridSize = await getGridSize()
    res.send({data: gridSize})
})

app.get('/getPlayerPoints', async (req, res) => {
    const playerNumber = req.query.playerNumber

    const playerPoints = await getPlayer(playerNumber)
    res.send({data: playerPoints})
})

app.get('/getGooglePoints', async (req, res) => {
    const googlePoints = await getGoogle()
    res.send({data: googlePoints})
})

app.get('/getGooglePosition', async (req, res) => {
    const googlePosition = await getPositionGoogle()

    res.send({data: googlePosition})
})

app.get('/getPositionPlayer', async (req, res) => {
    const playerNumber = req.query.playerNumber

    const playerPosition = await getPositionPlayer(playerNumber)
    res.send({data: playerPosition})
})

app.get('/getMovePlayer', async (req, res) => {
    const playerNumber = req.query.playerNumber
    const direction = req.query.direction

    await movePlayer(playerNumber, direction)

    res.send(200)
})

app.listen(port, () => {
    console.log('server RUN')
})
