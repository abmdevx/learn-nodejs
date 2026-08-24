# Node.js Packages

## What is it?

A **package** is reusable code that has already been written and can be added to a Node.js project.

Examples:

* **Express** → web application framework
* **Axios** → HTTP client
* **React** → UI library

Packages save development time because you don't need to build common functionality from scratch.

## How it works

### npm

**npm (Node Package Manager)** is used to:

* Find packages
* Install packages
* Manage packages
* Share packages through the npm ecosystem

npm is installed when Node.js is installed.

Example:

```bash
npm install react
```

### `package.json`

`package.json` describes a Node.js project and can specify the packages/dependencies that the project uses.

A package must contain a `package.json` file to be **published to the npm registry**.

Important distinction:

> **Not every module is a package.**
> A module doesn't necessarily need `package.json`, but a package does.

## Example

Imagine your project needs Express:

```text
my-app/
├── package.json
└── app.js
```

`package.json` records the project's package information and dependencies.

Then npm can install the required packages for the project.

## Important Points

* Packages provide **reusable functionality**.
* npm makes it easy to **install and manage packages**.
* `package.json` describes project/package information and dependencies.
* A package needs `package.json` to be published to npm.
* Established packages can save significant development time.
* Packages are often **tried and tested** and may receive community improvements over time.

## Common Mistakes

* ❌ Thinking every module is automatically a package.
* ❌ Thinking npm itself is a package.
* ❌ Thinking packages eliminate the need to understand your application.
* ❌ Assuming every npm package is automatically bug-free or reliable.

## Key Takeaways

**npm → manages packages**

**package.json → describes the project and its dependencies**

**package → reusable code**

**Why use packages? → Don't reinvent the wheel.**