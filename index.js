const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5050;
// eslint-disable-next-line new-cap
const http = require('http').Server(app);
const socketIO = require('socket.io')(http);

socketIO.on('connection', function(socket) {
  console.log(`⚡: ${socket.id} user just connected`);
  socket.on('disconnect', function() {
    console.log('Disconnect');
  });
  socket.on('message', function(data) {
    socket.broadcast.emit('response', data);
  });
});

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, function() {
  console.log(`Server run port ${PORT}`);
});
