const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);

// Allow socket connections from any origin (adjust in production!)
const io = new Server(server, {
  cors: { origin: '*' }
});

let onlineUsers = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('user_connected', (userId) => {
    onlineUsers[userId] = socket.id;
    console.log(`User ${userId} connected with socket ${socket.id}`);
    io.emit('update_users', Object.keys(onlineUsers));
  });
 
  // Broadcast and store messages
  socket.on('send_message', ({ from, to, message }) => {
      const receiverSocket = onlineUsers[to];
      if (receiverSocket) {
          io.to(receiverSocket).emit('receive_message', { from, message });
      }
  });

  // Cleanup on disconnect
  socket.on('disconnect', () => {
      for (let userId in onlineUsers) {
          if (onlineUsers[userId] === socket.id) {
              delete onlineUsers[userId];
              break;
          }
      }
      io.emit('update_users', Object.keys(onlineUsers));
      console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
