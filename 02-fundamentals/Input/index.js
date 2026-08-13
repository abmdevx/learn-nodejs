// console.log('Hey there,' , process.argv[2]); 
//  process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

// import readline from 'readline';

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// let query = 'What is your name?\n'

// rl.question(query, (answer) => {
//   console.log(`Hello ${answer}!`);
  
//   rl.close();
// });

// console.log(process.argv[0]);
// console.log(process.argv[1]);
// console.log(process.argv[2]);


console.log("")
console.log("Hello", process.argv[2]);

import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let query = "What is your favorite programming language?\n"
rl.question(query, (answer) => {
    console.log(answer);
    rl.close();
})

