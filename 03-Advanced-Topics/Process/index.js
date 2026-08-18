// console.log('This is the first message');

// process.on('beforeExit', (code) => {
//   console.log('Process beforeExit event with code:', code);
// });

// process.on('exit', (code) => {
//   setTimeout(() => { console.log('This will not work.') }, 0);
//   console.log('Process exit event with code:', code);
// });

// console.log('This is the second message');

// process.exit()


// process.on('uncaughtException', (err, origin) => {
//   console.error('This caused a problem:', origin);
//   console.error(err.stack);
// });

// setTimeout(() => {
//   console.log('This will also work');
// }, 1000);

// console.log('This will work');

// thisDoesNotExist();

// console.log('This will not work');

// console.log(process.cwd());

// console.log("Hello ",process.argv[2], "!");
// console.log("You are ",process.argv[3], " years old.");