import repl from "repl"
const msg = 'This is our message';

repl.start('---> ').context.textMessage = msg;