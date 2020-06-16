const mongoose = require("mongoose");

let socialfeedSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		username: String,
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
	created: { type: Date, default: Date.now },
});

let Socialfeed = mongoose.model("Socialfeed", socialfeedSchema);

module.exports = Socialfeed;
