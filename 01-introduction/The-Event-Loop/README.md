# The Event Loop

## What is it?

The **event loop** is a mechanism in Node.js that helps coordinate asynchronous operations so the main JavaScript thread doesn't have to wait for them to finish.

## How it works

Node.js runs JavaScript on a **main thread**.

When an asynchronous operation starts:

1. The operation begins.
2. The main JavaScript thread is not blocked waiting for it.
3. Other JavaScript code can continue running.
4. When the operation finishes, its result/callback can be handled.
5. The event loop helps coordinate when that callback is executed.

### Example

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
````

Output:

```text
A
C
B
```

`setTimeout()` schedules the callback instead of running it immediately, so `C` runs before `B`.

## Important Points

* Node.js executes JavaScript on a **main thread**.
* The event loop enables Node.js to work with asynchronous operations without blocking the main JavaScript thread.
* Asynchronous operations allow other JavaScript work to continue while waiting.
* `setTimeout()` is an example of asynchronous behavior.
* The event loop does **not** mean that all JavaScript executes in parallel.
* `setTimeout(..., 0)` does not mean "execute immediately."

## Common Mistakes

* ❌ Thinking the event loop creates a new JavaScript thread for every request.
* ❌ Thinking asynchronous code means everything runs simultaneously.
* ❌ Thinking `setTimeout(..., 0)` runs immediately.
* ❌ Thinking the event loop itself is an asynchronous operation.
* ❌ Assuming Node.js can never be blocked. Long-running synchronous JavaScript can still block the main thread.

## Key Takeaways

* **Single JavaScript thread + asynchronous operations + event loop** is the basic mental model.
* The event loop helps Node.js continue doing other work instead of waiting for asynchronous operations.
* When an asynchronous operation finishes, Node.js can handle its result later.

