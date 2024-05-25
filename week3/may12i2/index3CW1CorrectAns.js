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
	fs.appendFile(
		path.join(__dirname, "files", "textFiles", `${userId}userFile.txt`),
		`${userDataSTRING}\n`,
		(err) => {
			if (err) {
				return res
					.status(404)
					.send("Error in file writing operation /n", err);
			}
			return res.status(200).send("File written succesfully");
		}
	);
});
app.listen(PORT, () => {
	console.log("server is running");
});
