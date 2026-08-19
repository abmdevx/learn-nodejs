# Net

## What is it?

The Node.js **`net` module** is a built-in module for creating and managing **TCP network connections**.

It can be used to create both:

* TCP servers
* TCP clients

A **socket** represents an established TCP connection and allows the client and server to exchange data.

## How it works

### TCP communication

TCP is **connection-oriented**:

```text
Client
  ↓
Establish TCP connection
  ↓
Server
  ↓
Exchange data reliably
```

TCP provides reliable, ordered, error-checked data transmission.

### Creating a TCP server

```js
const net = require("net");

const server = net.createServer((socket) => {
    console.log("Client connected");
});

server.listen(3500);
```

`net.createServer()` creates a TCP server.

The server can listen on a specific port using:

```js
server.listen(3500);
```

### Server events

#### `connection`

Fires when a client connects to the server.

```js
server.on("connection", (socket) => {
    console.log("Client connected");
});
```

The callback receives a `socket` representing that client's TCP connection.

#### `listening`

Fires when the server has successfully started listening for connections.

```js
server.on("listening", () => {
    console.log("Server is listening");
});
```

**Important:**

```text
listening  → server is ready
connection → client connected
```

### Socket

A `net.Socket` represents an established TCP connection.

It can be used to:

* Receive data
* Send data
* Get information about the remote connection
* Detect when the connection closes

For example:

```js
socket.remoteAddress
socket.remotePort
```

### Sending data

Use `socket.write()`:

```js
socket.write("Hello client!");
```

The data is sent through the TCP connection.

### Receiving data

Use the `data` event:

```js
socket.on("data", (data) => {
    console.log(data.toString());
});
```

Received data is commonly provided as a **Buffer**.

```text
Received data
      ↓
   Buffer
      ↓
.toString()
      ↓
"Hello server!"
```

### Closing a connection

The `close` event fires when the socket connection is fully closed.

```js
socket.on("close", () => {
    console.log("Connection closed");
});
```

### Creating a TCP client

A client can connect to a TCP server using:

```js
const socket = net.connect(3500);
```

The returned object is also a `net.Socket`.

The client can then send and receive data through that socket.

## Example

### Server

```js
const net = require("net");

const server = net.createServer((socket) => {
    console.log("Client connected");

    socket.on("data", (data) => {
        console.log("Client:", data.toString());

        socket.write("Hello from server!");
    });

    socket.on("close", () => {
        console.log("Client disconnected");
    });
});

server.on("listening", () => {
    console.log("Server is listening");
});

server.listen(3500);
```

### Client

```js
const net = require("net");

const socket = net.connect(3500);

socket.write("Hello server!");

socket.on("data", (data) => {
    console.log("Server:", data.toString());
});
```

## Important Points

* `net` is a built-in Node.js networking module.
* It provides APIs for **TCP and IPC** communication.
* TCP is connection-oriented.
* `net.createServer()` creates a TCP server.
* `server.listen(port)` starts listening for connections.
* `connection` fires when a client connects.
* `listening` fires when the server is ready to accept connections.
* A `net.Socket` represents an established connection.
* `socket.write()` sends data.
* `data` fires when data is received.
* Received data is commonly a `Buffer`.
* `.toString()` can convert the Buffer into text.
* `close` fires when the socket connection is closed.
* `net.connect()` creates a TCP client connection.
* Both the server and socket use the `EventEmitter` event system.

## Common Mistakes

* **Confusing `listening` and `connection`**

  * `listening` → server started successfully.
  * `connection` → a client connected.

* **Thinking the socket is the data**

  * The socket represents the **connection**.
  * Data travels through the socket.

* **Thinking received data is automatically a string**

  * It is commonly received as a Buffer.
  * Use `.toString()` when you need text.

* **Confusing `net.Socket` with Socket.IO**

  * `net.Socket` is Node's low-level TCP socket.
  * Socket.IO is a separate, higher-level library.

* **Thinking one `write()` always equals one `data` event**

  * TCP is a stream, so data can be split or combined between `data` events.

## Key Takeaways

```text
net
 │
 ├── TCP Server
 │     ├── createServer()
 │     ├── listen()
 │     ├── listening
 │     └── connection
 │             ↓
 │          Socket
 │          ├── write()
 │          ├── data
 │          └── close
 │
 └── TCP Client
       └── connect()
```

> **The `net` module provides low-level APIs for creating TCP clients and servers that communicate through sockets.**