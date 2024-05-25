const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const { existsSync } = require("fs");
const app = express();
app.use(express.json());

app.get("/add/:userId", async (req, res) => {
	const userData = JSON.stringify(req.body);
	const userId = req.params.userId;
	const dateObject = new Date();
	const dateEpoch = dateObject.getTime();
	const dateFormatted =
		dateObject.getDate() +
		"_" +
		dateObject.getMonth() +
		"_" +
		dateObject.getFullYear();
	res.send(dateFormatted);
	const TARGET_FOLDER = path.join(__dirname, "allFiles", dateFormatted);
	const isPathValid = existsSync(TARGET_FOLDER);
	// const isPathValid = fs.
	// which is better, existSync or openDirectory and then matching the errono -4058 which indicates directory not found??
	// readDir, openDir
	if (isPathValid) {
		// console.log(isPathValid);
		try {
			await fs.appendFile(
				path.join(TARGET_FOLDER, `${userId}.txt`),
				`File Created at ${dateEpoch} \n`
			);
		} catch (error) {
			res.send(404).status("error in file op", err);
		}
	} else {
		try {
			await fs.mkdir(path.join(TARGET_FOLDER), { recursive: false });
			await fs.writeFile(
				path.join(TARGET_FOLDER, `${userId}.txt`),
				`File created at ${dateEpoch}\n`
			);
		} catch (error) {
			res.send(404).status("error in file op", err);
		}
	}
});

app.get("/delete/:date/:userId", async (req, res) => {
	console.log(req.params); //{ date: '25_4_2024', userId: 'avy10' }
	const targetDate = req.params.date;
	const userId = req.params.userId;
	const TARGET_FOLDER = path.join(
		__dirname,
		"allFiles",
		`${targetDate}`,
		`${userId}.txt`
	);
	const isPathValid = existsSync(TARGET_FOLDER);
	console.log(isPathValid);
	if (!isPathValid) {
		res.status(404).send("File not found.");
		return;
	}
	try {
		await fs.unlink(TARGET_FOLDER);
		res.send("File deleted succesfully.");
	} catch (error) {
		if (error) {
			res.status(404).send("Error in file deletion.");
		}
	}
});

app.listen(3000, () => {
	console.log("Server is running");
});
