# Publishing a Node.js Package

## What is it?

Publishing a package means making your Node.js package available through the **npm registry** so other developers can install and use it.

## How it works

### 1. Create a package folder

Create or navigate to the folder containing your package.

```bash
mkdir my-package
cd my-package
```

### 2. Initialize the package

```bash
npm init
```

This interactively creates `package.json` and asks for information such as:

* Package name
* Version
* Description
* Entry point
* Keywords
* Author
* License

You can accept the default values by pressing **Enter**.

### 3. Log in to npm

```bash
npm login
```

This authenticates your npm account through the CLI.

### 4. Publish

```bash
npm publish
```

This publishes the package to the **npm registry**.

## Package naming

Package names must be available on npm.

If a name is already taken, you can:

* Choose a different name.
* Use a **scoped package**.

Example:

```text
@username/my-package
```

A scoped package can be published publicly with:

```bash
npm publish --access public
```

## Important Points

* You need an npm account to publish packages.
* `npm init` creates/configures `package.json`.
* `npm login` authenticates your npm account.
* `npm publish` publishes the package.
* Package names cannot conflict with existing packages.
* Scopes can help distinguish your package from others.

## Common Mistakes

* ❌ Thinking `npm init` publishes the package.
* ❌ Thinking `npm login` creates the package.
* ❌ Forgetting that package names must be available.
* ❌ Confusing the npm website with the **npm registry** where packages are published.

## Key Takeaways

```text
Package folder
     ↓
npm init
     ↓
package.json
     ↓
npm login
     ↓
npm publish
     ↓
Package available on npm
```

**`npm init` → prepare**

**`npm login` → authenticate**

**`npm publish` → publish**