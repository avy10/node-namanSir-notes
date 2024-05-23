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
app.listen(PORT, () => {
	// console.log(process)
	console.log(`server is up and running at port ${PORT}`);
});
