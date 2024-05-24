const fs = require("fs").promises;
const path = require("path");
const PORT = 3000;
let userData;
const express = require("express");
const app = express();
app.use(express.json());

function writeUserData(userDataSTRING) {
	fs.writeFile(
		path.join(__dirname, "impFiles", "userFile.txt"),
		userDataSTRING,
		(err) => {
			console.log("error!!!!!!!!!!", err);
			return;
		}
	);
}

app.get("/try", (req, res) => {
	console.log(req.body);
	// userData = JSON.stringify(req.body)
	let userDataSTRING = JSON.stringify(req.body);
	const a = fs.readFile(path.join(__dirname, "impFiles", "userFile.txt"));
	// console.log("boolean a", a);
	writeUserData(userDataSTRING);
	res.send("Successfully written");
});
app.listen(PORT, () => {
	console.log(`server is up and running at port ${PORT}`);
});
