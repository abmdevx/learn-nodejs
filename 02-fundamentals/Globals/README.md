# Globals

## What is it?

**Globals** are values provided by Node.js that can be used without explicitly importing them into every module.

Common Node.js globals include:

* `console`
* `process`
* `Buffer`
* `setTimeout()`
* `setInterval()`
* `setImmediate()`

In contrast, built-in modules such as `fs` and `events` are **not global**, so they need to be imported.

```js
const fs = require("fs");
const EventEmitter = require("events");
```

## How it works

### Common globals

#### `console`

Used to write output to `stdout` and `stderr`.

```js
console.log("Hello");
console.error("Something went wrong");
```

#### Timers

Node.js provides timer functions globally:

```js
setTimeout(() => {
  console.log("Hello");
}, 1000);

setInterval(() => {
  console.log("Running...");
}, 1000);

setImmediate(() => {
  console.log("Immediate");
});
```

They can be used without importing a timer module.

#### `process`

The `process` object provides information and control related to the current Node.js process.

One useful property is:

```js
process.argv
```

It contains command-line arguments.

Conceptually:

```text
process.argv[0] → Node.js executable path
process.argv[1] → script path
process.argv[2+] → command-line arguments
```

For example:

```bash
node app.js pizza 42
```

Conceptually produces:

```js
[
  "/path/to/node",
  "/path/to/app.js",
  "pizza",
  "42"
]
```

### The global object

Node.js provides a `global` object that represents the global environment.

However, the **top-level scope of a Node.js module is not the global scope**.

Each module has its own local top-level scope.

For example:

```js
// file1.js
var message = "Hello";
```

```js
// file2.js
console.log(message); // ❌ Not automatically available
```

`message` belongs to `file1.js`'s module scope and does not automatically become available in `file2.js`.

### Node.js vs browser scope

A simplified way to remember the difference:

```text
Browser
  ↓
Top-level scope → Global scope


Node.js
  ↓
Top-level scope → Local to the current module
```

This module isolation prevents variables from one module from accidentally becoming available in every other module.

## Example

```js
console.log("Hello");

console.log(process.argv);

setTimeout(() => {
  console.log("Done");
}, 1000);

console.log(Buffer.from("Hello"));
```

No imports are needed for these globals.

But for file-system operations:

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

`fs` must be imported because it is a built-in module, not a global.

## Important Points

* Globals can be used without explicitly importing them.
* `console`, `process`, `Buffer`, and timer functions are common Node.js globals.
* `fs` and `events` are built-in modules but are **not globals**.
* `process.argv` provides command-line arguments.
* `process.argv[0]` is the Node.js executable path.
* `process.argv[1]` is the script path.
* `process.argv[2+]` contains user-provided command-line arguments.
* Each Node.js module has its own local top-level scope.
* A top-level variable in one Node.js module isn't automatically available in another.
* Avoid unnecessary global variables because they can make programs harder to understand and maintain.

## Common Mistakes

* ❌ Thinking every built-in Node.js module is global.

  * ✅ Built-in modules such as `fs` still need to be imported.

* ❌ Thinking `var` is always global.

  * ✅ Its scope depends on where it is declared.

* ❌ Thinking a variable declared in `file1.js` automatically exists in `file2.js`.

  * ✅ Node.js modules have separate local scopes.

* ❌ Confusing `process.argv[1]` with the first user argument.

  * ✅ `[1]` is the script path; user arguments begin at `[2]`.

* ❌ Thinking `global` and a module's top-level scope are the same thing.

  * ✅ Node.js module scope is local to that module.

## Key Takeaways

* **Global** → available without explicitly importing it.
* **`console`** → output.
* **Timers** → `setTimeout`, `setInterval`, `setImmediate`.
* **`process`** → information and control for the current Node.js process.
* **`process.argv`** → command-line arguments.
* **`Buffer`** → globally available class for working with binary data.
* **Built-in module ≠ global** → `fs` and `events` still need importing.
* **Node.js module scope** → each module has its own local top-level scope.