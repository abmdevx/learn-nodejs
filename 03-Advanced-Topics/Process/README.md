# Process

## What is it?

The Node.js **`process` object** is a global object that represents the currently running Node.js process.

It provides information about the process and methods/events for controlling its runtime.

`process` is also an instance of **`EventEmitter`**, so it can emit events such as `beforeExit`, `exit`, and `uncaughtException`.

## How it works

### `beforeExit`

Fires when the Node.js **event loop becomes empty** and there is no more work to perform.

It can be useful when you need to schedule asynchronous work before the process naturally exits.

```js
process.on("beforeExit", () => {
  console.log("Process is about to exit");
});
```

Important:

```js
process.exit();
```

does **not** trigger `beforeExit`.

### `exit`

Fires when the process is actually exiting.

```js
process.on("exit", (code) => {
  console.log(`Process exited with code: ${code}`);
});
```

`exit` listeners execute **synchronously**, so asynchronous operations should not be relied upon inside them.

Conceptually:

```text
Event loop becomes empty
        ↓
   beforeExit
        ↓
    process exits
        ↓
      exit
```

### `uncaughtException`

Fires when an exception occurs that wasn't handled by the program.

```js
process.on("uncaughtException", (err) => {
  console.error(err);
});
```

Normally, Node.js prints the error/stack trace and exits.

**Important:** `uncaughtException` should not be treated as a normal error-recovery mechanism. Continuing the process after an uncaught exception can be unsafe because the application may be left in an inconsistent state.

### `process.argv`

Returns an array containing command-line arguments.

```js
console.log(process.argv);
```

Typically:

```text
argv[0] → Node.js executable path
argv[1] → script/file path
argv[2+] → user-provided arguments
```

Example:

```bash
node app.js pizza 5
```

Conceptually:

```text
argv[0] → Node executable
argv[1] → app.js
argv[2] → pizza
argv[3] → 5
```

### `process.cwd()`

Returns the **current working directory** of the Node.js process.

```js
console.log(process.cwd());
```

Think:

> "Where is this process currently working?"

### `process.chdir(directory)`

Changes the current working directory.

```js
process.chdir("/tmp");

console.log(process.cwd());
```

Think:

> "Change my current working directory to this location."

### `process.exit(code)`

Terminates the Node.js process synchronously.

```js
process.exit(0);
```

The exit code communicates the process status.

Generally:

```text
0 → successful termination
non-zero → some kind of failure
```

## Streams

A **stream** is an interface for working with data as it is read or written.

Streams can be readable, writable, or both. Streams are also `EventEmitter`s.

### `process.stdin`

A **readable stream** used to read data from standard input, such as user input.

```js
process.stdin
```

### `process.stdout`

A **writable stream** used for normal program output.

```js
process.stdout
```

`console.log()` and `console.info()` use `stdout`.

### `process.stderr`

A **writable stream** used for error/warning output.

```js
process.stderr
```

`console.error()` and `console.warn()` use `stderr`.

For this lesson:

```text
stdout → asynchronous writing
stderr → synchronous writing
```

## Example

```js
console.log("Starting...");

console.log(process.cwd());
console.log(process.argv);

process.on("beforeExit", (code) => {
  console.log(`Before exit: ${code}`);
});

process.on("exit", (code) => {
  console.log(`Exit: ${code}`);
});
```

## Important Points

* `process` is a **global object**.
* It represents the currently running Node.js process.
* `process` is an instance of `EventEmitter`.
* `beforeExit` occurs when the event loop becomes empty.
* `exit` occurs when the process is exiting.
* `beforeExit` can allow asynchronous work to be scheduled.
* `exit` listeners execute synchronously.
* Explicit `process.exit()` does not trigger `beforeExit`.
* `uncaughtException` handles otherwise unhandled exceptions.
* Continuing after an `uncaughtException` is generally unsafe.
* `process.argv` provides command-line arguments.
* `process.cwd()` gets the current working directory.
* `process.chdir()` changes the current working directory.
* `process.exit()` terminates the process.
* `stdin` is readable.
* `stdout` and `stderr` are writable.

## Common Mistakes

* **Thinking `beforeExit` and `exit` are the same**

  * `beforeExit` → event loop is empty.
  * `exit` → process is actually exiting.

* **Thinking `beforeExit` happens after `process.exit()`**

  * ❌ It doesn't.
  * Explicit `process.exit()` skips `beforeExit`.

* **Using `uncaughtException` as normal error handling**

  * ❌ Don't use it as a replacement for proper error handling.
  * It is an emergency-level handler.

* **Confusing `cwd()` and `chdir()`**

  * `cwd()` → get current directory.
  * `chdir()` → change current directory.

* **Confusing `stdin` with `stdout`**

  * `stdin` → input/readable.
  * `stdout` → normal output/writable.
  * `stderr` → error output/writable.

## Key Takeaways

```text
process
│
├── Events
│   ├── beforeExit
│   ├── exit
│   └── uncaughtException
│
├── Arguments
│   └── process.argv
│
├── Directory
│   ├── process.cwd()
│   └── process.chdir()
│
├── Control
│   └── process.exit()
│
└── Streams
    ├── stdin  → readable
    ├── stdout → writable
    └── stderr → writable
```

> **The `process` object gives Node.js programs access to and control over the currently running process.**