const express = require("express");
const fs = require("fs").promises;

const path = require("path");

const app = express();
const PORT = 3000;
const PRODUCT_FILE_NAME = "products.json";
app.use(express.json());

app.get("/products", async (req, res) => {
	const fileContent = await fs.readFile(
		path.join(__dirname, PRODUCT_FILE_NAME)
	);
	return res.json(JSON.parse(fileContent));
});

app.post("/products", async (req, res) => {
	const fileContent = await fs.readFile(
		path.join(__dirname, PRODUCT_FILE_NAME)
	);
	console.log("BODY IN PRODUCTS", req.body);
	const fileData = JSON.parse(fileContent);
	console.log("FILEDATA", fileData);
	fileData.push(req.body);
	// console.log("fileData aftert push", fileData);
	console.log(path.join(__dirname, PRODUCT_FILE_NAME));
	try {
		await fs.writeFile(
			path.join(__dirname, PRODUCT_FILE_NAME),
			JSON.stringify(fileData)
		);
		res.send("File writing successful");
	} catch (err) {
		console.log("ERROR IN POST", err);
		res.status(404).send("ERROR IN FILE WRITING");
	}
});
app.listen(PORT, () => {
	console.log(`server is up and running at port ${PORT}`);
});
