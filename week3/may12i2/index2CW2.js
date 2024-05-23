const fs = require("fs").promises;
const fsCB = require("fs");
const path = require("path");
const PORT = 3000;
let userData;
const express = require("express");
const app = express();
app.use(express.json());

async function writeUserData(userDataSTRING) {
	try {
		await fs.appendFile(
			path.join(__dirname, "impFiles", "userFile.txt"),
			`\n${userDataSTRING}`
		);
	} catch (err) {
		console.log("errrorr!!!", err);
		throw err;
	}
}

app.get("/add", async (req, res) => {
	console.log(req.body);
	// userData = JSON.stringify(req.body)
	let userDataSTRING = JSON.stringify(req.body);
	// const a = fs.readFile(path.join(__dirname, "impFiles", "userFile.txt"));
	// console.log("boolean a", a);
	let fileOpSuccessful = true;
	try {
		await writeUserData(userDataSTRING);
	} catch (err) {
		fileOpSuccessful = false;
	}

	if (fileOpSuccessful) {
		res.send("Successfully written");
	} else {
		res.status(404).send("error in writing file");
	}
});

app.get("/delete", (req, res) => {
	console.log("I AM HERE");
	fsCB.readFile(
		path.join(__dirname, "impFiles", "userFile.txt"),
		(err, data) => {
			if (err) {
				console.log("error in file read", err);
				res.status(404).send("File not found");
				return;
			}

			fsCB.unlink(
				path.join(__dirname, "impFiles", "userFile.txt"),
				(err) => {
					if (err) {
						console.log("error in file delete", err);
						res.status(404).send("File not found");
						return;
					}

					res.send("File successfully removed");
					return;
				}
			);
		}
	);
});
app.listen(PORT, () => {
	console.log(`server is up and running at port ${PORT}`);
});
