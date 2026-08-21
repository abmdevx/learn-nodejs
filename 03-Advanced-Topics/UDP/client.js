import dgram from "dgram";

const client = dgram.createSocket("udp4");

client.on("message", (data) => {
  console.log("Server:", data.toString());

  client.close();
});

client.send(
  "Hello UDP",
  3500,
  "127.0.0.1"
);