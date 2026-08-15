# Events

## What is it?

Node.js uses an **event-driven architecture** where objects can emit events when something happens, and other parts of the program can listen and react to those events.

The `events` module provides the `EventEmitter` class for creating objects that can emit and handle events.

## How it works

1. Create an `EventEmitter` instance.
2. Register a listener with `on()` or `once()`.
3. Trigger an event with `emit()`.
4. Any arguments passed to `emit()` are received by the listener function.

### Main methods

* `on(event, listener)` → runs the listener every time the event is emitted.
* `once(event, listener)` → runs the listener only once.
* `emit(event, ...args)` → triggers an event and optionally passes arguments to its listeners.

Events and their listeners execute **synchronously** when the event is emitted.

## Example

```js
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("order", (food) => {
  console.log(`Order placed for ${food}`);
});

emitter.once("doorbell", () => {
  console.log("RING RING!");
});

emitter.on("payment", (food) => {
  console.log(`Enjoy your ${food}`);
});

emitter.emit("order", "pizza");
emitter.emit("doorbell");
emitter.emit("doorbell");
emitter.emit("payment", "pizza");
```

Output:

```text
Order placed for pizza
RING RING!
Enjoy your pizza
```

The second `doorbell` event produces no output because its listener was registered with `once()`.

## Important Points

* `EventEmitter` comes from Node.js's built-in `events` module.
* `emit()` **triggers** an event; it does not define the listener.
* `on()` registers a listener that can run multiple times.
* `once()` registers a listener that runs only once.
* Arguments can be passed through `emit()` and received by the listener.
* `"error"` events are special. If an `error` event is emitted without an error listener, the Node.js process can terminate.
* Event listeners are called synchronously when the event is emitted.

## Common Mistakes

* ❌ Saying `emit.on()` or `emit.once()`.

  * ✅ Use `emitter.on()`, `emitter.once()`, and `emitter.emit()`.

* ❌ Thinking `emit()` creates or defines the event.

  * ✅ `emit()` triggers an event.

* ❌ Thinking `on()` controls how many times an event happens.

  * ✅ `on()` registers a listener; the listener runs each time the event is emitted.

* ❌ Forgetting that `"error"` events need special handling.

  * ✅ Register an `"error"` listener when using an `EventEmitter` that may emit errors.

## Key Takeaways

* **Event** → something that happens.
* **EventEmitter** → object capable of emitting events.
* **Listener** → function that reacts to an event.
* **`on()`** → listen every time.
* **`once()`** → listen once.
* **`emit()`** → trigger an event.
* **`emit()` arguments** → pass data to the listener.
* **`error` event** → should have a listener to prevent an unhandled error from terminating the process.