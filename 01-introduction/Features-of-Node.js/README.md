# Features of Node.js

## What is it?

Node.js is an **open-source, cross-platform JavaScript runtime environment** built around Google's V8 JavaScript engine.

## How it works

Node.js applications run in a **single process** and use an **asynchronous, non-blocking I/O model**.

This allows Node.js to continue handling other work while waiting for I/O operations such as file or network operations to complete.

## Important Points

- **Open source** → Source code is publicly available and the project accepts contributions.
- **Cross-platform** → Runs on platforms such as Windows, macOS, and Linux.
- **V8** → JavaScript engine that executes JavaScript.
- **Single process** → A Node.js application runs in a single process.
- **Asynchronous / non-blocking** → Node.js can handle other work while waiting for I/O operations.
- **npm** → Package manager and ecosystem for installing and managing Node.js packages.

## Common Mistakes

- Node.js is not a programming language.
- Node.js is not a framework.
- npm is not the same thing as a package.
- Single process does not mean every task is a separate thread.
- Asynchronous does not mean Node.js never waits; it means it doesn't block the entire application while waiting for many I/O operations.

## Key Takeaways

- Node.js is open source and cross-platform.
- It uses V8 to execute JavaScript.
- Its asynchronous, non-blocking I/O model helps it handle many operations efficiently.
- npm provides access to a large ecosystem of reusable packages.