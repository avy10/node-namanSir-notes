// event emitters
// event driven architecture of node.js

// EVENT? in front end :
// we create a listener for an "event", for ex whenever u click a button, trigger a particular function call
// so we first register the event i.e. listen and then invoke a certain function
// calling / invocation => event is actually triggered
// EVENTS IN BACKEND
// has 2 parts : registration, calling

const EventEmitter = require("events"); //events is a module, this module provides us a class,
//  so from that module we are building a class called as EventEmitter
// that way the functions present in the events module is now accessible for EventEmitter

class Emitter extends EventEmitter {}
// we have created an Emitter class which inherits the EventEmitter class
// this Emitter has access to all those functions which are accessible for EventListener class via events module

const myEmitter = new Emitter();

// the on and emit functions are coming from the events module

myEmitter.on("check", () => {
	// on("check") basically is simiilar to addEventListener in some manner
	// one of the most common event that we use in addEventListener is onClick, when a UI element is clicked, the addEventListener runs the callback function associated with it

	// Similarly this "on" is listening to a user created event called as "check"
	// when a particular event name "check" is fired/emitted, the particular callback function is executed

	console.log("my first emitter is triggered");
});

// because we do not have UI in the backend, we trigger/fire the event from our code using the "on" functionaluty
myEmitter.emit("check");
// this emit is basically triggering the "check" event.
// the console will log when this event is fired

// if we renamem the event to something else, at this moment we do not have the "on" listening to that event
// hence no callback function is fired
myEmitter.emit("check1");

// the functionalities that event-emitter provides us can be achieved by normal functions as well
// but WE STILL PREFER "EVENT-EMITTER" over normal functions, which we would discuss later

// when we understand SOLID principles then only we could understand the preference of ""

function sample() {
	console.log("my first function call");
}
// this sample can be made to work as an emitter, but like we said we are gonna prefer the event-emitter
