# Console

Node.js provides a global `console` object that can be used for logging, debugging, displaying warnings/errors, measuring execution time, and inspecting data.

## Global Console

The `console` object is available globally in Node.js, so we don't need to import it.

```js
console.log("Hello");
````

## Common Console Methods

### console.log()

Used for normal output.

```js
console.log("Hello World");
```

### console.error()

Used to report errors.

```js
console.error("Something went wrong");
```

### console.warn()

Used to display warnings.

```js
console.warn("This is a warning");
```

### console.trace()

Prints a stack trace showing how the code reached that point.

Useful for debugging larger applications.

```js
console.trace("Where did I come from?");
```

### console.time() and console.timeEnd()

Used to measure how long a piece of code takes to execute.

```js
console.time("operation");

// code to measure

console.timeEnd("operation");
```

`console.time()` starts the timer.

`console.timeEnd()` stops the timer and displays the elapsed time.

### console.table()

Displays structured data in a table format.

```js
console.table([
  { name: "Abdullah", age: 25 },
  { name: "Ahmed", age: 30 }
]);
```

## Console Class

The global `console` is ready to use, but Node.js also provides a `Console` class.

The `Console` class can be used to create a custom logger and send output to different streams, such as files.

## Key Takeaways

* `console` is globally available in Node.js.
* `console.log()` → normal output
* `console.error()` → errors
* `console.warn()` → warnings
* `console.trace()` → stack trace for debugging
* `console.time()` → starts a timer
* `console.timeEnd()` → shows elapsed time
* `console.table()` → displays structured data as a table
* `Console` class → useful for creating custom loggers