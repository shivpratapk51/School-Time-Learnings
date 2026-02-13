import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

// TypeScript interfaces for socket payloads
interface JoinRoomPayload {
    roomId: string;
    userId: string;
}

interface SignalPayload {
    target: string;
    sender: string;
    sdp?: RTCSessionDescriptionInit;
    candidate?: RTCIceCandidateInit;
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST']
    }
});

const PORT = process.env.PORT || 3001;

// Track user-room mappings for cleanup
const userRooms = new Map<string, string>();

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-room', (roomId: string, userId: string) => {
        try {
            socket.join(roomId);
            userRooms.set(socket.id, roomId);

            // Get other users in the room
            const clients = io.sockets.adapter.rooms.get(roomId);
            const users: string[] = [];
            if (clients) {
                clients.forEach((clientId) => {
                    if (clientId !== socket.id) {
                        users.push(clientId);
                    }
                });
            }

            socket.emit('room-users', users);
            socket.to(roomId).emit('user-connected', userId);
            console.log(`User ${userId} joined room ${roomId}. Total users: ${clients?.size || 0}`);
        } catch (error) {
            console.error('Error joining room:', error);
            socket.emit('error', { message: 'Failed to join room' });
        }
    });

    socket.on('offer', (payload: SignalPayload) => {
        try {
            io.to(payload.target).emit('offer', payload);
            console.log(`Offer sent from ${payload.sender} to ${payload.target}`);
        } catch (error) {
            console.error('Error sending offer:', error);
        }
    });

    socket.on('answer', (payload: SignalPayload) => {
        try {
            io.to(payload.target).emit('answer', payload);
            console.log(`Answer sent from ${payload.sender} to ${payload.target}`);
        } catch (error) {
            console.error('Error sending answer:', error);
        }
    });

    socket.on('ice-candidate', (payload: SignalPayload) => {
        try {
            io.to(payload.target).emit('ice-candidate', payload);
            console.log(`ICE candidate sent from ${payload.sender} to ${payload.target}`);
        } catch (error) {
            console.error('Error sending ICE candidate:', error);
        }
    });

    socket.on('disconnect', () => {
        const roomId = userRooms.get(socket.id);
        if (roomId) {
            socket.to(roomId).emit('user-disconnected', socket.id);
            userRooms.delete(socket.id);
            console.log(`User ${socket.id} disconnected from room ${roomId}`);
        } else {
            console.log('User disconnected:', socket.id);
        }
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});

server.listen(PORT, () => {
    console.log(`Signaling server running on port ${PORT}`);
    console.log(`CORS origin: ${process.env.CORS_ORIGIN || '*'}`);
});
