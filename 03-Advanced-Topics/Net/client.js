// import net from "net";

// const client = net.connect({ port: 3500 }, () => {
//   console.log("Connection established");
//   client.write("Hello from client");
// });

// client.on("data", (data) => {
//   console.log("Msg from server:", data.toString());
// });

// client.on("end", () => {
//   console.log("disconnected from server");
// });

// const net = require("net");
// const readline = require("readline");

// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: "",
// });

// const client = net.connect({ port: 3500 }, () => {
//   console.log("Connection established");
//   client.write("Hello from client");
// });

// client.on("data", (data) => {
//   console.log("Msg from server:", data.toString());
// });

// client.on("end", () => {
//   console.log("disconnected from server");
// });

// rl.prompt();
// rl.on("line", function (line) {
//   client.write(line);
//   rl.prompt();
// });


import net from "net"

const socket = net.connect(6000, () => {
  console.log("server connected!");
  socket.write("Hello from client")
});

socket.on('data', (data) => {
  console.log(data.toString());
});

socket.on('close', () => {
    console.log('Connection closed');
});