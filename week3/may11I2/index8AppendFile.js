const fs = require("fs");
const path = require("path");

fs.writeFile(
	path.join(__dirname, "impFiles", "fileA.txt"),
	"start A",
	(err) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log("write fileA is completed");
		fs.appendFile(
			path.join(__dirname, "impFiles", "fileA.txt"),
			"\n now we are appending on A",
			(err) => {
				if (err) {
					console.log(err);
					return;
				}
			}
		);
	}
);
