const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const { getPrefix } = global.utils;

module.exports = {
  config: {
    name: "welcome",
    version: "2.0",
    author: "Saimx69x",
    category: "events"
  },

  onStart: async function ({ api, event, message }) {
    if (event.logMessageType !== "log:subscribe") return;

    const { threadID, logMessageData } = event;
    const { addedParticipants } = logMessageData;
    const hours = new Date().getHours();
    const prefix = getPrefix(threadID);
    const nickNameBot = global.GoatBot.config.nickNameBot;

    // Bot nick set function
    if (addedParticipants.some(user => user.userFbId === api.getCurrentUserID())) {
      if (nickNameBot) {
        try {
          await api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
        } catch (error) {
          console.error("❌ Error changing bot nickname:", error);
        }
      }
      // Return early when bot is added
      return;
    }

    // Original welcome code for new users
    const botID = api.getCurrentUserID();
    
    if (addedParticipants.some(u => u.userFbId === botID)) return;

    const threadInfo = await api.getThreadInfo(threadID);
    const groupName = threadInfo.threadName;
    const memberCount = threadInfo.participantIDs.length;

    for (const user of addedParticipants) {
      const userId = user.userFbId;
      const fullName = user.fullName;

      try {
        
        const timeStr = new Date().toLocaleString("en-BD", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit", minute: "2-digit", second: "2-digit",
          weekday: "long", year: "numeric", month: "2-digit", day: "2-digit",
          hour12: true,
        });

    
        const apiUrl = `https://xsaim8x-xxx-api.onrender.com/api/welcome?name=${encodeURIComponent(fullName)}&uid=${userId}&threadname=${encodeURIComponent(groupName)}&members=${memberCount}`;
        const tmp = path.join(__dirname, "..", "cache");
        await fs.ensureDir(tmp);
        const imagePath = path.join(tmp, `welcome_${userId}.png`);

        const response = await axios.get(apiUrl, { responseType: "arraybuffer" });
        fs.writeFileSync(imagePath, response.data);

        await api.sendMessage({
          body:
            `‎𝐇𝐞𝐥𝐥𝐨 ${fullName}\n` +
            `𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 ${groupName}\n` +
            `𝐘𝐨𝐮'𝐫𝐞 𝐭𝐡𝐞 ${memberCount} 𝐦𝐞𝐦𝐛𝐞𝐫 𝐨𝐧 𝐭𝐡𝐢𝐬 𝐠𝐫𝐨𝐮𝐩, 𝐓𝐡𝐢𝐬 𝐢𝐬 𝐚 𝐩𝐥𝐚𝐜𝐞 𝐰𝐡𝐞𝐫𝐞 𝐤𝐢𝐧𝐝𝐧𝐞𝐬𝐬 𝐢𝐬 𝐚𝐩𝐩𝐫𝐞𝐜𝐢𝐚𝐭𝐞𝐝, 𝐫𝐞𝐬𝐩𝐞𝐜𝐭 𝐢𝐬 𝐯𝐚𝐥𝐮𝐞𝐝, 𝐚𝐧𝐝 𝐟𝐫𝐢𝐞𝐧𝐝𝐬𝐡𝐢𝐩𝐬 𝐚𝐫𝐞 𝐦𝐚𝐝𝐞. 𝐅𝐞𝐞𝐥 𝐟𝐫𝐞𝐞 𝐭𝐨 𝐜𝐡𝐚𝐭, 𝐜𝐨𝐧𝐧𝐞𝐜𝐭, 𝐚𝐧𝐝 𝐛𝐞 𝐲𝐨𝐮𝐫𝐬𝐞𝐥𝐟 💗\n` +
            `━━━━━━━━━━━━━━━━\n` +
            `📅 ${timeStr}`,
          attachment: fs.createReadStream(imagePath),
          mentions: [{ tag: fullName, id: userId }]
        }, threadID);

        fs.unlinkSync(imagePath);

      } catch (err) {
        console.error("❌ Error sending welcome message:", err);
      }
    }
  }
};
