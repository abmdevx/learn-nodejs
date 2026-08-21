# 📝 Node.js UDP

## 1. UDP

**UDP (User Datagram Protocol)** is a **connectionless** communication protocol.

Unlike TCP, UDP does not establish a connection before sending data.

```text
TCP → Connect → Communicate
UDP → Send directly
```

UDP is lightweight and often faster, but it does **not guarantee**:

* Delivery
* Ordering
* Retransmission of lost packets

Common use cases:

* Online gaming
* Video/voice calls
* Real-time applications

---

## 2. `dgram` Module

Node.js provides UDP functionality through the **`dgram`** module.

```js
import dgram from "dgram";
```

Create a UDP IPv4 socket:

```js
const socket = dgram.createSocket("udp4");
```

---

## 3. Important UDP Methods

### `createSocket()`

Creates a UDP socket.

```js
dgram.createSocket("udp4");
```

### `bind()`

Makes the socket listen on a specific port.

```js
socket.bind(3500);
```

### `send()`

Sends a UDP datagram.

```js
socket.send("Hello", 3500, "127.0.0.1");
```

Unlike TCP, you don't need to establish a connection first.

---

## 4. `message` Event

Triggered when a UDP datagram is received.

```js
socket.on("message", (data, rinfo) => {
    console.log(data.toString());
});
```

`data` is received as a **Buffer**, so:

```js
data.toString()
```

converts it into readable text.

---

## 5. `rinfo`

`rinfo` contains information about the sender.

Common properties:

```js
rinfo.address
rinfo.port
```

This is useful when the server wants to send a response back:

```js
socket.send(
    "Hello Client",
    rinfo.port,
    rinfo.address
);
```

---

## 6. TCP vs UDP

| TCP                 | UDP                    |
| ------------------- | ---------------------- |
| Connection-oriented | Connectionless         |
| `net` module        | `dgram` module         |
| `connect()`         | No connection required |
| `write()`           | `send()`               |
| `data` event        | `message` event        |
| Reliable            | No delivery guarantee  |
| Ordered             | No ordering guarantee  |
| More overhead       | Lightweight            |
| Stream-based        | Datagram-based         |

### 🧠 Remember

> **TCP:** "We're connected, now let's communicate reliably."

> **UDP:** "Here's the destination—send this datagram."

### Node.js UDP flow

```text
createSocket()
      ↓
   bind()
      ↓
 wait for message
      ↓
 message event
      ↓
 data + rinfo
      ↓
 send()
```