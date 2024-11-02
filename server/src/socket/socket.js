import { onJoinRoom } from './events/onJoinRoom.js'
import { onSendMessage } from './events/onSendMessage.js'
import { onDisconnect } from './events/onDisconnect.js'
import authMiddleware from './middleware/authMiddleware.js'

export function setupSocket(io) {
    io.use(authMiddleware)

    io.on("connection", (socket) => {
        console.log('New client connected: ', socket.id)


        socket.on("joinRoom", (data) => onJoinRoom(io, socket, data))
        socket.on("sendMessage", (data) => onSendMessage(io, socket,data))
        socket.on("disconnect", () => onDisconnect(socket))
    })

   
}
