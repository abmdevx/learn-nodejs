import readline from 'readline';

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("Guess the number! (1-10): ");
rl.prompt();
rl.on("line", function (answer) {
  tries--;
  game(tries, randomNumber, answer);
  rl.prompt();
});

let randomNumber = Math.floor(Math.random() * 10) + 1;
let tries = 3;

function game(tries, randomNumber, answer) {
  if (answer === randomNumber) {
    console.log("WINNER");
    process.exit();
  } else if (tries == 0) {
    console.log("YOU LOSE!");
    console.log("The number was:", randomNumber);
    process.exit();
  } else if (answer > randomNumber) {
    console.log("TOO HIGH");
  } else if (answer < randomNumber) {
    console.log("TOO LOW");
  }
}