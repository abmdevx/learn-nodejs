# `package.json`

## What is it?

`package.json` is the **project/package configuration file** that describes a Node.js project and its dependencies.

It provides npm with information about the package and helps manage its dependencies.

## How it works

### Common fields

| Field             | Purpose                               |
| ----------------- | ------------------------------------- |
| `name`            | Package name                          |
| `version`         | Package version (`major.minor.patch`) |
| `description`     | Short description                     |
| `main`            | Package entry point                   |
| `repository`      | Repository URL                        |
| `keywords`        | Helps describe/search for the package |
| `dependencies`    | Packages required by the application  |
| `devDependencies` | Packages needed during development    |

### Dependencies vs devDependencies

**Dependencies**

Packages needed when the application runs.

```bash
npm install <package-name>
```

**devDependencies**

Packages needed for development/testing/building.

```bash
npm install <package-name> --save-dev
```

## Example

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "express": "^5.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

Here:

* `index.js` is the package's entry point.
* `express` is a runtime dependency.
* `nodemon` is a development dependency.

## Installing dependencies

If you clone/download an existing Node.js project containing `package.json`:

```bash
cd my-project
npm install
```

npm reads `package.json` and installs the project's dependencies.

**Important:** `npm install` in a project directory installs dependencies **locally for that project**. It does not mean global installation.

## Version notation

A caret such as:

```json
"jws": "^3.2.2"
```

allows npm to install compatible newer versions within the same major version.

For example:

```text
^3.2.2
   ↓
3.2.3 ✅
3.3.x  ✅
4.x    ❌
```

The exact version that gets installed is recorded in `package-lock.json`.

## `package-lock.json`

`package-lock.json` is automatically generated/updated by npm.

It records the **exact dependency tree and versions** that were installed.

This helps different machines/environments install consistent dependency versions.

```text
package.json
    ↓
declares dependencies
    ↓
npm install
    ↓
npm resolves versions
    ↓
package-lock.json
    ↓
records exact dependency tree
```

## Important Points

* `package.json` describes the project/package.
* `dependencies` are runtime dependencies.
* `devDependencies` are for development-related needs.
* `main` specifies the package entry point.
* `npm install` installs dependencies from `package.json`.
* `package-lock.json` records the exact resolved dependency tree.
* `^` allows compatible updates within the same major version.

## Common Mistakes

* ❌ Thinking `npm install` installs packages globally.
* ❌ Thinking `package.json` locks the exact installed version.
* ❌ Confusing `dependencies` with `devDependencies`.
* ❌ Thinking `main` is the application's starting point in every context; here it specifically describes the **package entry point**.

## Key Takeaways

```text
package.json
    ↓
Project information + dependency requirements

npm install
    ↓
Install dependencies

package-lock.json
    ↓
Exact resolved dependency versions
```

**`package.json` says what you need.**
**`package-lock.json` records exactly what was installed.**