const mongoose = require("mongoose"),
	Socialfeed = require("./models/socialfeed"),
	Comment = require("./models/comment");

let data = [
	{
		name: "Test",
		image: "https://cdn.drawception.com/images/panels/2012/7-27/D6zb24HZKz-4.png",
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	},
	{
		name: "Test",
		image: "https://cdn.drawception.com/images/panels/2012/7-27/D6zb24HZKz-4.png",
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	},
	{
		name: "Test",
		image: "https://cdn.drawception.com/images/panels/2012/7-27/D6zb24HZKz-4.png",
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	},
];
const seedDB = () => {
	Socialfeed.deleteMany({}, function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("deleted socialfeed");
			data.forEach((seed) => {
				Socialfeed.create(seed, function (err, data) {
					if (err) {
						console.log(err);
					} else {
						console.log("added data");
						Comment.create(
							{
								text: "A test comment",
								author: "Commenter",
							},
							function (err, comment) {
								if (err) {
									console.log(err);
								} else {
									data.comments.push(comment);
									data.save();
									console.log("created a comment");
								}
							}
						);
					}
				});
			});
		}
	});
};

module.exports = seedDB;
