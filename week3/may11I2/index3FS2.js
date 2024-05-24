const fs = require("fs");
const path = require("path");
const PORT = 3000;
const express = require("express");
const app = express();
// console.log(path.join(__dirname));
// fs.writeFile(path.join(__dirname, "impFiles", "file.txt"));
// writeFile can write anywhere on the server, for now the server is our folder
// which is why we have to use path.join to provide the path name to writeFile
// path.join
// 1st argument =>  __dirname => gives name of current directory where the index3F2.js is present
// 2nd argument => the folder target, can be multiple number of arguments here
// 3rd argument => file name that we wanna create/write to

// why do we need path module? why not use C:/Users/Dowloads style for path
// because our backend code should be system independent
// writing pathname like that binds the code to our system
// a backend code should not be binded to the system like that because they are hosted on servers and VMs
// and each server or VM can have different location where our files are present, so we use path module
// if provides the current directory we are in and then from there we can do relative navigation of directory for file access

fs.writeFile(
	path.join(__dirname, "impFiles", "a.txt"),
	"a is being created",
	(err) => {
		// this callback function is executed if
		// 1. file writing operation is succesful
		// 2. there is an error in writing the file
		// the code execution will not pause and wait for the file execution to complete
		// it will code ahead
		// so if we put some console.logs after the writeFile function is executed, we would ssee those logs before the creation of file

		// CHECK THE NEXT EXAMPLE
		console.log(err);
	}
);

fs.writeFile(
	path.join(__dirname, "impFiles", "aaaa.txt"),
	"aaaa is being created",
	() => {
		console.log("FILE IS CREATED");
	}
);
console.log("code executed");
console.log("code executed");
console.log("code executed");
console.log("code executed");
console.log("code executed");
fs.writeFile(
	path.join(__dirname, "impFilesa", "aaaa.txt"),
	"aaaa is being created",
	(err) => {
		if (err) {
			console.log("ERROR IN FILE CREATION");
		}
		console.log("FILE IS CREATED");
	}
);
app.get("/", (req, res) => {
	console.log(path.join(__dirname));
	console.log(path.join(__dirname, ".."));
	console.log(path.join(__dirname, "..", ".."));
	// 	E:\NS BACKEND\node2\week3\may11I2
	// E:\NS BACKEND\node2\week3
	// E:\NS BACKEND\node2
	console.log(path.join(__dirname, "..", "..", "week2"));
	// E:\NS BACKEND\node2\week2
});

app.listen(PORT, () => {
	console.log(`server is up and running at port ${PORT}`);
});
