const express = require("express"),
	router = express.Router(),
	Socialfeed = require("../models/socialfeed"),
	Middleware = require("../middleware");

// const loggedIn = (req, res, next) => {
// 	if (req.isAuthenticated()) {
// 		return next();
// 	} else {
// 		res.redirect("/login");
// 	}
// };

// const checkUserLogin = (req, res, next) => {
// 	if (req.isAuthenticated()) {
// 		Socialfeed.findById(req.params.id, function (err, foundFeed) {
// 			if (err) {
// 				console.log(err);
// 				res.redirect("back");
// 			} else {
// 				if (foundFeed.author.id.equals(req.user._id)) {
// 					next();
// 				} else {
// 					res.redirect("back:");
// 				}
// 			}
// 		});
// 	} else {
// 		res.redirect("back");
// 	}
// };
// router.get("/", function (req, res) {
// 	Socialfeed.find({}, function (err, socialfeed) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			res.render("socialfeed/index", { feed: socialfeed });
// 		}
// 	});
// });

router.post("/", Middleware.loggedIn, function (req, res) {
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

router.get("/new", Middleware.loggedIn, function (req, res) {
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

router.get("/:id/edit", Middleware.checkUserLogin, function (req, res) {
	Socialfeed.findById(req.params.id, function (err, foundFeed) {
		res.render("socialfeed/edit", { feed: foundFeed });
	});
});

router.put("/:id", Middleware.checkUserLogin, function (req, res) {
	Socialfeed.findByIdAndUpdate(req.params.id, req.body.feed, function (err, updatedFeed) {
		if (err) {
			res.redirect("/feed");
		} else {
			res.redirect("/feed/" + req.params.id);
		}
	});
});

router.delete("/:id", Middleware.checkUserLogin, function (req, res) {
	Socialfeed.findByIdAndDelete(req.params.id, function (err, deletedFeed) {
		if (err) {
			res.redirect("/feed/" + req.params.id);
		} else {
			res.redirect("/feed");
		}
	});
});

module.exports = router;
