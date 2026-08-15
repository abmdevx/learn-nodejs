# Buffer

## What is a Buffer?

A Buffer is a fixed-size block of memory used to store bytes (binary data).

Each byte has a value from 0 to 255.

Buffers are useful when working with:
- Files
- Streams
- Network data
- Video/audio
- Other binary data

Buffer is a global Node.js class, so it does not need to be imported.

## Creating Buffers

### Buffer.alloc()

Creates an initialized Buffer of a specific size.

```js
const buffer = Buffer.alloc(10);
````

By default, it is filled with `0`.

### Buffer.allocUnsafe()

Creates a Buffer faster without initializing its memory.

It may contain old/uninitialized memory contents, so it should be overwritten before use.

## Other methods

### Buffer.from()

Creates a Buffer from existing data.

```js
const buffer = Buffer.from("Hello");
```

### fill()

Fills the Buffer with a value.

### write()

Writes a string into the Buffer.

If the string is larger than the available space, only the part that fits is written.

### toString()

Converts the bytes in a Buffer into a readable string.

```js
const buffer = Buffer.from("Hello");

console.log(buffer);
console.log(buffer.toString());
```

A Buffer may be displayed in hexadecimal notation, but the underlying data is bytes.

## Key idea

Buffer = fixed-size memory + bytes + binary data.