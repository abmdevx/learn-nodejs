# Input

## What is it?

Node.js provides different ways to receive input. Two basic approaches are:

- `process.argv` — command-line input
- `readline` — interactive console input

## How it works

### Command-line input

`process.argv` is an array containing information about how the Node.js program was started.

For:

node app.js Abdullah

The important indexes are:

- `process.argv[0]` → path to Node.js executable
- `process.argv[1]` → path to the JavaScript file
- `process.argv[2]` → `"Abdullah"`

Additional arguments appear at `[3]`, `[4]`, and so on.

### Interactive console input

The `readline` module allows a running Node.js program to ask the user for input.

```js
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("What is your name? ", (answer) => {
  console.log(`Hello ${answer}!`);
  rl.close();
});
````

`process.stdin` receives input from the terminal, while `process.stdout` sends output to the terminal.

`rl.question()` asks the user a question and receives their answer through a callback.

`rl.close()` closes the `readline` interface when we are finished with console input.

## Important Points

* `process.argv` is used for command-line arguments.
* `readline` is used for interactive console input.
* `process.argv[2]` is the first custom argument.
* `readline` receives input after the program has started.
* `rl.close()` closes the `readline` interface.

## Common Mistakes

* `process.argv[0]` is not your custom argument.
* `process.argv[1]` is not your first custom argument.
* `process.argv[2]` is the first custom argument.
* `rl.close()` closes the readline interface, not necessarily the entire Node.js program.

## Key Takeaways

**process.argv → input when starting the program**

**readline → input while the program is running**