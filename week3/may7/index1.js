const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

app.get("/", (req, res) => {
	// console.log("req in get", req);
	// req contains so much info
	// the url we are hitting with queryParams, pathParams
	// contains headers
	// the method we are using
	// request timeout value etc

	// console.log("res in get", res);
	// server also responds back with a lot of data
	//

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
app.listen(PORT, () => {
	// console.log(process)
	console.log(`server is up and running at port ${PORT}`);
});
