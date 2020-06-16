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
	indexRoutes = require("./routes/index"),
	methodOverride = require("method-override"),
	connectFlash = require("connect-flash");

// seedDB();
let url = process.env.DATABASEURL || "mongodb://localhost/feed";
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(connectFlash());
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
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});
app.use("/feed", feedRoutes);
app.use("/feed/:id/comments", commentRoutes);
app.use(indexRoutes);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log("Server Has Started!");
});
