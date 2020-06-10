const express = require("express"),
	app = express(),
	bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

let feed = [
	{
		name: "Fizz",
		image: "https://www.clipartmax.com/png/middle/77-778038_jerry-the-mouse-eating-cheese.png",
	},
	{
		name: "AJ",
		image: "https://www.clipartmax.com/png/middle/77-778038_jerry-the-mouse-eating-cheese.png",
	},
	{
		name: "Kika",
		image: "https://www.clipartmax.com/png/middle/77-778038_jerry-the-mouse-eating-cheese.png",
	},
];

app.get("/", function (req, res) {
	res.render("landing");
});

app.get("/feed", function (req, res) {
	res.render("feed", { feed: feed });
});

app.post("/feed", function (req, res) {
	let name = req.body.name;
	let image = req.body.image;
	let newFeed = { name: name, image: image };
	feed.push(newFeed);
	res.redirect("/feed");
});

app.get("/feed/new", function (req, res) {
	res.render("new");
});

app.listen(8080 || process.env.PORT, function () {
	console.log("Server's running");
});
