var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


io.on('connection', (socket) => {

    socket.on('walletUpdate', function(data){
        io.emit('walletUpdate', data);
    });

    socket.on('newTransaction', function(){
        io.emit('newTransaction');
    });


});

http.listen(5555, () => {
    console.log('Websocket listening on *:5555');
});
