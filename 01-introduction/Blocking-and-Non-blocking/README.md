# Blocking and Non-blocking

## What is it?

**Blocking** code makes the current execution wait until an operation finishes.

**Non-blocking** code allows execution to continue while an asynchronous operation is in progress.

## How it works

### Blocking

```text
User A → Long operation
             ↓
       Main thread waits
             ↓
User B → Must wait
````

A blocking operation prevents the thread from moving on to other work.

### Non-blocking

```text
User A → Start async operation
             ↓
       Main thread continues
             ↓
User B → Can be handled
User C → Can be handled
             ↓
Async operation finishes
             ↓
Handle User A's result
```

Node.js uses asynchronous processing so I/O operations such as reading files or making connections don't unnecessarily block the main JavaScript thread.

## Important Points

* **Blocking → wait before continuing.**
* **Non-blocking → continue other work while waiting for an async operation.**
* Node.js processes JavaScript sequentially on its main thread.
* Asynchronous I/O allows Node.js to handle other requests while an I/O operation is in progress.
* Giving every client a dedicated thread can waste resources when threads remain idle.
* Node.js's approach is particularly useful for I/O-heavy applications.

## Common Mistakes

* Blocking and synchronous are not exact synonyms.
* Non-blocking does not mean everything runs in parallel.
* A single-threaded model does not mean Node.js has absolutely no other threads internally.
* Node.js is not automatically more efficient for every type of workload; CPU-heavy work is different from I/O-heavy work.

## Key Takeaways

* **Blocking:** "Wait until this finishes."
* **Non-blocking:** "Start this and continue with other work."
* Node.js uses asynchronous, non-blocking I/O to efficiently handle many concurrent clients.
