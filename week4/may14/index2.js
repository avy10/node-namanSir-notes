// logger functionality
// logging is critical for a backend system. WHY?
// console.log can output erros on terminal, but because terminal data is difficult to access, specially in case of older log.
// moreover, if a terminal is killed the logs are lost
// so we prefer to store the logs in file based on date and time or any other schema designed by the architecture
// we are not working on local machine, we are definitely using some cloud server and our terminal exist on that cloud server and not at our local terminal
//
const logger = require("logger");

console.log;
console.error;
console.table;
console.warn;

// ROBUSTNESS IN SYSTEM DESIGN

// alongwith logging, we have notifications for the developer
// as soon as console.error is triggered, we get notified about it
// console.error is placed on critical things
// critical thing for flipkart could be : somebody is not able to place orders (because user ordering stuff on flipkart is the core business)
// another critical thing could be failure in payments for a particular order

// find out why logging and alerting system becomes even more important for a distributed system

// any logger library has at least
logger.log;
logger.error;
logger.info;

/* 
logger.log("my login message");
logger.error("my error message");
logger.info("my info message")
*/
