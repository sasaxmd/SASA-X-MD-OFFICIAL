const { cmd, commands } = require('../command');
const config = require('../settings');
const axios = require('axios');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep , fetchJson } = require('../lib/functions');

const hirux_footer = "> 𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝙑 1🤍💫";
const hirux_image = "https://files.catbox.moe/88ec05.jpg=true";
const hirux_channelJid = "120363418953677198@newsletter";
const hirux_newsletterName = "𝗛𝗜𝗥𝗨 𝗫 𝗠𝗗 𝗩𝟭";

cmd(
    {
        pattern: "cine",
        alias: ["cinesub", "cinesubz"],
        react: "️🎬",
        desc: "Search and Download cinesub movie.",
        category: "movie",
        use: ".cine < cinesubz movie name >",
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
        const cineApiKey = config.CINESUB_API_KEY;
      if (!cineApiKey) {
        return reply("⚠️ Please add your cine sub api key.");
      }
      
      if (!q) {
        return reply("*❌ Please enter provide a cinesub movie name to search.*")
      }
      
      const react = async (msgKey, emoji) => {
          try{
          await conn.sendMessage(from, { react: { text: emoji, key: msgKey } });
        } catch (e) {
          console.error("Reaction error:", e.message);
        }
      }
      
        try {
            
            const mvSresults = await fetchJson(`https://dark-yasiya-api-cine.vercel.app/api/cinesubz/search?q=${encodeURIComponent(q)}&apikey=test`);
            const mvDatas = mvSresults?.data?.data?.data;
            
            if (!mvDatas || mvDatas.length === 0) return reply("❌ *No results found.*");
            
            let list = "*🎬 \`𝙃𝙄𝙍𝙐 𝙓 𝙈𝘿 𝘾𝙄𝙉𝙀𝙎𝙐𝘽𝙕 𝙈𝙊𝙑𝙄𝙀 𝙎𝙀𝘼𝙍𝘾𝙃 𝙍𝙀𝙎𝙐𝙇𝙏𝙎\`*\n\n";
       mvDatas.forEach((m, i) => {
         const mvTitle = (m.title || 'No result').replace(/Sinhala Subtitles \| සිංහල උපසිරැසි සමඟ|Sinhala Subtitle \| සිංහල උපසිරැසි සමඟ/gi, '').trim()
         list += `*\`${i + 1}\` | | ${ mvTitle }*\n`;
       });
       
       const listMsg = await conn.sendMessage(from, { text: list + "🔢 *`ᴘʟᴇᴀꜱᴇ ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ᴀ ɴᴜᴍʙᴇʀ ᴄʜᴏᴏꜱᴇ ᴀ ʀᴇꜱᴜʟᴛ.`*\n\n" + hirux_footer}, { quoted: mek });
       const listMsgId = listMsg.key.id;
        
        const handler = async (update) => {
            
            const msg = update?.messages?.[0];
            if (!msg?.message) return;
         
            const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
       
            const isReplyToList = msg?.message?.extendedTextMessage?.contextInfo?.stanzaId === listMsgId;
       
            if (!isReplyToList) return;
      
            const index = parseInt(text.trim()) - 1;
      
            if (isNaN(index) || index < 0 || index >= mvDatas.length)
             return reply("❌ *`Invalid number.`*");

            await react(msg.key, '✅');
  
            const chosen = mvDatas[index];
            
            const mvInfomations = await fetchJson(`https://manojapi.infinityapi.org/api/v1/cinesubz-movie?url=${encodeURIComponent(chosen.link)}&apiKey=${cineApiKey}`);   
            
            const mvInfo = mvInfomations?.results;
            const mvDllinks = mvInfomations?.results?.dl_links;
      
            if (!mvDllinks || mvDllinks.length === 0)
             return reply("❌ *No download links found.*");
        
            let qualityList = "";
      mvDllinks.forEach((q, i) => {
        qualityList += `*\`${i + 1}\` | | ${q.quality} - ${q.size}*\n`;
      });
      
      const qualityType = await conn.sendMessage(from, {
        image: { url: mvInfo.thumb.url },
        caption: `
🎬 *\`Title:\`* ${mvInfo.title}
🌟 *\`Ratingd:\`* ${mvInfo.IMDb_Rating || 'N/A'}
👤 *\`Subtitle author:\`* ${ mvInfo.subtitle_author || 'N/A' }
📅 *\`Year:\`* ${mvInfo.release_date || 'N/A'}
🌎 *\`Country:\`* ${ mvInfo.country || 'N/A' }
🔗 *\`Link:\`* ${ chosen.link || 'N/A' }

🔽 *\`Reply with number to download movie:\`*

${qualityList}
${hirux_footer}`
      }, { quoted: msg });
      
    const typeMsgId = qualityType.key.id;
      
    const qualityHandler = async (tUpdate) => {
        
        const tMsg = tUpdate?.messages?.[0];
        if (!tMsg?.message) return;

      const tText = tMsg.message?.conversation || tMsg.message?.extendedTextMessage?.text;
      
      const isReplyToType = tMsg?.message?.extendedTextMessage?.contextInfo?.stanzaId === typeMsgId;
      
      if (!isReplyToType) return;
      
     const tIndex = parseInt(tText.trim()) - 1;
        if (isNaN(tIndex) || tIndex < 0 || tIndex >= mvDllinks.length)
          return reply("❌ *`Invalid number.`*");

      await react(tMsg.key, '✅'); 
      
      let downloadPageUrl = mvDllinks[tIndex].link;
      
      console.log("Fetching download link from:", downloadPageUrl);
      
      const hirux_URLdl = await fetchJson(`https://manojapi.infinityapi.org/api/v1/cinesubz-download?url=${encodeURIComponent(downloadPageUrl)}&apiKey=${cineApiKey}`);
      
      const dl_Path = hirux_URLdl.results;
      const dlcine_Link1 = hirux_URLdl.results.pix1;
      const dlcine_Link2 = hirux_URLdl.results.pix2;
      
      const upMsg = await conn.sendMessage(from, { text: "📥 *Downloading movie . . .*" });
      
      await conn.sendMessage(from, {
          document: { url: dlcine_Link1 || dlcine_Link2 },
          caption: `*🎬 ${dl_Path.name}*\n\n${hirux_footer}`,
          mimetype: 'video/mp4',
          fileName: `${dl_Path.name}.mp4`
        });
        
      await conn.sendMessage(from, { text : '*Successfully download movie* ✅' , edit : upMsg.key });  
      
      conn.ev.off("messages.upsert", qualityHandler);
      
    }  
      conn.ev.on("messages.upsert", qualityHandler);
      
        }
        
        conn.ev.on("messages.upsert", handler);
        
        } catch (e) {
            console.log(e)
            await reply("❌ Error: " + e)
        }
});
