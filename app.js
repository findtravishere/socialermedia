const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	Socialfeed = require("./models/socialfeed"),
	seedDB = require("./seeds"),
	Comment = require("./models/comment");
// User = require("./models/user");

seedDB();
mongoose.connect("mongodb://localhost/feed", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
	res.render("landing");
});

app.get("/feed", function (req, res) {
	Socialfeed.find({}, function (err, socialfeed) {
		if (err) {
			console.log(err);
		} else {
			res.render("socialfeed/index", { feed: socialfeed });
		}
	});
});

app.post("/feed", function (req, res) {
	// let name = req.body.name;
	// let image = req.body.image;
	// let description = req.body.description;
	// let newFeed = { name: name, image: image, description: description };
	let newFeed = req.body.feed;
	Socialfeed.create(newFeed, function (err, newFeed) {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/feed");
		}
	});
});

app.get("/feed/new", function (req, res) {
	res.render("socialfeed/new");
});

app.get("/feed/:id", function (req, res) {
	Socialfeed.findById(req.params.id)
		.populate("comments")
		.exec(function (err, foundSocialfeed) {
			if (err) {
				console.log(err);
			} else {
				console.log(foundSocialfeed);
				res.render("socialfeed/show", { feed: foundSocialfeed });
			}
		});
});

app.get("/feed/:id/comments/new", function (req, res) {
	Socialfeed.findById(req.params.id, function (err, feed) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", { feed: feed });
		}
	});
});

app.post("/feed/:id/comments", function (req, res) {
	Socialfeed.findById(req.params.id, function (err, feed) {
		if (err) {
			console.log(err);
			redirect("/feed");
		} else {
			let comment = req.body.comment;
			Comment.create(comment, function (err, comment) {
				if (err) {
					console.log(err);
				} else {
					feed.comments.push(comment);
					feed.save();
					res.redirect("/feed/" + feed._id);
				}
			});
		}
	});
});

app.listen(8080 || process.env.PORT, function () {
	console.log("Server's running");
});
