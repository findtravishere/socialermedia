const Socialfeed = require("../models/socialfeed"),
	Comment = require("../models/comment");

const middleware = {
	loggedIn: (req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		} else {
			req.flash("error", "You have to be logged in first");
			res.redirect("/login");
		}
	},

	checkUserLogin: (req, res, next) => {
		if (req.isAuthenticated()) {
			Socialfeed.findById(req.params.id, function (err, foundFeed) {
				if (err) {
					req.flash("error", "Unable to load");
					res.redirect("back");
				} else {
					if (foundFeed.author.id.equals(req.user._id)) {
						next();
					} else {
						req.flash("error", "You do not have permission to do that");
						res.redirect("back:");
					}
				}
			});
		} else {
			req.flash("error", "You have to be logged in first");
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
						req.flash("error", "You do not have permission to do that");
						res.redirect("back:");
					}
				}
			});
		} else {
			req.flash("error", "You have to be logged in first");
			res.redirect("back");
		}
	},
};

module.exports = middleware;
