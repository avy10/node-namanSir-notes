const fs = require("fs").promises;
const path = require("path");

async function createFiles() {
	try {
		await fs.writeFile(
			path.join(__dirname, "impFiles", "a.txt"),
			"a is being created",
			(err) => {
				throw err;
			}
		);
		await fs.writeFile(
			path.join(__dirname, "impFiles", "b.txt"),
			"b is being created",
			(err) => {
				throw err;
			}
		);
		await fs.writeFile(
			path.join(__dirname, "impFiles", "c.txt"),
			"c is being created",
			(err) => {
				throw err;
			}
		);

		console.log("a, b and c are succesfuully created");
	} catch (err) {
		console.log("Error in file creattion, details : ", err);
	}
}
createFiles();
