const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("A user has connected");

    socket.on("chat message", (msg) => {
        console.log(`Message: ${msg}`);
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("User has disconnected");
    });
})

server.listen(PORT, () => {
    console.log(`Server Listening on port: 3000`);
});