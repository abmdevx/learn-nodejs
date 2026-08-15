# A Console Game

## Overview

A console-based number guessing game where the player tries to guess a randomly generated number within a limited number of attempts.

## Game Flow

1. Generate a random number between 1 and 10.
2. Give the player 3 tries.
3. Receive the player's guess from the console.
4. Compare the guess with the random number.
5. If the guess is too high, print `TOO HIGH`.
6. If the guess is too low, print `TOO LOW`.
7. If the guess is correct, print `WINNER` and end the game.
8. If the player runs out of tries, print `YOU LOSE!` and reveal the number.

## Important Concepts

### `Math.random()`

Used to generate a random number.

### `tries`

Keeps track of how many attempts the player has left.

```js
let tries = 3;
````

The value decreases after an incorrect guess.

### `process.stdin.on("line", ...)`

Listens for input from the console.

The `"line"` event fires when the user enters a line of input, usually by pressing Enter.

```js
process.stdin.on("line", (input) => {
  // handle the user's guess
});
```

This is useful when the program needs to handle multiple inputs.

### `process.exit()`

Terminates the Node.js process.

Used when the game is finished, such as when the player wins or loses.

## Key Takeaways

* `Math.random()` can be used to generate random values.
* `tries` manages the number of attempts.
* `process.stdin.on("line", ...)` reacts to each line of console input.
* The game uses conditional logic to compare the guess with the random number.
* `process.exit()` can end the program when the game is finished.
