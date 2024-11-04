export function onDisconnect(socket) {
    const { public_id, line_manager_id } = socket 
    
    socket.rooms.forEach((roomId) => {
        socket.to(roomId).emit("message", `${public_id || line_manager_id}  has left the room`)
    });

console.log(`${public_id || line_manager_id} has disconnected`)
}
