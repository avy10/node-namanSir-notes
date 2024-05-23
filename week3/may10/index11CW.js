const express = require("express");
// require("dotenv").config();
// const app = express();
// const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 3000;

const userDB = {
	1: {
		name: "naman",
		age: 10,
		hobby: "coloring",
	},
	123123: {
		name: "abhishek",
		age: 20,
		hobby: "code",
	},
	980: {
		name: "nikhil",
		age: 22,
		hobby: "cricket",
	},
};

app.use(express.json());

app.use((req, res, next) => {
	const { userId } = req.body;
	if (!userId) {
		res.status(400).json({ error: "userId is required" });
	}
	if (!userDB[userId]) {
		res.status(400).json({ error: "userId does not match" });
	}
	req.name = userDB[userId].name;
	next();
});

app.get("/", (req, res) => {
	console.log(req.name);
	res.json({ data: req.name });
});

app.listen(PORT, () => {
	// console.log(process)
	console.log(`server is up and running at port ${PORT}`);
});
