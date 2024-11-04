export function onSendMessage(io, socket, data) {
    const { roomId, message } = data; 
    const { public_id, line_manager_id } = socket.handshake.query; 

    if (!message || !roomId) {
        console.log('Missing message or roomId:', { message, roomId });
        return socket.emit("error", "Message or room ID is missing");
    }

    io.to(roomId).emit('Message', {
        sender: public_id || line_manager_id || "Unknown",
        message,
        timestamp: new Date().toISOString()
    });

    console.log(`Message from ${public_id || line_manager_id || "Unknown"} in room ${roomId}: ${message}`);
}
