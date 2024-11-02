import databaseService from './service/databaseService.js';
import { setupSocket } from './socket/socket.js';
import { Server } from 'socket.io';

const startServer = async () => {
    try {

        await databaseService.connect();
        
        const io = new Server(4000, { cors: { origin: '*' } });
        setupSocket(io);
        console.log('WebSocket server is running on port 4000');
        
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();
