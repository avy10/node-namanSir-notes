const http = require("http");

function handleRequests(req, res) {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk.toString();
		// console.log(body);
	});
	console.log("body", body);

	req.on("end", () => {
		// console.log(body); //to make sure that body has finished streaming
	});

	// console.log("Hello Server");
	// console.log(req.url)
	if (req.method === "GET") {
		if (req.url === "/") {
			return res.end("I hit the root route in get");
		}
		if (req.url === "/product") {
			return res.end("I hit the product route in get");
		}
		console.log("I am a get method");
	}
	if (req.method === "POST") {
		if (req.url === "/product") {
			res.statusCode = 400;
			return res.end("I hit the product route in post");
		}
		console.log("I am a post method");
	}
	res.end("somethign");
}

const server = http.createServer(handleRequests);

// http.get('/abcd', (req, res) => {
//     console.log(res)
// })
server.listen(3000);
