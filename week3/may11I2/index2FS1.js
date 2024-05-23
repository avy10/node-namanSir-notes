// fs is an inbuilt module
// no need to do npm i
// we do import of fs

const fs = require("fs");
const path = require("path");
// path has a heavily used function called as join

// with promises, the underneath library should also be promise compatible
// cz we will do await and our underneath library should understand terms reject, success, await, .then
// so our library has to integrated with promise in order to use promise on them

// const fs = require("fs"); => callback version of fs
// const fs = require("fs").promises => promises version of fs

/* 
    CRUD on file
    1. Create => creating a file ==> writing a file
    2. Read => read the file
    3. Update => overWrite the file or Append the file
    3. Delete => delete the file
*/

// fs.writeFile => writes file in async manner
// fs.writeFileSync => writes file in sync manner =>
// instruction write "abcd" content into the file sample.js

// there will be some delay, because we are now interacting with external resources like SSD
// let the delay be 1s
// we have a node server which is running while we are writing
// let user2 trying to access the server,
// we wont be able to entertain user2 because node is single threaded and it is writing abcd into sample.js in a sync manner

// we cannot move forward in the code till we have response from node that file is written
// file writing can be considered as a background process
// some computation power is writing that file there is a background process

function fileProcesses() {
	fs.writeFile("abcd", sample.js);
	const fileData = fs.readFile(sample.js);
	console.log(fileData);
}

// if user1 has called for execution of fileProcesses, node will be busy executing it
// if the execution takes say 5s, till those 5s, we cannot process any other request made to the server
// so if user2 wants to do something while user1's request is being processed, it wont be entertained

// NOW IF THE ABOVE FUNCTION IS ASYNC
// should user2 be allow to access and modify sample.js while user1's request is being made
// NO
// because that would lead to mix of data, user1 will write+overwrite then user2 will write + overwrite
// => all in all we would get a stale data

// THE ABOVE NOTES ARE EXPLAINED BELOW
/* 
Your notes describe a common scenario in Node.js where file operations and their synchronous/asynchronous nature impact server performance and concurrency. Let me clarify the key points step-by-step.

### Synchronous vs Asynchronous File Operations

    1. **Synchronous File Operations (`fs.writeFileSync`)**:
        - **Blocking Nature**: When you use synchronous file operations, Node.js will block the event loop until the file operation is complete. 
        This means that no other code can be executed, and no other incoming requests can be processed during this time.
        - **Example**:
*/
const fs = require("fs");
fs.writeFileSync("sample.js", "abcd");
const fileData = fs.readFileSync("sample.js", "utf-8");
console.log(fileData);
// - **Impact**: If this operation takes 5 seconds, the server cannot handle any other requests during this period.

/*
    2. **Asynchronous File Operations (`fs.writeFile`)**:
        - **Non-blocking Nature**: Asynchronous operations allow Node.js to continue executing other code while the file operation is performed in the background. 
        This makes the server more responsive to other requests.
        - **Example**:
*/
const fs = require("fs");

function fileProcesses() {
	fs.writeFile("sample.js", "abcd", (err) => {
		if (err) throw err;
		fs.readFile("sample.js", "utf-8", (err, fileData) => {
			if (err) throw err;
			console.log(fileData);
		});
	});
}

fileProcesses();

/*

### Handling Concurrent Requests

1. **Concurrency**:
    - In a scenario where `fileProcesses` is executed asynchronously, Node.js can handle other incoming requests while it waits for the file operations to complete. 
    This enhances the server's ability to manage multiple clients simultaneously.

2. **File Access Conflicts**:
    - **Scenario**: If `user1` triggers `fileProcesses` to write to `sample.js` asynchronously, 
    and during this time, `user2` tries to access or modify `sample.js`, a conflict might arise.
    - **Solution**: To avoid such conflicts, you can implement mechanisms like
    file locks, flags, or state checks to ensure that only one operation is performed on the file at any given time.

### Example with Concurrency Control

Here's how you can manage asynchronous file operations with a simple concurrency control mechanism:

*/
const fs = require("fs");
const path = "sample.js";

let isWriting = false;

function fileProcesses() {
	if (isWriting) {
		console.log(
			"File is currently being written to. Please try again later."
		);
		return;
	}

	isWriting = true;

	fs.writeFile(path, "abcd", (err) => {
		if (err) {
			isWriting = false;
			throw err;
		}
		fs.readFile(path, "utf-8", (err, fileData) => {
			isWriting = false;
			if (err) throw err;
			console.log(fileData);
		});
	});
}

// Example of user1 and user2 trying to access the file
fileProcesses(); // user1's request
setTimeout(fileProcesses, 100); // user2's request 100ms later
/*

In this example:
- **isWriting**: A flag to indicate whether the file is currently being written to.
- **Concurrency Control**: Before starting a write operation, the function checks the `isWriting` flag. 
If a write is already in progress, it logs a message and exits. 
Otherwise, it sets the flag to `true` and proceeds with the write operation.
After the write (and subsequent read), it resets the flag to `false`.

### Conclusion

Your notes correctly identify the key differences between synchronous and asynchronous file operations in Node.js and,
highlight the importance of understanding their impact on server performance and concurrency. 
By using asynchronous operations and proper concurrency controls, you can ensure that your server remains responsive and can handle multiple requests efficiently.

*/
