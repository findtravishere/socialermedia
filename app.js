const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/feed", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

let socialfeedSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
});

let Socialfeed = mongoose.model("Socialfeed", socialfeedSchema);

// Socialfeed.create(
// 	{
// 		name: "Fizz",
// 		image: "https://www.clipartmax.com/png/middle/77-778038_jerry-the-mouse-eating-cheese.png",
// 		description: "aaaaaaaaaaaaaaaaaaaaaa",
// 	},
// 	(err, socialfeed) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log(socialfeed);
// 			console.log("a new thing on the feed");
// 		}
// 	}
// );

// let feed = [
// 	{
// 		name: "Fizz",
// 		image: "https://www.clipartmax.com/png/middle/77-778038_jerry-the-mouse-eating-cheese.png",
// 	},
// 	{
// 		name: "AJ",
// 		image: "https://www.clipartmax.com/png/middle/77-778038_jerry-the-mouse-eating-cheese.png",
// 	},
// 	{
// 		name: "Kika",
// 		image: "https://www.clipartmax.com/png/middle/77-778038_jerry-the-mouse-eating-cheese.png",
// 	},
// ];

app.get("/", function (req, res) {
	res.render("landing");
});

app.get("/feed", function (req, res) {
	Socialfeed.find({}, function (err, socialfeed) {
		if (err) {
			console.log(err);
		} else {
			res.render("index", { feed: socialfeed });
		}
	});
});

app.post("/feed", function (req, res) {
	let name = req.body.name;
	let image = req.body.image;
	let description = req.body.description;
	let newFeed = { name: name, image: image, description: description };
	Socialfeed.create(newFeed, function (err, newFeed) {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/feed");
		}
	});
});

app.get("/feed/new", function (req, res) {
	res.render("new");
});

app.get("/feed/:id", function (req, res) {
	Socialfeed.findById(req.params.id, function (err, foundSocialfeed) {
		if (err) {
			console.log(err);
		} else {
			res.render("show", { feed: foundSocialfeed });
		}
	});
});

app.listen(8080 || process.env.PORT, function () {
	console.log("Server's running");
});
