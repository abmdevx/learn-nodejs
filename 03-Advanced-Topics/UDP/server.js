import dgram from "dgram";

const server = dgram.createSocket("udp4");

server.on("message", (data, rinfo) => {
  const message = data.toString();

  console.log("Client:", message);

  server.send(
    `Echo: ${message}`,
    rinfo.port,
    rinfo.address
  );
});

server.on("listening", () => {
  const address = server.address();

  console.log(`UDP server listening on ${address.port}`);
});

server.bind(3500);