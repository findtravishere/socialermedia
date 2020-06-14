const express = require("express"),
	router = express.Router(),
	passport = require("passport"),
	User = require("../models/user");

const loggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect("/login");
	}
};

router.get("/", function (req, res) {
	res.render("landing");
});

router.get("/register", function (req, res) {
	res.render("register");
});

router.post("/register", function (req, res) {
	User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
		if (err) {
			console.log(err);
			res.redirect("/register");
		} else {
			passport.authenticate("local")(req, res, function () {
				res.redirect("/feed");
			});
		}
	});
});

router.get("/login", function (req, res) {
	res.render("login");
});

router.post(
	"/login",
	passport.authenticate("local", { successRedirect: "/feed", failureRedirect: "/login" }),
	function (req, res) {}
);

router.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/feed");
});

module.exports = router;
