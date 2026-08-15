// const EventEmitter = require('events'); 

// const myEmitter = new EventEmitter();

// someFunction = function (){
//   console.log('Something has happened!');
// }
// myEmitter.on('Some event', someFunction);

// myEmitter.emit('Some event');

// let n = 0;
// someFunction = function (){
//   n++
//   console.log(`Value of n is: ${n}`);
// }

// myEmitter.once('event', someFunction);
// myEmitter.on('event', someFunction);

// myEmitter.emit('event');
// myEmitter.emit('event');
// myEmitter.emit('event');

// handleError = function (errorCode) {
//   // do something about the error
//   console.error('Woah, there was an error! \nError code:', errorCode);
// }

// myEmitter.on('error', handleError);

// myEmitter.emit('error', 9);

// myEmitter.on('login', () => {
//     console.log("user logged in")
// })

// myEmitter.emit('login')
// myEmitter.emit('login')
// myEmitter.emit('login')

// myEmitter.once('welcome', (username) => {
//     console.log("welcome", username)
// })

// myEmitter.emit('welcome', "ahmad")
// myEmitter.emit('welcome', "ahmad")

// myEmitter.on('order', (food) => {
//     console.log(`order placed for ${food}`)
// })

// myEmitter.once('doorbell', () => {
//     console.log(`RING RING!`)
// })

// myEmitter.on('payment', (food) => {
//     console.log(`Enjoy your ${food}`)
// })

// let food = "hot chinese pizza"

// myEmitter.emit('order', food)
// myEmitter.emit('doorbell')
// myEmitter.emit('doorbell')
// myEmitter.emit('payment', food)