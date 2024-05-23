/* /allFiles/textFiles/today's data/currentTime.txt
/allFiles/textFiles => static
create the other half, that is the challenge
 */

const fs = require("fs").promises;
const { readFile } = require("node:fs/promises");
const { mkdir } = require("node:fs/promises");
const { opendir } = require("node:fs/promises");

const fsCB = require("fs");
const path = require("path");
const PORT = 3000;
let userData;
const express = require("express");
const app = express();
app.use(express.json());

async function writeUserData(userDataSTRING, dateEpoch, currentTime) {
	try {
		// path.join(__dirname, `allFiles/textFiles/${dateEpoch}`)
		/* const openDirectory = await opendir(
			path.join(__dirname, `allFiles/textFiles/`)
		);
		// this one worked cz the directory does exist in the folder structure
		*/
		const openDirectory = await opendir(
			path.join(__dirname, `allFiles/textFiles/${dateEpoch}`)
		);
		console.log("OPENDIRECTORY", openDirectory);
		// await fs.appendFile(
		// 	path.join(
		// 		__dirname,
		// 		`allFiles/textFiles/${dateEpoch}`,
		// 		`${currentTime}.txt`
		// 	),
		// 	`\n${userDataSTRING}`
		// );
	} catch (err) {
		if (err.errno == -4058) {
			try {
				const creatingDirectory = await mkdir(
					path.join(__dirname, `allFiles/textFiles/${dateEpoch}`),
					{ recursive: false }
				);
				// console.log("CREATING DIRECTORY", creatingDirectory);
				/* console.log(
					"WHERE AM I IN TERMS OF __dirname",
					path.join(__dirname, `allFiles/textFiles/${dateEpoch}`)
				); */
				await fs.appendFile(
					path.join(
						__dirname,
						`allFiles/textFiles/${dateEpoch}`,
						`${currentTime}.txt`
					),
					`\n${currentTime} file created`
				);
			} catch (err) {
				console.log("directory creation is unsuccessful", err);
				throw err;
			}
		} else {
			console.log("errrorr!!!", err.errno);
			throw err;
		}
	}
}

app.get("/add", async (req, res) => {
	console.log(req.body);
	// userData = JSON.stringify(req.body)
	let userDataSTRING = JSON.stringify(req.body);
	// const a = fs.readFile(path.join(__dirname, "impFiles", "userFile.txt"));
	// console.log("boolean a", a);
	let fileOpSuccessful = true;
	const newDateObject = new Date();
	const dateEpoch = newDateObject.getTime();
	const currentTime =
		newDateObject.getHours() +
		"_" +
		newDateObject.getMinutes() +
		"_" +
		newDateObject.getSeconds();
	try {
		await writeUserData(userDataSTRING, dateEpoch, currentTime);
	} catch (err) {
		fileOpSuccessful = false;
	}

	if (fileOpSuccessful) {
		res.send("Successfully written");
	} else {
		res.status(404).send("error in writing file");
	}
});
// NOT POSSIBLE to delete files cz the dateEpoch and currentTIme is dependendt on the time of request by the user.
// Since dateEpoch and currentTime are dependent on the request time, those are dynamic values
// read directory using readDir and send back the file-data to the frontend then user can choose which files or folders to
// app.get("/delete", async (req, res) => {
// 	console.log("I AM HERE");
// 	try {
// 		const contents = await readFile(
// 			path.join(
// 				__dirname,
// 				`allFiles/textFiles/${dateEpoch}`,
// 				"userFile.txt"
// 			)
// 		);
// 		if (contents) {
// 			await fs.unlink(path.join(__dirname, "impFiles", "userFile.txt"));
// 		}
// 	} catch (err) {
// 		console.log("error in file read", err);
// 		res.status(404).send("File not found");
// 		return;
// 	}
// });
app.listen(PORT, () => {
	console.log(`server is up and running at port ${PORT}`);
});
