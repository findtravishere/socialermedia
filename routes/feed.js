const express = require("express"),
	router = express.Router(),
	Socialfeed = require("../models/socialfeed");

const loggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect("/login");
	}
};
router.get("/", function (req, res) {
	Socialfeed.find({}, function (err, socialfeed) {
		if (err) {
			console.log(err);
		} else {
			res.render("socialfeed/index", { feed: socialfeed });
		}
	});
});

router.post("/", loggedIn, function (req, res) {
	let name = req.body.name;
	let image = req.body.image;
	let description = req.body.description;
	// let newFeed = { name: name, image: image, description: description };
	let author = {
		id: req.user._id,
		username: req.user.username,
	};
	let newFeed = { name: name, image: image, description: description, author: author };
	Socialfeed.create(newFeed, function (err, newFeed) {
		if (err) {
			console.log(err);
		} else {
			console.log(newFeed);
			res.redirect("/feed");
		}
	});
});

router.get("/new", loggedIn, function (req, res) {
	res.render("socialfeed/new");
});

router.get("/:id", function (req, res) {
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

module.exports = router;
