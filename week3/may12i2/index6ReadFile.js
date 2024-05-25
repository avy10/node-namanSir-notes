const fs = require("fs");
const path = require("path");
const PORT = 3000;

const express = require("express");
const app = express();
app.use(express.json());

app.get("/user/:userId", (req, res) => {
	// const userData = req.body;
	const userDataSTRING = JSON.stringify(req.body);
	const userId = req.params.userId;
	// existSync checks if the file/directory exists or does not exist
	const isPathValid = fs.existsSync(
		path.join(__dirname, "files", "textFiles")
	);
	const isRandomPathValid = fs.existsSync(
		path.join(__dirname, "files", "textFiles", "random.txt")
	);
	console.log("isPathValid", isPathValid);
	console.log("isRandomPathValid", isRandomPathValid);
	fs.appendFile(
		path.join(__dirname, "files", "textFiles", `${userId}userFile.txt`),
		`${userDataSTRING}\n`,
		(err) => {
			if (err) {
				return res
					.status(404)
					.send("Error in file writing operation /n", err);
			}
			res.status(200).send("File written succesfully");
			fs.readFile(
				path.join(
					__dirname,
					"files",
					"textFiles",
					`${userId}userFile.txt`
				),
				(err, data) => {
					if (err) {
						console.log("error in file reading\n", err);
						return;
					}
					// console.log(JSON.parse(data));
					console.log(data); //the data comes in form of a buffer
					//
					let tempString = ""; //when the buffer is appended onto an empty string, JS automatically converts buffer into the string and keeps appending

					tempString += data;
					console.log("tempString", tempString);
					// console.log("\n parsed tempString", JSON.parse(tempString));
					// the error was because we are parsing data which is coming from readFile is coming in form of Buffer
				}
			);
		}
	);
});
app.listen(PORT, () => {
	console.log("server is running");
});
