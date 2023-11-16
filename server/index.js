const app = require('./api/app')
const port = process.env.PORT || 3000
const path = require('path')

app.get('/dashboard', async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'dashboard', 'index.html'));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//TODO not for production
const server = app.listen(port, () => {
    console.log(`${process.env.PORT ? 'Server started' : 'Server listening on http://localhost:3000'}`);
})

const io = require("socket.io")(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

app.set('io', io)

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    })
})