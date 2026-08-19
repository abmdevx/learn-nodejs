// import net from "net";

// var server = net.createServer();
// const port = 3500;

// server.on("connection", function (socket) {
//   console.log("Client connected from", socket.remoteAddress, socket.remotePort);
//   socket.write("Hello from the server!");

//   socket.on("data", function (data) {
//     console.log("Msg from client:", data.toString());
//   });

//   socket.on("close", function (err) {
//     if (err) {
//       console.log("Client disconnected due to error");
//     } else {
//       console.log("Client disconnected");
//     }
//   });
// });

// server.on("listening", function () {
//   console.log("Server is listening on port", port);
// });

// server.listen(port);

// const net = require("net");
// const readline = require("readline");

// var server = net.createServer();
// const port = 3500;

// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: "",
// });

// server.on("connection", function (socket) {
//   console.log("Client connected from", socket.remoteAddress, socket.remotePort);
//   socket.write("Hello from the server!");

//   socket.on("data", function (data) {
//     console.log("Msg from client:", data.toString());
//   });

//   rl.prompt();
//   rl.on("line", function (line) {
//     socket.write(line);
//     rl.prompt();
//   });

//   socket.on("close", function (err) {
//     if (err) {
//       console.log("Client disconnected due to error");
//     } else {
//       console.log("Client disconnected");
//     }
//   });
// });

// server.on("listening", function () {
//   console.log("Server is listening on port", port);
// });

// server.listen(port);


// practice set here

// create server

import net from "net";
const server = net.createServer();
const port = 6000;

server.on("connection", (socket) => {
  console.log("client connected")
  
  socket.on("data", (data) => {
    console.log(data.toString())
    socket.write("Hello from server!")
  })

  socket.on("close", () => {
    console.log('Connection closed');
  })
})

server.on("listening", function () {
  console.log("Server is listening on port", port);
});

server.listen(port);