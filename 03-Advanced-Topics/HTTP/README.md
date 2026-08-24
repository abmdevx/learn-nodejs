# HTTP

## What is it?

The Node.js `http` module provides APIs for creating HTTP servers and handling client requests and server responses.

HTTP stands for **HyperText Transfer Protocol**.

## How it works

Basic HTTP server flow:

```text
http.createServer()
        ↓
Create HTTP server
        ↓
server.listen(PORT)
        ↓
Wait for client request
        ↓
Request listener runs
        ↓
(req, res)
   ↓       ↓
request  response
   ↓       ↓
client    server
asks      sends
        ↓
Set status / headers
        ↓
res.end(data)
        ↓
Response completed
```

### `http.createServer()`

Creates an HTTP server.

```js
const server = http.createServer((req, res) => {
    // Handle request
});
```

The callback receives:

* `req` → incoming request from the client
* `res` → response that the server sends to the client

### `server.listen()`

Starts the server and makes it listen for incoming requests on a port.

```js
server.listen(3000);
```

### `res.statusCode`

Sets the HTTP status code.

```js
res.statusCode = 200;
```

Common codes:

* `200` → OK
* `401` → Unauthorized
* `403` → Forbidden
* `404` → Not Found

### `res.setHeader()`

Adds information to the HTTP response.

```js
res.setHeader("Content-Type", "text/html");
```

`Content-Type` tells the client what kind of content is being returned.

### `res.end()`

Completes the HTTP response.

```js
res.end("Hello World");
```

It can also send the final response body.

## Example

```js
import http from "http";

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Hello World</h1>");
});

server.listen(3000);
```

## Important Points

* `http` → Node.js module for HTTP communication.
* `createServer()` → creates an HTTP server.
* `req` → client's incoming request.
* `res` → server's outgoing response.
* `statusCode` → tells the client the result/status.
* `setHeader()` → provides additional response information.
* `res.end()` → tells Node.js the response is finished.
* `listen()` → starts the server and waits for incoming requests.

## Common Mistakes

* ❌ Thinking `req` is the server's response.
* ❌ Thinking `listen()` handles the request itself. It only starts listening; the request listener handles incoming requests.
* ❌ Forgetting `res.end()` when completing a response.
* ❌ Confusing HTTP status codes with headers.

## Key Takeaways

```text
req = What the client asks for
res = What the server sends back

createServer() = Create server
listen()       = Start listening
statusCode     = Response status
setHeader()    = Response metadata
end()          = Finish response
```