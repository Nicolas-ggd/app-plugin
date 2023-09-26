import { io } from "socket.io-client";

const socket = io("http://localhost:8080/");

// hendle connections
socket.on("connect", () => {
  console.log("Connected to the server");
});

export default socket;