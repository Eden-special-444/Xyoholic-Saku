const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
	config: {
		name: "leave",
		version: "1.6",
		author: "NTKhang (customized by Saku)",
		category: "events"
	},

	onStart: async ({ threadsData, message, event, api }) => {
		try {
			if (event.logMessageType !== "log:unsubscribe") return;

			const { threadID } = event;
			const threadData = await threadsData.get(threadID);
			if (!threadData?.settings?.sendLeaveMessage) return;

			const { leftParticipantFbId } = event.logMessageData;
			if (leftParticipantFbId == api.getCurrentUserID()) return;

			// 🔥 Custom Bangla text
			const leaveText = "গ্রুপে থাকার যোগ্যতা নাই, তাই এখন গ্রুপের বাহিরে 😛";

			// 🔥 Direct MP4 (Catbox)
			const videoURL = "https://files.catbox.moe/a1ijhd.mp4";

			const cacheDir = path.join(__dirname, "cache");
			if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

			const videoPath = path.join(cacheDir, "leave.mp4");

			// Download video
			const res = await axios.get(videoURL, { responseType: "arraybuffer" });
			fs.writeFileSync(videoPath, res.data);

			// Send message
			await message.send({
				body: leaveText,
				attachment: fs.createReadStream(videoPath)
			});

		} catch (err) {
			console.error("❌ Leave event error:", err);
		}
	}
};
