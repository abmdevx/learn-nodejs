# File System

## What is it?

The Node.js **`fs` (File System) module** is a built-in module used to interact with the file system.

It provides APIs for:

* Reading files
* Writing files
* Getting file metadata
* Opening and closing files
* Reading files using file descriptors

Some `fs` operations have both **asynchronous** and **synchronous** versions.

## How it works

### Reading files

`fs.readFile()` reads a file **asynchronously**.

```js
const fs = require("fs");

fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});
```

The callback follows Node's **error-first callback** pattern:

```text
(err, data)
```

* `err` → error information if something went wrong
* `data` → file contents if the operation succeeds

`fs.readFileSync()` reads a file **synchronously** and blocks execution until the operation finishes.

```js
try {
  const data = fs.readFileSync("test.txt", "utf8");
  console.log(data);
} catch (err) {
  console.error(err);
}
```

### Async vs Sync

```text
readFile()       → asynchronous → does not block
readFileSync()   → synchronous  → blocks until finished
```

Because both methods read the **entire file into memory**, they can consume significant memory when dealing with very large files.

### Writing files

`writeFile()` and `writeFileSync()` are used to write data to files.

`fs` also supports **file system flags**, which control how a file is opened or written, such as whether it should be overwritten or created.

### File stats

`fs.stat()` provides **metadata about a file**, such as its size and other file information.

### File descriptors

A **file descriptor** is a number that the operating system uses to keep track of an open file.

The lower-level workflow is:

```text
fs.open()
   ↓
file descriptor
   ↓
fs.read()
   ↓
fs.close()
```

`fs.readFile()` is generally easier when you simply want to read an entire file. File descriptors provide more low-level control over how an open file is accessed.

### UTF-8

**UTF-8 is a character encoding.**

Files contain bytes. When reading text with:

```js
fs.readFile("test.txt", "utf8", callback);
```

`"utf8"` tells Node.js to interpret those bytes as UTF-8 text and return a string.

Without an encoding, file data is returned as a **Buffer**.

```text
File
 ↓
Raw bytes
 ↓ UTF-8 decoding
String
```

## Example

```js
const fs = require("fs");

fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data);
});
```

## Important Points

* `fs` is a built-in Node.js module.
* `readFile()` is **asynchronous**.
* `readFileSync()` is **synchronous and blocking**.
* Async `fs` methods use a completion callback as their last argument.
* The callback commonly follows the **`(err, data)`** pattern.
* Always handle possible errors when using file operations.
* `readFile()` and `readFileSync()` load the entire file into memory.
* `writeFile()` and `writeFileSync()` write data to files.
* `stat()` provides file metadata.
* A file descriptor is an OS number used to identify an open file.
* `fs.open()` can provide a file descriptor.
* `fs.read()` can read using a file descriptor.
* `fs.close()` closes the file descriptor.
* UTF-8 is a character encoding used to interpret bytes as text.

## Common Mistakes

* ❌ Thinking `readFile()` is synchronous.

  * ✅ `readFile()` is asynchronous.

* ❌ Thinking `readFileSync()` allows other code to continue while reading.

  * ✅ It blocks execution until the file is read.

* ❌ Assuming `data` is always available.

  * ✅ Check `err` before using `data`.

* ❌ Thinking a file descriptor contains information about the file.

  * ✅ It is an OS identifier for an open file.

* ❌ Thinking UTF-8 is a file type.

  * ✅ UTF-8 is a character encoding.

* ❌ Using `readFile()` for very large files without considering memory usage.

  * ✅ Remember that these methods load the entire file into memory.

## Key Takeaways

* **`fs`** → Node.js module for interacting with the file system.
* **`readFile()`** → asynchronous file reading.
* **`readFileSync()`** → synchronous/blocking file reading.
* **`writeFile()` / `writeFileSync()`** → writing files.
* **`stat()`** → file metadata.
* **File descriptor** → OS identifier for an open file.
* **UTF-8** → character encoding for interpreting bytes as text.
* **`(err, data)`** → common error-first callback pattern.
* For very large files, loading the entire file into memory can be problematic.