const fs = require("fs");
const path = __dirname + "/cache/war.json";

// এখানে তোমার ৩টা UID দাও
const ADMIN_UIDS = ["61591152295552", "100056185869483", "100056185869483"];

module.exports = {
  config: {
    name: "war",
    version: "1.2",
    author: "Sakib Ahmed",
    description: "Tag someone to war-mode and insult them automatically when they chat",
    category: "fun",
    usages: "[on/off @tag]",
    cooldowns: 5,
    role: 0,
  },

  onStart: async function({ api, event, args }) {
    const { threadID, messageID, mentions } = event;

    // শুধুমাত্র ADMIN_UIDS ইউজার চালাতে পারবে
    if (!ADMIN_UIDS.includes(event.senderID)) {
      return api.sendMessage(
        "- তুই কোন বাল, তর কথায় গালি দিব..!🙄",
        threadID,
        messageID
      );
    }

    if (!fs.existsSync(path)) fs.writeFileSync(path, "[]", "utf-8");
    let warList;
    try {
      warList = JSON.parse(fs.readFileSync(path, "utf-8"));
    } catch {
      warList = [];
    }

    if (!args.length) {
      return api.sendMessage(
        `⚠️ Usage:\n.war on @user - war মোড চালু করবে\n.war off @user - war মোড বন্ধ করবে`,
        threadID,
        messageID
      );
    }

    const command = args[0].toLowerCase();

    if (command !== "on" && command !== "off") {
      return api.sendMessage(
        `⚠️ Usage:\n.war on @user - war মোড চালু করবে\n.war off @user - war মোড বন্ধ করবে`,
        threadID,
        messageID
      );
    }

    if (!mentions || Object.keys(mentions).length === 0) {
      return api.sendMessage(
        `-  আবাল জাত এর গুষ্টি চুদি মেনশন দে..!🤬`,
        threadID,
        messageID
      );
    }

    const mentionID = Object.keys(mentions)[0];

    if (command === "on") {
      const exists = warList.some(
        e => e.threadID === threadID && e.userID === mentionID
      );

      if (exists) {
        return api.sendMessage(
          `😒 ${mentions[mentionID].replace("@", "")} ওরে আগেই এড করে রাখছি`,
          threadID,
          messageID
        );
      }

      warList.push({ threadID, userID: mentionID });
      fs.writeFileSync(path, JSON.stringify(warList, null, 2), "utf-8");

      return api.sendMessage(
        `⚔️ ${mentions[mentionID].replace("@", "")} ৩৯০° তাপমাত্রায় তর বউরে চুদি মেসেজ দে..!`,
        threadID,
        messageID
      );
    }

    if (command === "off") {
      const updatedList = warList.filter(
        e => !(e.threadID === threadID && e.userID === mentionID)
      );

      fs.writeFileSync(path, JSON.stringify(updatedList, null, 2), "utf-8");

      return api.sendMessage(
        `🥱 ${mentions[mentionID].replace("@", "")} যা খানকির পোলা মাফ করে দিলাম..!`,
        threadID,
        messageID
      );
    }
  },

  onChat: async function({ api, event }) {
    if (!event.isGroup) return;

    if (!fs.existsSync(path)) return;

    let warList;
    try {
      warList = JSON.parse(fs.readFileSync(path, "utf-8"));
    } catch {
      warList = [];
    }

    const isWar = warList.some(
      e => e.threadID === event.threadID && e.userID === event.senderID
    );

    if (!isWar) return;

    const insults = [
      "কিরে বস্তির পোলা অনির্দিষ্টকালের জন্য তোর বউয়ের ভোদায় আমার ধোন ঢুকিয়ে দিলাম 🫠🫂!",
      "তোর বউরে চকলেট কিনে দেওয়ার নাম করে বাজারের পিছে আরশি ভাবির দোকানে গিয়ে চুদবো!",
      "তোর বউয়ের ভোদা যেন রিকশার চাকা – সব প্যাসেঞ্জার যায় আসে!",
      "তুই এমন চুদনখোর, তোকে চুদে কুত্তা পর্যন্ত হাঁপায়!",
      "ধানমন্ডির বঙ্গবল্টুর বাসভবনের সব কয়টা পিলারে ওয়েল মেরে মেরে তোর গোয়া দিয়ে ঢুকিয়ে খুব জোরে জোরে চুদবো😋!",
      "তোর বউয়ের ভোদা এমন ঢিলা, ঢুকলে আওয়াজ হয় না!",
      "তোর বউয়ের বড় বড় দুধ টিপে টিপে রস বের করে খেজুরের রসের সঙ্গে বিক্রি করবো,মানুষ বলবে: ওই কিরে ওর বউয়ের দুধ দুধ 🤤!",
      "তোর বউয়ের গুদে গুগল ম্যাপও পথ খুঁজে পায় না!",
      "তুই এমন চোদান্দা, তোকে দেখলেই কুত্তারাও মাল ফেলতে চায়!",
      "তোর বউয়ের পেছনে পেছনে চুদি, আর তুই সামনে দাঁড়িয়ে হাত মারিস!",
      "মৌচাকে ঢিল মেরে তোর মার ভোদায় লুকিয়ে যাবো🫦🐝!",
      "তোর বউয়ের গুদে এত ট্রাফিক, পুলিশ পর্যন্ত লস্ট হয়!",
      "কস্মোলজিক্যালি তোর বৌকে চুদে তোর বৌর ভোদার ভেতরে নতুন ওয়ার্মহোল বানাইয়া স্ট্রেঞ্জার থিংস সিজন সিক্স বানাবো!",
      "আমি উড়ন্ত ঈগল পাখি হয়ে নিজের চঞ্চু তোর বৌয়ের ভোদায় ঢুকাইয়া গগনে তুইলা উড়তে উড়তে চুদি।!",
      "তুই এমন বেকার চুদি, মাল ফেলার আগেই ব্যাটারি শেষ!",
      "তোর বৌ যখন কুত্তার সাথে করছিল, তুই পাশেই হাত মারছিলি!",
      "তোর বৌকে এমন চুদেছি, ভোদা এখন বাইপাস রাস্তা!",
      "তোর বৌয়ের গুদে হারিকেন ঢুকিয়ে আলো জ্বালাই!",
      "তোর বৌর ভোদায় আমি বৈদ্যুতিক বাল্ব লাগাইয়া সেখানে বিদ্যুৎ প্রবাহ করাইয়া সেখানে বাল্বটা সেট কইরা তোর আম্মার ভোদা আলোকিত করব।!",
      "তুই সেই গুদ, যেটা চোদার পরেও ধোন কাঁদে!",
      "ভারত-মায়ানমারের ২ পাশে ২ পা রাইখা তোমারে বাংলাদেশের রাজধানী ঢাকা বরাবর রেখে পাশের জেলা কুমিল্লা থেকে সুজা বিচি বরাবর সজোরে কিক মারবো আর নিচে বড় বিল্ডিং তোমার পাছা দিয়ে ঢুকিয়ে দিব!",
      "তোর বৌ গুদ দেখিয়ে পয়সা খায়, আর তুই সেটার দালাল!",
      "তোর মায়ের দুধের দোকান খুলব, নাম হবে 'চুষতে আসো ইনকাম নাও'!",
      "ᡕᠵ᠊ᡃ່࡚ࠢ࠘⸝່ࠡ᠊߯ᡁࠣ࠘᠊᠊ࠢ࠘气亠ᡕᠵ᠊ᡃ່࡚ࠢ࠘⸝່ࠡ᠊߯ᡁࠣ࠘᠊᠊ࠢ࠘气亠 tor pukkir moddhe ak47 er 42+42=84 guli spray korum first 1 ta hit dilei moira jabi kpola chup ͏!",
      "২০০০ টাকার লোভ দেখিয়ে সেক্স হাসিনার ব্রা তোর বৌয়ের মুখে ঢুকিয়ে তোর বৌরে চুদি 😒!",
      "তোর বৌয়ের ভোদায় কয়মাসের খাবার নিয়ে ঢুকে পড়লে খুশি হবি বল?🤔🥀!",
      "কাজী নজরুল ইসলামের আদর্শ অনুসারে ও তার কবিতা পড়ে বিদ্রোহী মনোভাব নিয়ে প্রতিবাদী হয়ে তোমাকে উড়িয়ে ঘুরিয়ে নাচিয়ে চুদবো!",
      "তোমাকে নিয়ে একটি বিল্ডিং এর ছাদে গিয়ে কিছু টুকাই পোলাপাইন ভাড়া করে আনবো এবং টোকাই পোলাপানদের নোংরা ধন দিয়ে তোমার পুটকি ফাটিয়ে ফেলবো!",
      "আমি জেলে গিয়ে পুলিশকে বলবো তোকে উলঙ্গ করে চুদার দায়ে আমাকে ফাঁসি দিতে। এরপর মরে গিয়ে ভূত হয়ে আবার চুদবো!",
      "তোরে পর্ন দেখায় উত্তেজিত করে লেংটা করে রাস্তায় ছেড়ে দিবো যেন কুকুর এর সাথে সেক্স করস!",
      "If your whole family ever found out the kind of dumb-ass shit you're doing online, i swear they'd start avoiding you like you're some toxic virus and they wouldn't even want to hear your name for weeks.!"
    ];

    const insult = insults[Math.floor(Math.random() * insults.length)];

    // গালি রিপ্লাই হিসেবে পাঠাবে
    return api.sendMessage(insult, event.threadID, event.messageID);
  }
};
