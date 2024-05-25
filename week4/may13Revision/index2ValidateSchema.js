const fs = require("fs").promises;
const path = require("path");
const PRODUCT_FILE_NAME = "products.json";
const express = require("express");
const app = express();

app.use(express.json());
app.get("/products", async (req, res) => {
	try {
		let data = "";
		const dataBuffer = await fs.readFile(
			path.join(__dirname, "products.json")
		);
		data += dataBuffer;
		// console.log(data);
		// console.log(JSON.parse(data));
		const productsArray = JSON.parse(data);
		// console.log(productsArray);
		res.json(productsArray);
	} catch (error) {
		if (error) {
			console.log(error);
			res.status(404).send("can not access database.");
			return;
		}
	}
});
/* 
[
    {
        "id" : 1,
        "productName" : "smartWatch",
        "price" : "200$"
    },
    {
        "id" : 2,
        "productName" : "pencil",
        "price" : "50$"
    }
]
*/
app.post("/products", async (req, res) => {
	const dataIncoming = req.body;
	const keys = ["id", "productName", "price"];
	let errorInSchema = false;
	/* dataIncoming.map((ele) => {
		const { id, productName, price } = ele;
		if (!id || !productName || !price) {
			errorInSchema = true;
			res.status(404).json({
				message: "invalid schema found in the element",
				element: ele,
				data: dataIncoming,
			});
			return;
		}
	}); */
	const wrongElements = [];
	const rightElements = [];
	for (let ele of dataIncoming) {
		const { id, productName, price } = ele;
		if (!id || !productName || !price) {
			errorInSchema = true;
			wrongElements.push(ele);
		} else {
			rightElements.push(ele);
		}
	}
	try {
		rightElements.length != 0 &&
			(await fs.writeFile(
				path.join(__dirname, "products.json"),
				JSON.stringify(rightElements)
			));
		!errorInSchema &&
			res.json({
				message:
					"these elements matched the database schema and successfully written",
				dataWritten: rightElements,
				data: dataIncoming,
			});
	} catch (error) {
		if (error) {
			console.log(error);
			res.status(404).send("Error in database");
			return;
		}
	}
	if (errorInSchema) {
		res.status(404).json({
			successfulResponse: {
				message:
					"these elements matched the database schema and successfully written",
				dataWritten: rightElements,
			},
			failureResponse: {
				message: "invalid schema found in these element",
				element: wrongElements,
			},
			data: dataIncoming,
		});
		return;
	}
	// if (errorInSchema) return;
	/* 	if (!errorInSchema) {
		try {
			await fs.writeFile(
				path.join(__dirname, "products.json"),
				JSON.stringify(dataIncoming)
			);
			// res.send("File written successfully");
			res.json({
				message: "File written successfully",
				data: dataIncoming,
			});
		} catch (error) {
			if (error) {
				res.status(404).send("Error in accessing database");
			}
		}
	} */
});
app.listen(3000, () => {
	console.log("Server is up and running.");
});
