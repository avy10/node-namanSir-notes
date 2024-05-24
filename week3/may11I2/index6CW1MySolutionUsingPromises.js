// PROMISES WAS NOT SUPPOSED TO BE USED
const fs = require("fs").promises;
const path = require("path");

async function createFile(filePath, content) {
	try {
		await fs.writeFile(filePath, content);
		console.log(`File ${path.basename(filePath)} created successfully.`);
	} catch (err) {
		console.error(`Error creating file ${path.basename(filePath)}:`, err);
		throw err;
	}
}

async function createFiles() {
	try {
		await createFile(
			path.join(__dirname, "impFiles", "a.txt"),
			"a is being created"
		);
		await createFile(
			path.join(__dirname, "impFiles", "b.txt"),
			"b is being created"
		);
		await createFile(
			path.join(__dirname, "impFiles", "c.txt"),
			"c is being created"
		);
		console.log("All files created successfully.");
	} catch (err) {
		console.error("Error creating files:", err);
	}
}

createFiles();
