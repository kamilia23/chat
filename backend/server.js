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

// In-memory data stores
const contacts = [
  { id: '1', name: 'Khalid', avatar: 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg', online: false, status: 'Khalid is online', roomId: 'room1' },
  { id: '2', name: 'Taherah Big', avatar: 'https://2.bp.blogspot.com/-8ytYF7cfPkQ/WkPe1-rtrcI/AAAAAAAAGqU/FGfTDVgkcIwmOTtjLka51vineFBExJuSACLcBGAs/s320/31.jpg', online: false, status: 'Taherah left 7 mins ago', roomId: 'room2' },
  { id: '3', name: 'Sami Rafi', avatar: 'https://i.pinimg.com/originals/ac/b9/90/acb990190ca1ddbb9b20db303375bb58.jpg', online: false, status: 'Sami is online', roomId: 'room3' },
  { id: '4', name: 'Nargis Hawa', avatar: 'http://profilepicturesdp.com/wp-content/uploads/2018/07/sweet-girl-profile-pictures-9.jpg', online: false, status: 'Nargis left 30 mins ago', roomId: 'room4' },
  { id: '5', name: 'Rashid Samim', avatar: 'https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg', online: false, status: 'Rashid left 50 mins ago', roomId: 'room5' },
];

// message history per room
const history = {
  room1: [],
  room2: [],
  room3: [],
  room4: [],
  room5: []
};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Emit contact list when requested
  socket.on('getContacts', () => {
    // Update online flags based on active sockets
    const updated = contacts.map(c => ({ ...c, online: io.sockets.adapter.rooms.get(c.roomId)?.size > 0 }));
    socket.emit('contactsList', updated);
  });

  // When a client joins a room
  socket.on('joinRoom', ({ room }) => {
    // Leave all other rooms
    Array.from(socket.rooms)
      .filter(r => r !== socket.id)
      .forEach(r => socket.leave(r));

    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
  });

  // Send chat history
  socket.on('getHistory', ({ room }) => {
    socket.emit('history', history[room] || []);
  });

  // Broadcast and store messages
  socket.on('sendMessage', (msg) => {
    if (!history[msg.roomId]) history[msg.roomId] = [];
    history[msg.roomId].push(msg);
    io.to(msg.roomId).emit('message', msg);
  });

  // Cleanup on disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
