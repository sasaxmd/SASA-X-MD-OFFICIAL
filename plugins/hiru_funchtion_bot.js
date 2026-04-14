const fs = require('fs');
const path = require('path');
const config = require('../settings')
const {cmd , commands} = require('../command')
const axios = require('axios');
const THARUZZ_DB = 'https://github.com/tharusha-md777/THARUZZ-DETABASE/tree/main/auto';
// Replace this with your actual GitHub RAW JSON URL
const GITHUB_RAW_URL_AUTO_REPLY = 'https://github.com/tharusha-md777/THARUZZ-DETABASE/blob/main/auto/autoreply.json?raw=true';
const GITHUB_RAW_URL_AUTO_VOICE = 'https://github.com/tharusha-md777/THARUZZ-DETABASE/blob/main/auto/autovoice.json?raw=true';
const GITHUB_RAW_URL_AUTO_STICKER = 'https://github.com/tharusha-md777/THARUZZ-DETABASE/blob/main/auto/autosticker.json?raw=true';

// Auto voice
cmd({ on: "body" }, async (conn, m, msg, { from, body }) => {
  try {
    const res = await axios.get(GITHUB_RAW_URL_AUTO_VOICE);
    const voiceMap = res.data;

    for (const keyword in voiceMap) {
      if (body.toLowerCase() === keyword.toLowerCase()) {
        if (config.AUTO_VOICE === "true") {
          const audioUrl = voiceMap[keyword];

          // Ensure it's a .mp3 or .m4a file
          if (!audioUrl.endsWith(".mp3") && !audioUrl.endsWith(".m4a")) {
            return conn.sendMessage(from, { text: "Invalid audio format. Only .mp3 and .m4a supported." }, { quoted: m });
          }

          await conn.sendPresenceUpdate("recording", from);
          await conn.sendMessage(from, {
            audio: { url: audioUrl },
            mimetype: "audio/mpeg", // This works fine for .mp3 and .m4a
            ptt: true
          }, { quoted: m });
        }
      }
    }
  } catch (e) {
    console.error("AutoVoice error:", e);
    return conn.sendMessage(from, { text: "Error fetching voice: " + e.message }, { quoted: m });
  }
});

// Auto sticker
cmd({
  on: 'body'
}, async (conn, mek, m, { from, body }) => {
  try {
    const res = await axios.get(GITHUB_RAW_URL_AUTO_STICKER);
    const data = res.data;

    for (const keyword in data) {
      if (body.toLowerCase() === keyword.toLowerCase()) {
        if (config.AUTO_STICKER === 'true') {
          await conn.sendMessage(
            from,
            {
              sticker: { url: data[keyword] },
              package: '𝙃𝙄𝙍𝙐 𝙓 𝙈𝘿 𝙑1'
            },
            { quoted: mek }
          );
        }
      }
    }
  } catch (e) {
    console.error('AutoSticker error:', e);
  }
});

// Auto reply
cmd({
  on: "body"
},
async (conn, mek, m, { body }) => {
  try {
    const res = await axios.get(GITHUB_RAW_URL_AUTO_REPLY);
    const data = res.data;

    for (const text in data) {
      if (body.toLowerCase() === text.toLowerCase()) {
        if (config.AUTO_REPLY === 'true') {
          await m.reply(data[text]);
        }
        break;
      }
    }
  } catch (err) {
    console.error('Auto-reply fetch error:', err.message);
  }
});

// Composing (Auto Typing)
cmd({
    on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {
    if (config.AUTO_TYPING === 'true') {
        await conn.sendPresenceUpdate('composing', from); // send typing 
    }
});

//auto recording
cmd({
  on: "body"
},    
async (conn, mek, m, { from, body, isOwner }) => {       
 if (config.AUTO_RECORDING === 'true') {
                await conn.sendPresenceUpdate('recording', from);
            }
         } 
   );
