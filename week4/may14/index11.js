const EventEmitter = require("events");

class Logger extends EventEmitter {
	log(message) {
		this.emit("log", message);
	}
	error(message) {
		this.emit("error", message);
	}
	info(message) {
		this.emit("info", message);
	}
}

const logger = new Logger();

logger.on("log", (message) => {
	console.log(message);
});

logger.on("error", (message) => {
	console.error(message);
});

logger.info("info", (message) => {
	console.warn(message);
});

/* 
logger.log("my login message");
logger.error("my error message");
logger.info("my info message")
*/
