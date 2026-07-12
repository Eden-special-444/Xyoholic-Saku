const axios = require("axios");
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
	config: {
		name: "marry",
		aliases: ["marryv4", "marryfour"],
		version: "1.0",
		author: "RAHAT ",
		countDown: 5,
		role: 0,
		shortDescription: "get a wife",
		longDescription: "mention your love❗",
		category: "love",
		guide: "{pn}"
	},

	onStart: async function ({ message, event }) {
		try {
			console.log("Body:", event.body);
			console.log("Mentions:", event.mentions);

			// Fix: Check if mentions exists and is an object
			const mentions = event.mentions || {};
			const mention = Object.keys(mentions);

			if (!mention.length) {
				return message.reply("Please mention someone❗");
			}

			const one = event.senderID;
			const two = mention[0];

			// Check if the mentioned ID is valid
			if (!two || two === one) {
				return message.reply("Please mention someone else ❗");
			}

			const ptth = await bal(one, two);

			return message.reply({
				body: "got married 😍",
				attachment: fs.createReadStream(ptth)
			});
		} catch (err) {
			console.log(err);
			return message.reply("❌ Error: " + err.message);
		}
	}
};

async function bal(one, two) {
	try {
		let avone = await jimp.read(
			`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`
		);
		avone.circle();

		let avtwo = await jimp.read(
			`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`
		);
		avtwo.circle();

		const pth = "marryv4.png";

		let img = await jimp.read(
			"https://i.postimg.cc/XN1TcH3L/tumblr-mm9nfpt7w-H1s490t5o1-1280.jpg"
		);

		img
			.resize(1024, 684)
			.composite(avone.resize(85, 85), 204, 160)
			.composite(avtwo.resize(80, 80), 315, 105);

		await img.writeAsync(pth);

		return pth;
	} catch (error) {
		console.error("Error in bal function:", error);
		throw error;
	}
}
