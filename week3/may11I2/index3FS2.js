const fs = require("fs");
const path = require("path");

console.log(path.join(__dirname));
// fs.writeFile(path.join(__dirname, "impFiles", "file.txt"));
// writeFile can write anywhere on the server, for now the server is our folder
// which is why we have to use path.join to provide the path name to writeFile
// path.join
// __dirname => gives name of current directory where the index3F2.js is present
// 2nd argument => the folder target, can be multiple number of arguments here
// 3rd argument => file name that we wanna create/write to

fs.writeFile(
	path.join(__dirname, "impFiles", "a.txt"),
	"a is being created",
	(err) => {}
);
