# OS

## What is it?

The Node.js **`os` module** is a built-in module that provides information about the operating system and the environment Node.js is running in.

```js
import os from "os";
```

## How it works

The `os` module provides methods for retrieving information about:

```text
CPU
OS platform
OS release
Network interfaces
Current user
```

### `os.arch()`

Returns the **CPU architecture**.

```js
os.arch();
```

Example:

```text
x64
arm64
```

### `os.platform()`

Returns the **operating system platform**.

```js
os.platform();
```

Examples:

```text
linux
win32
darwin
```

### `os.release()`

Returns the **OS release/version string**.

```js
os.release();
```

### `os.cpus()`

Returns an **array of objects containing information about each logical CPU core**.

```js
os.cpus();
```

Conceptually:

```text
8 logical CPU cores
        ↓
    os.cpus()
        ↓
Array of 8 CPU objects
```

### `os.networkInterfaces()`

Returns information about the **network interfaces** and their assigned network addresses.

```js
os.networkInterfaces();
```

It can provide information such as network interface names and IP address details.

### `os.userInfo()`

Returns information about the **current user** running the Node.js process.

```js
os.userInfo();
```

It can include information such as:

* Username
* Home directory
* Shell

## Example

```js
import os from "os";

console.log(os.arch());
console.log(os.platform());
console.log(os.release());
console.log(os.cpus());
console.log(os.networkInterfaces());
console.log(os.userInfo());
```

A practical use could be detecting the environment your application is running in:

```js
if (os.platform() === "win32") {
  console.log("Running on Windows");
}
```

## Important Points

* `os` is a **built-in Node.js module**, so it must be imported before using it.
* It provides information about the operating system and machine environment.
* `os.arch()` → CPU architecture.
* `os.platform()` → OS platform.
* `os.release()` → OS release/version.
* `os.cpus()` → information about logical CPU cores.
* `os.networkInterfaces()` → network interfaces and assigned addresses.
* `os.userInfo()` → current user information.
* The `os` module is useful when an application needs environment/OS-specific information.

## Common Mistakes

* **`os.arch()` ≠ OS platform**

  * `arch()` → CPU architecture (`x64`, `arm64`)
  * `platform()` → OS platform (`linux`, `win32`, `darwin`)

* **`os.cpus()` doesn't simply return a CPU count.**

  * It returns an array of objects containing information about logical CPU cores.
  * You can use `.length` if you specifically want the number of entries.

* **`os.networkInterfaces()` isn't simply a Wi-Fi/MAC-address method.**

  * It provides information about network interfaces and their assigned addresses.

* **`os.userInfo()` isn't just a username method.**

  * It returns an object containing several pieces of current-user information.

## Key Takeaways

```text
os.arch()              → CPU architecture
os.platform()          → OS platform
os.release()           → OS release
os.cpus()              → CPU information
os.networkInterfaces() → Network information
os.userInfo()          → Current user information
```

The main idea:

> **The `os` module lets Node.js inspect the operating system and environment it is running on.**