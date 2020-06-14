const express = require("express"),
	router = express.Router({ mergeParams: true }),
	Socialfeed = require("../models/socialfeed"),
	Comment = require("../models/comment");

const loggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect("/login");
	}
};

router.get("/new", loggedIn, function (req, res) {
	Socialfeed.findById(req.params.id, function (err, feed) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", { feed: feed });
		}
	});
});

router.post("/", loggedIn, function (req, res) {
	Socialfeed.findById(req.params.id, function (err, feed) {
		if (err) {
			console.log(err);
			redirect("/feed");
		} else {
			// let comment = req.body.comment;
			Comment.create(req.body.comment, function (err, comment) {
				if (err) {
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					console.log(comment);
					feed.comments.push(comment);
					feed.save();
					res.redirect("/feed/" + feed._id);
				}
			});
		}
	});
});

module.exports = router;
