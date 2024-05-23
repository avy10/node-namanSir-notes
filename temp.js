const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/people/:id/:storeId", (req, res) => {
	const paramss = req.params;
	console.log(paramss);
	res.send("evauluating");
});

app.get("/users", (req, res) => {
	//fetch users from db
	const tempDbReturnedUser = {
		name: "naman",
		age: 10,
		hobbies: "playing",
	};
	res.json(tempDbReturnedUser);
});

app.get(
	"/middleware-usage",
	(req, res, next) => {
		//middleware -> manipulate the req
		console.log("I am currently in the middleware");
		req.manipulated = true;
		next();
	},
	(req, res, next) => {
		//middleware -> manipulate the req
		console.log("I am  middleware 2");
		//some more manipulation done
		next();
	},
	(req, res, next) => {
		//middleware -> manipulate the req
		console.log("I am  middleware 3");
		//some more manipulation done
		next();
	},
	(req, res) => {
		const didMiddlewareActuallyWork = req.manipulated;
		console.log(JSON.stringify(didMiddlewareActuallyWork));
		//actual logic
		console.log("I am the actual logic");
		res.send("Actual logic returned.");
	}
);

function one(req, res, next) {
	//middleware -> manipulate the req
	console.log("I am currently in the middleware");
	req.manipulated = true;
	next();
}
function two(req, res, next) {
	//middleware -> manipulate the req
	console.log("I am  middleware 2");
	//some more manipulation done
	next();
}
function three(req, res, next) {
	//middleware -> manipulate the req
	console.log("I am  middleware 3");
	//some more manipulation done
	next();
}

app.get("/middleware-usage-2", one, two, three, (req, res) => {
	const didMiddlewareActuallyWork = req.manipulated;
	console.log(JSON.stringify(didMiddlewareActuallyWork));
	//actual logic
	console.log("I am the actual logic");
	res.send("Actual logic returned.");
});

function timeAppendMiddleware(req, res, next) {
	req.timeOfExec = Date.now();
	next();
}

app.get("/one", timeAppendMiddleware, (req, res) => {
	console.log("final");
	res.json({ time: req.timeOfExec });
});

app.get("/two", timeAppendMiddleware, (req, res) => {
	console.log("final 2");
	res.json({ time: req.timeOfExec });
});

app.get("/three", timeAppendMiddleware, (req, res) => {
	console.log("final 3");
	res.json({ time: req.timeOfExec });
});

function isSeller(req, res, next) {
	const userId = req.params.userId;
	if (userId % 2 !== 0) {
		return res.status(403).json({ error: "not authorized" });
	}
	next();
}
function isCustomer() {
	//code logic
}

///segregating seller and customer
app.get("/one/:userId", isSeller, (req, res) => {
	console.log("final");
	res.json({ time: req.timeOfExec });
});

app.get("/two/:userId", isCustomer, (req, res) => {
	console.log("final 2");
	res.json({ time: req.timeOfExec });
});

app.get("/three/:userId", isSeller, (req, res) => {
	console.log("final 3");
	res.json({ time: req.timeOfExec });
});

//understanding express middlewares ->

app.post("/user", (req, res) => {
	console.log(req.body);
	console.log(req.body.testkey);
	//get the user body from the req
	//append it onto the db
	res.status(201).json({ message: "user added successfully" });
});

app.listen(PORT, () => {
	// console.log(process)
	console.log(`server is up and running at port ${PORT}`);
});
