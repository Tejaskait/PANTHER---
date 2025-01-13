import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { Server } from 'socket.io';

dotenv.config();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = new Server(server, {
  cors: {
      origin: '*'
  }
});
io.use((socket, next) => {
  try {
      const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[ 1 ];
      if (!token) {
          return next(new Error('Authentication error'))
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
          return next(new Error('Authentication error'))
      }
      socket.user = decoded;
      next();
  } catch (error) {
      next(error)
  }
})

io.on('connection', socket => {
    console.log('a user connected');
    socket.on('event', data => { /* … */ });
    socket.on('disconnect', () => { /* … */ });
});
server.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);  // Display server running message
})

