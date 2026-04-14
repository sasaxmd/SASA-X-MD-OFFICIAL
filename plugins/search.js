const { cmd, commands } = require('../command');
const axios = require('axios');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');
const { tiktok, ytmp3_v2, fbdownload, ytmp4_v2, mediaFire, apkSearch, apkDownload, twitter, xvideosSearch, xvideosdl } = require("../lib/scraper");
const DY_SCRAP = require('@dark-yasiya/scrap');
const dy_scrap = new DY_SCRAP();
const getFBInfo = require("@xaviabot/fb-downloader");
const os = require("os");

const {
  proto,
  generateWAMessageFromContent,
  prepareWAMessageMedia,
} = require('@whiskeysockets/baileys');

const hirux_footer = "> *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*";
const hirux_image = "https://files.catbox.moe/88ec05.jpg?raw=true";
const hirux_channelJid = "120363418953677198@newsletter";
const hirux_newsletterName = "𝗛𝗜𝗥𝗨 𝗫 𝗠𝗗 𝗩𝟭";

// Command: tiktoksearch
cmd(
  {
    pattern: "tiktoksearch",
    alias: ["ttsearch","tts","ttspro"],
    react: "🔍",
    desc: "*Tik tok search and  download video.*",
    use: ".tiktoksearch <query>",
    category: "search",
    filename: __filename
  }, async (
    conn,
    mek,
    m, {
      from,
      reply,
      q
    }
  ) => {
    try {
      
       if (!q) return reply("*Please enter tik tok search name !!*");
      
     const ttSearchapi = await fetchJson(`https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${q}`);
     
     const resultsTharuzz = ttSearchapi?.meta;
     const ttResult = resultsTharuzz.slice(0, 5);
     
     if (!resultsTharuzz) return reply("*No results found ☹️*")
     
     const cards = [];
    for (const video of ttResult) {
      const preparedMedia = await prepareWAMessageMedia({ video: { url: video.hd } }, { upload: conn.waUploadToServer });
      const card = {
        header: proto.Message.InteractiveMessage.Header.create({
          ...preparedMedia,
          title: `*☘️ \`Title:\`* ${video.title}\n*⏰ \`Duration:\` ${video.duration}*\n*👀 \`Views:\` ${video.play}*\n*📎 \`Url:\` ${video.url}*\n\n${hirux_footer}`,
          gifPlayback: true,
          subtitle: "",
          hasMediaAttachment: false
        }),
        body: { text: '' },
        nativeFlowMessage: {}
      };
      cards.push(card);
    }

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { text: `*🔍 \`𝙃𝙄𝙍𝙐 𝙓 𝙈𝘿 𝙏𝙄𝙆 𝙏𝙊𝙆 𝙎𝙀𝘼𝙍𝘾𝙃\`*\n\n*☘️ Query: ${q}*` },
            carouselMessage: {
              cards,
              messageVersion: 1
            }
          }
        }
      }
    }, { quoted: mek });

    await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });

    } catch (e) {
      console.log(e);
      reply("❌ Error")
    }
  }
);

// Command: pinterestsearch
cmd({
  pattern: "pinterestsearch",
  alias: ["pinsearch", "searchpintereset"],
  react: "🏞️",
  desc: "Search and download pinterest images.",
  category: "search",
  use: ".pinsearch < pinterest name >",
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
    if (!q) {
      return await reply("*❌ Please enter a Pinterest images search name!*");
    }

    await reply("*🔍 Seaching pinterest images ...*");

    const pinterestApi = await fetchJson(`https://delirius-apiofc.vercel.app/search/pinterestv2?text=${encodeURIComponent(q)}`);

    if (!pinterestApi?.data || pinterestApi?.data.length === 0) {
      return await reply("*❌ No pinterest images found!*");
    }

    const images = pinterestApi?.data.slice(0, 10);

    for (const img of images) {
      await conn.sendMessage(from, {
        image: { url: img.image },
        caption: `*☘️ \`Title:\`* ${img.title}\n*💗 \`Likes:\` ${img.likes}*\n*📅 \`Uploaded date:\` ${img.created_at}*\n\n${hirux_footer}`,
      }, { quoted: mek });
    }
  } catch (e) {
    console.error("Error in pinterest command:", e);
    await reply(`❌ Failed to fetch pinteres: ${e.message}`);
  }
});

// Command: animaporn
cmd({
  pattern: "animaporn",
  alias: ["animapornvideo"],
  use: ".animaporn",
  desc: "Download anime porn videos.",
  category: "search",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    await reply("*🎥 Uploading anime porn videos...*");

    const animapornApi = await fetchJson(`https://apis.sandarux.sbs/api/animeporn/video`);
    
    if (!animapornApi?.results || animapornApi.results.length === 0) {
      return await reply("❌ No results found");
    }

    const videos = animapornApi.results.slice(0, 10);

    for (const vid of videos) {
      const mediaType = vid.type;
      const mediaUrl = vid.video_1 || vid.video_2;

      if (!mediaUrl) continue; // Skip if no valid media URL

      const messageOptions = {
        caption: `*\`☘️ Title:\`* ${vid.title}\n*\`📎 Url:\`* ${vid.link}\n\n${hirux_footer}`,
        quoted: mek
      };

      if (mediaType === "video/mp4") {
        await conn.sendMessage(from, { video: { url: mediaUrl }, ...messageOptions });
      } else if (mediaType === "image/jpeg") {
        await conn.sendMessage(from, { image: { url: mediaUrl }, ...messageOptions });
      }
    }
  } catch (e) {
    console.error("Error in animaporn command:", e);
    await reply(`❌ Failed to fetch videos: ${e.message}`);
  }
});

// Command: wallpaper
cmd({
  pattern: "wallpaper",
  alias: ["4kwallpaper", "wallpapers"],
  react: "🏞️",
  desc: "Search and download wallpapers.",
  category: "search",
  use: ".wallpaper <wallpaper name>",
  filename: __filename
}, async (conn, mek, m, { from, reply, q }) => {
  try {
    if (!q) {
      return await reply("*❌ Please enter a wallpaper name!*");
    }

    await reply("*🏞️ Uploading 4K wallpapers...*");

    const wallPaper = await fetchJson(`https://apis.sandarux.sbs/api/wallpaper/4KWallpaper?q=${encodeURIComponent(q)}`);

    if (!wallPaper?.result || wallPaper.result.length === 0) {
      return await reply("*❌ No wallpapers found!*");
    }

    const images = wallPaper.result.slice(0, 10);

    for (const img of images) {
      await conn.sendMessage(from, {
        image: { url: img.image },
        caption: `*\`☘️ Title:\`* ${img.title}\n\n${hirux_footer}`,
      }, { quoted: mek });
    }
  } catch (e) {
    console.error("Error in wallpaper command:", e);
    await reply(`❌ Failed to fetch wallpapers: ${e.message}`);
  }
});
