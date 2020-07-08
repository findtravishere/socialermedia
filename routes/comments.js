const express = require("express"),
	router = express.Router({ mergeParams: true }),
	Socialfeed = require("../models/socialfeed"),
	Comment = require("../models/comment"),
	Middleware = require("../middleware");

// const loggedIn = (req, res, next) => {
// 	if (req.isAuthenticated()) {
// 		return next();
// 	} else {
// 		res.redirect("/login");
// 	}
// };

// const checkUserComment = (req, res, next) => {
// 	if (req.isAuthenticated()) {
// 		Comment.findById(req.params.comment_id, function (err, foundComment) {
// 			if (err) {
// 				console.log(err);
// 				res.redirect("back");
// 			} else {
// 				if (foundComment.author.id.equals(req.user._id)) {
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

router.get("/new", Middleware.loggedIn, (req, res) => {
	Socialfeed.findById(req.params.id, function (err, feed) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", { feed: feed });
		}
	});
});

router.post("/", Middleware.loggedIn, (req, res) => {
	Socialfeed.findById(req.params.id, function (err, feed) {
		if (err) {
			console.log(err);
			redirect("/feed");
		} else {
			// let comment = req.body.comment;
			Comment.create(req.body.comment, function (err, comment) {
				if (err) {
					req.flash("error", "Something went wrong");
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					console.log(comment);
					feed.comments.push(comment);
					feed.save();
					req.flash("success", "Added a comment successfully");
					res.redirect("/feed/" + feed._id);
				}
			});
		}
	});
});

router.get("/:comment_id/edit", Middleware.checkUserComment, (req, res) => {
	Comment.findById(req.params.comment_id, function (err, foundComment) {
		if (err) {
			res.redirect("back");
		} else {
			res.render("comments/edit", { feedid: req.params.id, comment: foundComment });
		}
	});
});

router.put("/:comment_id", Middleware.checkUserComment, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
		if (err) {
			res.redirect("back");
		} else {
			res.redirect("/feed/" + req.params.id);
		}
	});
});

router.delete("/:comment_id", Middleware.checkUserComment, (req, res) => {
	Comment.findByIdAndDelete(req.params.comment_id, function (err, deletedComment) {
		if (err) {
			res.redirect("back");
		} else {
			req.flash("success", "Successfully deleted comment");
			res.redirect("/feed/" + req.params.id);
		}
	});
});

module.exports = router;
