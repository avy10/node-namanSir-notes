const fs = require("fs");
const path = require("path");
// if a file does not exist then appendFile would first create that file and then write to it,
// basically act like writeFile when file is not present
fs.appendFile(
	path.join(__dirname, "impFiles", "fileABHISHEK.txt"),
	"\n now we are appending on ABHISHEK",
	(err) => {
		if (err) {
			console.log(err);
			return;
		}
	}
);
