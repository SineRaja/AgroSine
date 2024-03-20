// Import the Server class from socket.io
import { Server } from "socket.io";

// Create a new instance of the Socket.IO server on port 8900
const io = new Server(8900, {
    cors: {
        origin: "http://localhost:3000", // Allow requests from this origin
    },
});

// Array to store user data, including their ID and socket ID
let users = [];

// Function to add a user to the users array
const addUser = (userId, socketId) => {
    // Check if the user with the same ID is already in the array
    // If not, add the user to the array
    !users.some(user => user.userId === userId) &&
    users.push({ userId, socketId });
}

// Function to remove a user from the users array based on their socket ID
const removeUser = (socketId) => {
    // Filter out the user with the provided socket ID
    users = users.filter(user => user.socketId !== socketId);
}

// Function to get a user by their user ID
const getUser = (userId) => {
    // Find and return the user with the provided user ID
    return users.find(user => user.userId === userId);
}

// Event listener for when a client connects to the server
io.on("connection", (socket) => {
    // Log that a new agro member has joined
    console.log("An agro member joined.");

    // Event listener to handle when a user sends their user ID to the server
    socket.on("sentUser", (userId) => {
        // Add the user to the users array with their socket ID
        addUser(userId, socket.id);
        // Emit the updated users array to all connected clients
        io.emit("getUsers", users);
    });

    // Event listener to handle when a user sends a message
    socket.on("sentMessage", ({ senderId, receiverId, text }) => {
        // Get the user data of the receiver
        const user = getUser(receiverId);
    
        // Check if the user and their socket ID are defined
        if (user && user.socketId) {
            // Emit the message to the receiver's socket ID
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text,
            });
        } else {
            // Handle the case where the user or socketId is not found.
            console.log("User or socketId not found.");
            // You can emit an error message or take appropriate action here.
        }
    });

    // Event listener for when a client disconnects
    socket.on("disconnect", () => {
        // Log that an agro member has disconnected
        console.log("An agro member disconnected");
        // Remove the disconnected user from the users array
        removeUser(socket.id);
        // Emit the updated users array to all connected clients
        io.emit("getUsers", users);
    });
});
