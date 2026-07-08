const targetUsers = new Map();
const targetNames = new Map();
const ownerUID = ["100056185869483", "61591152295552", "61591152295552"];

const lines = [
  "- কারেন্ট লাগাইয়া তর মারে চুদি, খানকির পোলা…!🙂",
  "-  কিরে খানকির পোলা, তরে না করছি না বেশি লাফাইস না, একবারে ধইরা টান দিয়া তর মার সাওয়ার রগ ছিরা ফেলবো মাগির পোলা 🤬",
  "-  মহা আকাশে তুলে, তর মারে ৩৩৬° তাপমাত্রায় চুদি, এমন ভাবে চুদবো যাতে সাওয়া ছিরা কাল হয়ে যায়…!",
  "-  তর আম্মু কি, সাওয়ার রস তরে খাওয়ায়, আমার মনে হয় খাওয়ায় তরে, তাই তর মতো খানকির ছেলের জন্ম..!",
  "-৷ তর আম্মু রে তর বাপের গারে তুলে, ডিজে রিমিক্স লাগাইয়া চুদি নাটকির পোলা..!",
  "- তর আম্মুর ভোদায় কামর দিয়া দৌর দিমু, মাগির পোলা..!",
  "- তর আম্মুর বোদায় গন্ধ, হারপিক দিয়া ওয়াশ করতে বলিশ, নাহলে চুদে মজা পাই না..!",
  "- তর সামনে তর বোন রে, আহ আহ বলে চুদি, চুদা খাইয়া তর বোন চেবলা হইয়া যাবে..!",
  "- সাকিব তর বাপ লাগে, বাপের সাথে বেয়াদবি করস..?",
  "- মোবাইল যেটা ইউস করতাছস, এইটা দিয়া বারি দিয়া তর মার সাওয়ার হাড্ডি বেঙ্গে ফেলবো মাগির পোলা..!",
  "- তর মার সাওয়ার রস দিয়া, তরে রসমালাই বানাইয়া খাওয়ামো..!",
  "- তর বাপের ধন কাইট্টা তর মারে, তরে বিরিয়ানি করে খওয়ামো..!",
  "- তর আম্মুর কছি দুধ এ, এমন চাপ দিবো কুত্তার মতো বক বক করে কান্না করে দিবে..!",
  "- তর আম্মু রে বাজারে নিয়া নিলামে উটামো, এক সট ৩০০ টাকায় সেল দিব আমি..!",
  "- তর কচি বোন এর বোদায় গরম ডিম ডোকাইয়া পার দিমু, না ডুকলে পারমানবিক মিসাইল মারমো..!",
  "- বাবা খাইয়া তর মারে চুদি, চুদার তালে তালে তর বাপ নাচে..!",
  "- তর মা বোন ২ টা রে একসাথে, বিদেশি সান্ডার তেল লাগাইয়া চুদি..!",
  "- আগে তরে বলছি যে তর বাপ সাকিব রে কিছু বলবি না, এখন তর মারে চুদবো সামলা..!",
  "- তর বোন রে নিশি রাতে চুদি, কেউ যাতে না শুনে..!",
  "- তর বোন রে জিজ্ঞেস কর, বোন সাকিব কে..? পরে তর বোন এটা বলবে সাকিব আমার বোদা নষ্টকারী..!",
  "- খানকির পোলা, বেস্যা মাগির পোলা, বুসকি মাগির পোলা, কানা মাগির পোলা, নলা মাগির পোলা, চেবলা মাগির পোলা, সাকিব তর বাপ!",
  "- সাকিব তগো সবডির বাপ, তরা সব সাকিব এর কামলা সন্তান, তদের আম্মুর বোদার মালিক..!",
  "- মুকেস আম্বানির কাইল্লা মাগির পুলা..!",
  "- তর আম্মার ভোদায় ডেকে যাব দৌর দিয়া, নডির পুত..!",
  "- তর আম্মুর বোদায়, পারমানবিক বোম মারমো,যাতে তর মার বোদা ধংস হয়ে যায়..!",
  "- তর আম্মুর বোদায়, বিদেশি শিং মাছ চাষ করমো মাগির পোলা..!",
  "- ৩৯০° এন্গেল এ উড়ইয়া উড়াইয়া তর মারে চুদি..!",
  // ➕ আরো লাইন যোগ করতে পারেন
];

module.exports = {
  config: {
    name: "son",
    version: "2.7",
    author: "- SAKIB  ✈︎ 🐢",
    countDown: 5,
    role: 0,
    shortDescription: "Mention করলে boka দিবে",
    longDescription: "son on @user → ওই user কিছু বললে boka দিবে | off দিলে বন্ধ",
    category: "fun",
    guide: {
      en: "{pn} on @user\n{pn} off",
    }
  },

  onStart({ api, event, args }) {
    if (!ownerUID.includes(event.senderID)) {
      return api.sendMessage(
        "- কিরে নলা, এটা তর বাপ সাকিব এর কমান্ড..!😒",
        event.threadID,
        event.messageID
      );
    }

    const mentions = event.mentions || {};
    const subCmd = args[0];
    const threadID = event.threadID;

    if (subCmd === "on") {
      if (Object.keys(mentions).length === 0)
        return api.sendMessage("- সাকিব্বাই কোন খানকির পোলা রে চুদবো মেনশন করেন..!🫦", threadID, event.messageID);

      const targetID = Object.keys(mentions)[0];
      const targetName = mentions[targetID];

      targetUsers.set(threadID, targetID);
      targetNames.set(threadID, targetName);

      return api.sendMessage(
        `😒 - এই তর মারে চুদি , ${targetName} কেমন আঁছিস…?🙂🎀`,
        threadID,
        event.messageID
      );
    }

    if (subCmd === "off") {
      if (!targetUsers.has(threadID))
        return api.sendMessage("- সাকিব্বাই, আগে আপনার পোলা রে মেনশন দেন..!😤", threadID, event.messageID);

      const targetID = targetUsers.get(threadID);
      const nameFromMention = Object.keys(mentions).length > 0 ? mentions[Object.keys(mentions)[0]] : null;
      const targetName = nameFromMention || targetNames.get(threadID) || "targetUser";

      targetUsers.delete(threadID);
      targetNames.delete(threadID);

      return api.sendMessage(
        `- এহহহ সাকিব্বাই অফ করলেন কেন..? (${targetName}) ওরে চুদতে পারলাম না..!😪`,
        threadID,
        event.messageID
      );
    }

    return api.sendMessage("🐢 Use:\n- son on @user\n- son off", threadID, event.messageID);
  },

  onChat({ api, event }) {
    const threadID = event.threadID;
    const targetID = targetUsers.get(threadID);

    if (!targetID || String(event.senderID) !== String(targetID) || ownerUID.includes(event.senderID)) return;

    const line = lines[Math.floor(Math.random() * lines.length)];
    api.sendMessage(`🐢 ${line}`, threadID, event.messageID);
  }
};
