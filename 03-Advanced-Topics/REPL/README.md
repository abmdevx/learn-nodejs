# Node.js REPL

## What is it?

**REPL = Read → Evaluate → Print → Loop**

Node.js REPL is an interactive environment for quickly testing and experimenting with JavaScript without creating a complete `.js` file first.

Start it from the terminal:

```bash
node
```

## How it works

1. **Read** — Node reads your input.
2. **Evaluate** — Node executes/evaluates it.
3. **Print** — Node displays the result.
4. **Loop** — It waits for your next input.

Example:

```js
> 10 + 5
15

> "Hello".toUpperCase()
'HELLO'
```

## Example

### Special variables

```js
> 10 + 5
15

> _
15
```

`_` normally contains the **result of the most recently evaluated expression**.

`_error` can be used to access the **last error**.

> If you explicitly assign a value to `_`, its automatic "latest result" behavior is disabled.

### Common commands

| Command   | Purpose                                      |
| --------- | -------------------------------------------- |
| `.break`  | Break out of multiline input                 |
| `.clear`  | Reset REPL context and break multiline input |
| `.editor` | Enter editor mode                            |
| `.exit`   | Exit the REPL                                |
| `.help`   | Show available commands                      |
| `.load`   | Load a file into the current REPL            |
| `.save`   | Save the current REPL session to a file      |

### Keyboard shortcuts

* `Ctrl + C` once → break multiline input
* `Ctrl + C` twice → exit REPL
* `Ctrl + D` → exit REPL
* `TAB` → autocomplete

## Custom REPL with `REPLServer`

Node.js provides the `repl` module to create a customized REPL.

```js
const repl = require("repl");

const msg = "Hello";

const server = repl.start("> ");

server.context.textMessage = msg;
```

Now inside the REPL:

```js
> textMessage
'Hello'
```

### `context`

The `context` object lets you **expose variables/values to the REPL environment**.

## Important Points

* `node` in the terminal starts the default Node.js REPL.
* REPL is mainly useful for **quick experimentation and testing**.
* `repl` module allows you to create customized REPL environments.
* `REPLServer` represents the custom REPL.
* `context` exposes values to the REPL.
* `_` → latest evaluated result.
* `_error` → last error.
* `.load` → load a file.
* `.save` → save the session.

## Common Mistakes

* ❌ Thinking REPL is mainly a replacement for writing full applications.
* ❌ Thinking `_` always contains the latest result even after manually assigning to it.
* ❌ Confusing `.load` and `.save`.
* ❌ Thinking `context` clears or exits the REPL — it is used to expose values.

## Key Takeaways

> **REPL is Node.js's interactive playground.**

**`node` → enter REPL → write JavaScript → immediately see the result → experiment.**

For customization:

**`repl` module → `REPLServer` → `context` → expose your own values.**