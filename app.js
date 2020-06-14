const comment = require("./models/comment");

const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	Socialfeed = require("./models/socialfeed"),
	seedDB = require("./seeds"),
	Comment = require("./models/comment"),
	User = require("./models/user"),
	feedRoutes = require("./routes/feed"),
	commentRoutes = require("./routes/comments"),
	indexRoutes = require("./routes/index");

// seedDB();
mongoose.connect("mongodb://localhost/feed", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(
	require("express-session")({
		secret: "meme",
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});
app.use("/feed", feedRoutes);
app.use("/feed/:id/comments", commentRoutes);
app.use(indexRoutes);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(8080 || process.env.PORT, function () {
	console.log("Server's running");
});
