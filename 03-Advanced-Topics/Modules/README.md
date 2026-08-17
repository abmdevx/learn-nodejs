# Modules

## What is it?

A **module** in Node.js is a separate file treated as an independent unit of code.

Modules help organize applications by separating code based on responsibility.

```text
Application
├── routes/
├── controllers/
├── models/
└── utils/
```

Each file can contain functionality that can be shared with other modules through **exports/imports**.

## How it works

### Importing with `require`

`require()` is the **CommonJS** way of loading modules, local files, and JSON files.

```js
const fs = require("fs");
const square = require("./square");
```

### ES Modules

Modern Node.js code can use ES module syntax:

```js
export const square = (x) => x * x;
```

and:

```js
import { square } from "./square.js";
```

For a default export:

```js
export default function square(x) {
  return x * x;
}
```

Import it without braces:

```js
import square from "./square.js";
```

### Module wrapper

Node.js wraps CommonJS module code in a function conceptually like:

```js
(function(exports, require, module, __filename, __dirname) {
  // module code
});
```

You don't write this yourself.

The wrapper helps:

* Keep module variables scoped to that module.
* Provide CommonJS variables such as `require`, `exports`, and `module`.
* Provide `__filename` and `__dirname`.

### `exports` vs `module.exports`

Initially:

```text
exports ───────→ module.exports
```

They reference the same object.

This works:

```js
exports.square = square;
```

because you're adding a property to the object that `module.exports` points to.

This also works:

```js
module.exports = square;
```

because you're directly replacing the value that the module exports.

But this is problematic:

```js
exports = square;
```

because it reassigns the local `exports` variable and breaks its reference to `module.exports`.

Remember:

```js
exports.square = square;   // ✅
module.exports = square;   // ✅
exports = square;          // ❌
```

## Example

### `square.js`

Using ES modules:

```js
export default function square(x) {
  return x * x;
}
```

### `index.js`

```js
import square from "./square.js";

console.log(square(5));
```

Output:

```text
25
```

Flow:

```text
square.js
   ↓
export square()
   ↓
index.js imports it
   ↓
square(5)
   ↓
25
```

## Important Points

* Each Node.js file is treated as a **module**.
* Modules help keep code organized and separated by responsibility.
* `require()` is used with **CommonJS**.
* `import` / `export` are used with **ES modules**.
* The module wrapper is handled by Node.js; you don't manually write it.
* The wrapper gives CommonJS modules their own scope.
* `module.exports` is the value that CommonJS ultimately exports.
* `exports` initially references `module.exports`.
* `exports.name = value` modifies the exported object.
* `module.exports = value` directly changes what is exported.
* Reassigning `exports` breaks its connection to `module.exports`.
* ES modules have **named exports** and **default exports**.

## Common Mistakes

* ❌ Thinking a module is just a random piece of code.

  * ✅ In this context, each separate file is a Node.js module.

* ❌ Thinking built-in modules and globals are the same.

  * ✅ `fs` is a built-in module; it isn't a global.

* ❌ Mixing CommonJS and ES module syntax without understanding the difference.

  * CommonJS → `require()` / `module.exports`
  * ES modules → `import` / `export`

* ❌ Assuming these are equivalent:

  ```js
  exports = square;
  ```

  and:

  ```js
  module.exports = square;
  ```

  * ✅ `module.exports = square` actually changes what CommonJS exports.

* ❌ Using braces with a default import:

  ```js
  import { square } from "./square.js";
  ```

  when the module has:

  ```js
  export default square;
  ```

  * ✅ Default imports don't use braces.

* ❌ Thinking the module wrapper is something you need to write.

  * ✅ Node.js handles it behind the scenes.

## Key Takeaways

* **Module = separate Node.js file.**
* Modules keep large applications organized.
* **CommonJS:** `require()` + `module.exports`
* **ES Modules:** `import` + `export`
* Node.js uses a **module wrapper** to isolate CommonJS module scope.
* `module.exports` is what CommonJS actually exports.
* `exports` is initially a reference to `module.exports`.
* `exports.foo = ...` is safe; `exports = ...` breaks the reference.
* `export default` and `export const` are both ES module exports, but they are imported differently.