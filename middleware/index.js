const Socialfeed = require("../models/socialfeed"),
	Comment = require("../models/comment");

const middleware = {
	loggedIn: (req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect("/login");
		}
	},

	checkUserLogin: (req, res, next) => {
		if (req.isAuthenticated()) {
			Socialfeed.findById(req.params.id, function (err, foundFeed) {
				if (err) {
					console.log(err);
					res.redirect("back");
				} else {
					if (foundFeed.author.id.equals(req.user._id)) {
						next();
					} else {
						res.redirect("back:");
					}
				}
			});
		} else {
			res.redirect("back");
		}
	},
	checkUserComment: (req, res, next) => {
		if (req.isAuthenticated()) {
			Comment.findById(req.params.comment_id, function (err, foundComment) {
				if (err) {
					console.log(err);
					res.redirect("back");
				} else {
					if (foundComment.author.id.equals(req.user._id)) {
						next();
					} else {
						res.redirect("back:");
					}
				}
			});
		} else {
			res.redirect("back");
		}
	},
};

module.exports = middleware;
