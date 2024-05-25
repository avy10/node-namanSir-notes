// "/products/:id"
// "/products" => append something to our object
// create a PUT method on "/products" so that we are able to append/add more products to our current products.json
// only one product is to be sent by the frontEnd, in the form of object
// make sure we do not have duplicates in our database
const PRODUCT_FILE_NAME = "index3Products.json";
const fs = require("fs").promises;
const path = require("path");
const express = require("express");
const app = express();
const PATH_PRODUCT_FILE_NAME = path.join(__dirname, "index3Products.json");
app.use(express.json());

app.put("/products", async (req, res) => {
	const productIncoming = req.body;
	let productData = "";
	try {
		const readProductData = await fs.readFile(PATH_PRODUCT_FILE_NAME);
		productData += readProductData;
	} catch (error) {
		if (error) {
			console.log("error in database", error);
			res.status(404).send("error in reading database");
			return;
		}
	}
	productData = JSON.parse(productData);
	console.log(productIncoming);

	let errorInSchema = false;

	const { id, productName, price } = productIncoming;
	if (!id || !productName || !price) {
		errorInSchema = true;
		res.status(404).json({
			message: "error in key name",
			data: productIncoming,
		});
		return;
	}

	if (!errorInSchema) {
		for (const ele of productData) {
			if (ele.id == productIncoming.id) {
				res.status(404).json({
					message: "product already exists in database",
					product: productIncoming,
				});
				return;
			}
		}

		try {
			productData.push(productIncoming);
			await fs.writeFile(
				PATH_PRODUCT_FILE_NAME,
				JSON.stringify(productData)
			);
			res.json({
				message: "product added succesfully",
				product: productIncoming,
			});
		} catch (error) {
			if (error) {
				console.log("error in writing file", error);
				res.status(404).send("error in database");
			}
		}
	}
});

app.listen(3000, () => {
	console.log("server is up and running");
});
