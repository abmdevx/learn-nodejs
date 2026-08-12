// Start
// End
// Async operation finished

// console.log("start")
// console.log("end")

// function doSomethingAsync() {
//     console.log("async operation finished")
// }

// setTimeout(doSomethingAsync, 1000);


// console.log("A");

// setTimeout(() => {
//   console.log("B");
// }, 0);

// console.log("C");


console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

console.log("Middle");

setTimeout(() => {
  console.log("Second Timer");
}, 0);

console.log("End");


// start -> middle -> end -> timer -> second timer