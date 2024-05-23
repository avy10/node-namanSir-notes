const express = require("express");
// require("dotenv").config();
const app = express();
// console.log(process.env.PORT);
// const PORT = process.env.PORT || 3000;
const PORT = 3000;
const path = require("path");

app.get("/", (req, res) => {
	res.send("You are cool, and you hit the root path");
});

app.post("/", (req, res) => {
	res.send("ohhhh you wanna hit the post route?");
});

app.get("/page/about", (req, res) => {
	console.log(path.join(__dirname, "view", "about.html"));
	res.sendFile(path.join(__dirname, "view", "about.html"));
});

app.patch("/", (req, res) => {
	console.log("patch it is");
});
app.get(
	"/middleware",
	(req, res) => {
		// next keyword
		// when next keyword is called, it indicates that the middle-ware function has completed its execution
		// so it passes on the now manipulated data to the next function, the next function could be another middleware of the specific function of that route
		console.log("I AM CURRENTLY IN THE MIDDLEWARE");
		req.manipulated = true;
	},
	(req, res) => {
		console.log("I AM THE ACTUAL LOGIC");
		if (req.manipulated) {
			res.send("Modified data returned");
			return;
		}
		res.send("Actual data returned");
	}
	// because we are not using next keyword here,

	// the middleware is not giving up its control on the data AND,
	//  1st function is not able to call the subsequent function that is waiting for the data to arrive
	// hence our server wont be responding back to the request
	// to fix that we need to use "next" keyword, in index2middleWare.js
);
app.listen(PORT, () => {
	// console.log(process)
	console.log(`server is up and running at port ${PORT}`);
});
