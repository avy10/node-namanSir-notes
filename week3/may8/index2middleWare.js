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
	(req, res, next) => {
		// next keyword
		// when next keyword is called, it indicates that the middle-ware function has completed its execution
		// so it passes on the now manipulated data to the next function, the next function could be another middleware of the specific function of that route
		console.log("I AM CURRENTLY IN THE MIDDLEWARE");
		req.manipulated = true;
		next();
		// when next() is called, the 1st function indicates that its execution has been completed
		// and now the req and res is passed onto the subsequent function
		// note that we have manipulated the req
		// basically we added a key-value to the req
	},
	(req, res) => {
		console.log("I AM THE ACTUAL LOGIC");
		if (req.manipulated) {
			res.send("Modified data returned");
			return;
		}
		res.send("Actual data returned");
	}
);
app.listen(PORT, () => {
	// console.log(process)
	console.log(`server is up and running at port ${PORT}`);
});
