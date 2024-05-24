// the key to solving this is understanding the concept that when is a file writing operation is completed
// Recall that the callBack function is executed when the file writing operation is successful
// We would have to write code in a callBack-Hell manner
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

		fs.writeFile(
			path.join(__dirname, "impFiles", "fileB.txt"),
			"start B",
			(err) => {
				if (err) {
					console.log(err);
					return;
				}
				console.log("write fileB is completed");

				fs.writeFile(
					path.join(__dirname, "impFiles", "fileC.txt"),
					"start C",
					(err) => {
						if (err) {
							console.log(err);
							return;
						}
						console.log("write fileC is completed");
					}
				);
			}
		);
	}
);
