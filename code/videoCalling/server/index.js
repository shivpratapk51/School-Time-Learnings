import { Server } from "socket.io";

const io = new Server(8000, {
  cors: true,
});

const emailToSocketMap = new Map();
const socketToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.on("room:join", (data) => {
    const { emailId, roomId } = data;
    emailToSocketMap.set(emailId, socket.id);
    socketToEmailMap.set(socket.id, emailId);
    io.to(roomId).emit("user:joined", { emailId, id: socket.id });
    socket.join(roomId);


    io.to(socket.id).emit("room:join", data);

  });
});
