const EventEmitter = require("events");
class Emitter extends EventEmitter {}
const myEmitter = new Emitter();
myEmitter.on("check", () => {
	console.log("my first emitter is triggered");
});


myEmitter.emit("check");
