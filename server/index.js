import { Server } from "socket.io";

let onlineUsers = [];

const io = new Server({
  cors: {
    origin: "*",  // Allow all origins for testing
    methods: ["GET", "POST"],
    credentials: true
  },
});

// Helper function to add a new user
const addUser = (userEmail, chatRoom, socketId) => {
  const existingUser = onlineUsers.find((user) => user.userEmail === userEmail);
  if (!existingUser) {
    onlineUsers.push({ userEmail, chatRoom, socketId });
    return true;
  }
  return false;
};

// Helper function to get room users
const getRoomUsers = (room) => {
  return onlineUsers.filter(user => user.chatRoom === room);
};

io.on("connection", (socket) => {
  console.log(`New client connected with ID: ${socket.id}`);

  // Handle new user joining
  socket.on("newUserJoining", (payload) => {
    console.log("New user joining:", payload);
    socket.join(payload.chatRoom);
    const added = addUser(payload.userEmail, payload.chatRoom, socket.id);
    console.log("Users in room", payload.chatRoom, ":", getRoomUsers(payload.chatRoom));
    
    // Only emit online users to the specific room
    io.to(payload.chatRoom).emit("onlineUsers", getRoomUsers(payload.chatRoom));
    
    // Emit welcome message only to the joining user
    socket.emit("message", {
      type: "info",
      text: `Welcome to the ${payload.chatRoom} room!`,
      timestamp: new Date().toISOString()
    });

    // Broadcast to others in the same room only
    socket.to(payload.chatRoom).emit("message", {
      type: "info",
      text: `${payload.userEmail} has joined the ${payload.chatRoom} room`,
      timestamp: new Date().toISOString()
    });
  });

  // Handle new messages - only send to the specific room
  socket.on("newMessage", (payload) => {
    console.log("New message received in room", payload.chatRoom);
    io.to(payload.chatRoom).emit("allMessages", {
      senderEmail: payload.senderEmail,
      userMessage: payload.userMessage,
      timestamp: new Date().toISOString()
    });
  });

  // Handle typing status - only send to the specific room
  socket.on("typing", (payload) => {
    socket.to(payload.chatRoom).emit("userTyping", {
      userEmail: payload.userEmail,
      isTyping: true
    });
  });

  // Handle stop typing - only send to the specific room
  socket.on("stopTyping", (payload) => {
    socket.to(payload.chatRoom).emit("userTyping", {
      userEmail: payload.userEmail,
      isTyping: false
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    const user = onlineUsers.find((user) => user.socketId === socket.id);
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    if (user) {
      // Only notify users in the same room about the disconnection
      io.to(user.chatRoom).emit("onlineUsers", getRoomUsers(user.chatRoom));
      io.to(user.chatRoom).emit("message", {
        type: "info",
        text: `${user.userEmail} has left the ${user.chatRoom} room`,
        timestamp: new Date().toISOString()
      });
    }
  });
});

const PORT = process.env.PORT || 3001;
io.listen(PORT);
console.log(`Server running on port ${PORT}`);