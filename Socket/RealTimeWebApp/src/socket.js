import { Server } from 'socket.io';

export function setupSocketIO(server) {
    const io = new Server(server);

    // Define socket.io logic
    io.on("connection", (socket) => {
        console.log("A user connected");

        // Handle messages from clients
        socket.on("message", (message) => {

            // Broadcast the message to all connected clients except the sender
            socket.broadcast.emit("message", message);
        });

        // Handle disconnections
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
}
