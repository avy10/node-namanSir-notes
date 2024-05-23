const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

app.get("/", (req, res) => {
	res.send("You are cool, and you hit the root path");
});
app.get("/people/:id/:storeId", (req, res) => {
	const paramss = req.params;
	// params keyword provides us the dynamic params
	// the value of dynamic routes are stored as an object
	// the key is the dynamic id, like this :
	/* {
        id : "1234",
        storeId : "a23"
    } */
	console.log(paramss);
	res.send("evauluating");
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
