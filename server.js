const
    port = parseInt(process.env.PORT, 10) || 3000,
    dev = process.env.NODE_ENV !== 'production',
    next = require('next'),

    app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    nextApp = next({ dev }),
    nextHandler = nextApp.getRequestHandler();

let messagesStore = [];

io.on("connection", socket => {
    console.log(`  -> ${socket.id} connected`);

    socket.emit('updateMessages', messagesStore);

    socket.on('newMsg', msg => {
        messagesStore.push(msg);
        io.emit('updateMessages', messagesStore);
    })

    socket.on('disconnect', () => {
		console.log(`  <- ${socket.id} disconnected`);
    });
});


nextApp.prepare().then(() => {
    app.all('*', (req, res) => {
        return nextHandler(req, res);
    });

    server.listen(port, () => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});