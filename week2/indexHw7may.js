// const express = require("express");
// const app = express();

// const users = [
// 	{
// 		uID: "10",
// 		uName: "avy",
// 		socials: ["reddit", "instagram", "whatsapp"],
// 		smartphone: "Redmi",
// 	},
// 	{
// 		uID: "6",
// 		uName: "hira",
// 		socials: ["reddit", "instagram"],
// 		smartphone: "samsung",
// 	},
// 	{
// 		uID: "12",
// 		uName: "cypher",
// 		socials: ["reddit", "twitter"],
// 		smartphone: "Motorola",
// 	},
// 	{
// 		uID: "24",
// 		uName: "reyna",
// 		socials: ["instagram", "facebook"],
// 		smartphone: "Samsung",
// 	},
// 	{
// 		uID: "36",
// 		uName: "brimmy",
// 		socials: ["linkedin", "whatsapp"],
// 		smartphone: "Google",
// 	},
// 	{
// 		uID: "14",
// 		uName: "Damia",
// 		socials: ["reddit", "instagram", "snapchat"],
// 		smartphone: "Apple",
// 	},
// ];

// app.get("/", (req, res) => {
// 	res.json("WELCOME TO THE API");
// });
// app.get("/users", (req, res) => {
// 	return res.json(users);
// });
// app.get("/user/:uID", (req, res) => {
// 	const uID = req.params.uID;
// 	const socialMediaFilters = req.query.socials || [];
// 	const mobileCompanyFilter = req.query.smartphone;
// 	console.log(socialMediaFilters);
// 	const user = users.filter((user) => user.uID === uID);
// 	if (user.length == 0) {
// 		return res.status(404).json({ error: "User not found" });
// 	}
// 	console.log(user);
// 	if (user.length == 1) {
// 		if (socialMediaFilters.length > 0) {
// 			const filteredSocialMedia = user[0].socials.filter((platform) =>
// 				socialMediaFilters.includes(platform)
// 			);
// 			if (filteredSocialMedia.length === 0) {
// 				return res.status(404).json({
// 					error: "User does not use the specified social media platforms",
// 				});
// 			}
// 			user.socials = filteredSocialMedia;
// 		}

// 		if (mobileCompanyFilter && user[0].smartphone !== mobileCompanyFilter) {
// 			return res.status(404).json({
// 				error: "User does not carry the specified mobile phone company",
// 			});
// 		}
// 	} else {
// 		return res.status(404).json({
// 			error: "Backend Logic work in progress",
// 		});
// 	}

// 	res.json(user);
// });

// const PORT = 9800;
// app.listen(PORT, () => {
// 	console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const app = express();

const users = [
	{
		uID: "10",
		uName: "avy",
		socials: [
			"reddit",
			"instagram",
			"whatsapp",
			"telegram",
			"discord",
			"signal",
			"slack",
		],
		smartphone: "Redmi, Samsung, Motorola",
	},
	{
		uID: "6",
		uName: "hira",
		socials: ["reddit", "instagram", "snapchat", "twitter"],
		smartphone: "samsung, htc, OnePlus",
	},
	{
		uID: "12",
		uName: "cypher",
		socials: ["reddit", "twitter", "telegram", "facebook"],
		smartphone: "Motorola, huawei, Apple",
	},
	{
		uID: "24",
		uName: "reyna",
		socials: ["instagram", "facebook", "facebook", "slack"],
		smartphone: "Samsung, OnePlus, Google",
	},
	{
		uID: "36",
		uName: "brimmy",
		socials: ["linkedin", "whatsapp", "slack", "reddit", "twitter"],
		smartphone: "Google, Apple",
	},
	{
		uID: "14",
		uName: "Damia",
		socials: ["reddit", "instagram", "snapchat"],
		smartphone: "Apple",
	},
];

app.get("/", (req, res) => {
	res.json("WELCOME TO THE API");
});
app.get("/users", (req, res) => {
	const socialMediaFilters = req.query.socials || [];
	// http://localhost:3000/users?socials=%22reddit%22&socials=%22whatsapp%22
	// this url gives socials like an array : [ '"reddit"', '"whatsapp"' ]
	// NOTE WARNING :
	// http://localhost:3000/users?socials=%22[%22whatsapp%22,%20%22reddit%22]%22
	// this one wont give socials like an array
	// it is an string : "["whatsapp", "reddit"]"

	// URL ONE : http://localhost:3000/users?socials=reddit
	// my code worked, value => reddit (string type)
	// URL TWO : http://localhost:3000/users?socials="reddit"
	// my code did not work because the value was "reddit"(string type including double quotations)
	const mobileCompanyFilter = req.query.smartphone || [];
	const typeOfFilter = req.query.type || "or";
	console.log(Array.isArray(socialMediaFilters));
	const newUsers = [...users];
	const ans = [];
	if (typeof socialMediaFilters != "string") {
		// if (socialMediaFilters.length != 0 && mobileCompanyFilter.length == 0) {
		// 	newUsers.forEach((eachUser) => {
		// 		socialMediaFilters.forEach((eachPlatform) => {
		// 			if (eachUser.socials.includes(eachPlatform)) {
		// 				ans.push(eachUser);
		// 			}
		// 		});
		// 	});
		// } else
		if (socialMediaFilters.length > 0 && mobileCompanyFilter.length == 0) {
			if (typeOfFilter == "or") {
				socialMediaFilters.forEach((givenPlatform) => {
					users.forEach((eachUser) => {
						if (eachUser.socials.includes(givenPlatform)) {
							ans.push(eachUser);
						}
					});
				});
			} else if (typeOfFilter == "and") {
				const socialMediaQueryString = socialMediaFilters.join("");
				users.forEach((eachUser, index) => {
					const userSocialMediaString = eachUser.socials.join("");
					console.log(socialMediaQueryString);
					console.log(userSocialMediaString);
					const isFound = userSocialMediaString.includes(
						socialMediaQueryString
					);
					console.log("isFound", isFound);
					if (isFound) {
						ans.push(eachUser);
					}
				});
			}
		}
	} else {
		if (socialMediaFilters.length != 0 && mobileCompanyFilter.length == 0) {
			newUsers.forEach((eachUser) => {
				// console.log(eachUser.socials);
				// console.log(socialMediaFilters);
				// console.log(eachUser["socials"].includes(socialMediaFilters));
				if (eachUser.socials.includes(socialMediaFilters)) {
					ans.push(eachUser);
				}
				// eachUser.socials.forEach((platformName) => {
				// 	console.log("platformName", platformName);
				// 	console.log("socialMediaFilters", socialMediaFilters);
				// 	if (String(platformName) == String(socialMediaFilters)) {
				// 		ans.push(eachUser);
				// 	}
				// });
			});
		}
	}

	// console.log(socialMediaFilters);
	// console.log(ans);
	if (ans.length != 0) {
		return res.json(ans);
	}
	return res.json(newUsers);
});
app.get("/user/:uID", (req, res) => {
	const uIDParams = req.params.uID;

	const user = users.filter((user) => user.uID === uIDParams);
	if (user.length == 0) {
		return res.status(404).json({ error: "User not found" });
	}

	res.json(user);
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
