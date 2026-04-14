const { cmd, commands } = require('../command');
const axios = require('axios');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep , fetchJson } = require('../lib/functions');
const { tiktok, ytmp3_v2, fbdownload, ytmp4_v2, mediaFire, apkSearch, apkDownload, twitter, xvideosSearch, xvideosdl } = require("../lib/scraper");
const DY_SCRAP = require('@dark-yasiya/scrap');
const dy_scrap = new DY_SCRAP();
const getFBInfo = require("@xaviabot/fb-downloader");

/*const response = await axios.get('https://github.com/tharusha-md777/THARUZZ-DETABASE/blob/main/mainVar.json?raw=true');
const hiruxVar = response.data;

const hirux_footer = hiruxVar.mainFooter;
const hirux_image = hiruxVar.mainImg_Url;
const hirux_channelJid = hiruxVar.mainChannel_jid;
const hirux_newsletterName = hiruxVar.newsletterJidName;*/


const hirux_footer = "> *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*";
const hirux_image = "https://files.catbox.moe/88ec05.jpg=true";
const hirux_channelJid = "120363418953677198@newsletter";
const hirux_newsletterName = "𝗛𝗜𝗥𝗨 𝗫 𝗠𝗗 𝗩𝟭";

// ==== ====== FUNCTIONS ====== ====
function replaceYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

cmd(
    {
        pattern: "spotify",
        alias: ["spotifysearch", "spoti"],
        use: ".xhamster <xhamster video name>",
        react: "🎶",
        desc: "Search and download spotify songs.",
        category: "download",
        filename: __filename
    }, async (
        conn,
        mek,
        m, {
            from,
            q,
            reply
        }
    ) => {

	const react = async (msgKey, emoji) => {
    try {
      await conn.sendMessage(from, {
        react: {
          text: emoji,
          key: msgKey
        }
      });
    } catch (e) {
      console.error("Reaction error:", e.message);
    }
  };
		
        try {
            
            if (!q) {
                await reply("*Please enter xhamster video name !!*")
            };
            
            const spotifySearch = await fetchJson(`https://delirius-apiofc.vercel.app/search/spotify?q=${q}&limit=20`);
           
           if (!spotifySearch.data) {
               await reply(`This spotify song name no result found :)`)
           };
           
           let list = "*🎶 `𝙃𝙄𝙍𝙐 𝙓 𝙈𝘿 𝙎𝙋𝙊𝙏𝙄𝙁𝙔 𝙎𝙀𝘼𝙍𝘾𝙃 𝙍𝙀𝙎𝙐𝙇𝙏𝙎 🎶`*\n\n";
    spotifySearch.data.forEach((spoti, i) => {
      list += `*\`${i + 1}\` | | ${spoti.title || "No title info"}*\n`;
    });
    
    const listMsg = await conn.sendMessage(from, { text: list + "\n🔢 *ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ᴀ ɴᴜᴍʙᴇʀ ᴄʜᴏᴏꜱᴇ ᴀ ʀᴇᴀᴜʟᴛ.*\n\n" + hirux_footer }, { quoted: mek });
    const listMsgId = listMsg.key.id;
    
    conn.ev.on("messages.upsert", async (update) => {
        const msg = update?.messages?.[0];
        if (!msg?.message) return;

        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
        const isReplyToList = msg?.message?.extendedTextMessage?.contextInfo?.stanzaId === listMsgId;
        if (!isReplyToList) return;

        const index = parseInt(text.trim()) - 1;
        if (isNaN(index) || index < 0 || index >= spotifySearch.data.length) return reply("❌ *`ɪɴᴠᴀʟɪᴅ ɴᴜᴍʙᴇʀ ᴘʟᴇᴀꜱᴇ ᴇɴᴛᴇʀ ᴠᴀʟɪᴅ  ɴᴜᴍʙᴇʀ.`*");
        await react(msg.key, '✅');

        const chosen = spotifySearch.data[index];
        
        const spotifyDownloadApi = await fetchJson(`https://delirius-apiofc.vercel.app/download/spotifydl?url=${chosen.url}`);
      
        const askType = await conn.sendMessage(
            from,{
                image: {url: chosen.image || spotifyDownloadApi.data.image },
                caption: `*🎶 \`𝙎𝙋𝙊𝙏𝙄𝙁𝙄 𝙎𝙊𝙉𝙂 𝙄𝙉𝙁𝙊\`*\n\n` +
                `*☘️ \`Title:\` ${spotifyDownloadApi.data.title}*\n` + 
                `*⏰ \`Duration:\` ${spotifyDownloadApi.data.duration}*\n` +
                `*👤 \`Uploader:\` ${spotifyDownloadApi.data.author}*\n\n` +
                `*🔢 \`Reply below number:\`*\n\n` +
                `*1 | | 🎶 Download audio type*\n` +
                `*2 | | 📂 Download document type*\n` +
                `*3 | | 🎤 Download  voicecut type*\n\n` + hirux_footer
            }, { quoted:msg }
        );
        
        const typeMsgId = askType.key.id;
        
        conn.ev.on("messages.upsert", async (tUpdate) => {
            
            const tMsg = tUpdate?.messages?.[0];
            if (!tMsg?.message) return;

            const tText = tMsg.message?.conversation || tMsg.message?.extendedTextMessage?.text;
            const isReplyToType = tMsg?.message?.extendedTextMessage?.contextInfo?.stanzaId === typeMsgId;
            if (!isReplyToType) return;
       
            await react(tMsg.key, tText.trim() === "1" ? '🎥' : tText.trim() === "2" ? '📂' : tText.trim() === "3" ? '🎤' : '❓');
            
            if (tText.trim() === "1") {
                await conn.sendMessage(
                    from,
                    {
                      audio: { url: spotifyDownloadApi.data.url },
                      mimetype: "audio/mpeg",
                      contextInfo: {
                       mentionedJid: [m.sender],
                       forwardingScore: 999,
                       isForwarded: true,
                     forwardedNewsletterMessageInfo: {
                        newsletterJid: hirux_channelJid,
                        newsletterName: hirux_newsletterName,
                        serverMessageId: 143
                      }
                    }
                    }, {quoted: tMsg}
                )
            } else if (tText.trim() === "2") {
                await conn.sendMessage(
                    from, {
                        document: { url: spotifyDownloadApi?.data?.url },
                        fileName: `${spotifyDownloadApi?.data?.title}.mp4`,
                        caption: spotifyDownloadApi?.data?.title,
                        mimetype: "audio/mpeg",
                        contextInfo: {
                          mentionedJid: [m.sender],
                          forwardingScore: 999,
                          isForwarded: true,                         forwardedNewsletterMessageInfo: {
                              newsletterJid: hirux_channelJid,
                              newsletterName: hirux_newsletterName,
                              serverMessageId: 143
                            }
                        }
                    }, {quoted: tMsg}
                )
            } else if ( tText.trim() === "3" ) {
              await conn.sendMessage(
                    from,
                    {
                      audio: { url: spotifyDownloadApi.data.url },
                      mimetype: "audio/mpeg",
                      ptt: true,
                      contextInfo: {
                       mentionedJid: [m.sender],
                       forwardingScore: 999,
                       isForwarded: true,
                     forwardedNewsletterMessageInfo: {
                        newsletterJid: hirux_channelJid,
                        newsletterName: hirux_newsletterName,
                        serverMessageId: 143
                      }
                    }
                    }, {quoted: tMsg}
                )
            }else {
                await conn.sendMessage(from, { text: "❌ *`ɪɴᴠᴀʟɪᴅᴇ ɪɴᴘᴜᴛ`*" }, { quoted: tMsg });
            }
        });
    });
            
        } catch (e) {
            console.error(e);
            await reply("❌ Error: " + e);
        }
    });

cmd(
    {
        pattern: "gitrepodl",
        alias: ["githubrepodl", "githubrepodownload"],
        react: "️📥",
        desc: "*Download git hub repository.*",
        category: "download",
        use: ".githubrepodl < git hub repository link >",
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
        try{
            if (!q) return reply("*Please enter git hub repo link !!*");
            
            const gitrepodlApi = await fetchJson(`https://delirius-apiofc.vercel.app/download/gitclone?url=${q}`);
            
            await reply("*📥 Downloading repository . . .*");
            
            await conn.sendMessage(
                  from,{
                    document: { url: gitrepodlApi?.data?.download },
                    mimetype: "application/zip",
                    fileName: `${gitrepodlApi?.data?.full_name}.zip`,
                    caption: `*ʏᴏᴜʀ ɢɪᴛ ʜᴜʙ ʀᴇᴘᴏꜱɪᴛᴏʀʏ* 📂\n\n${hirux_footer}`
                  }, {  quoted: mek }
                );
        } catch (e) {
            console.log(e);
            await reply("❌ Error");
        }
    }
);

cmd(
  {
    pattern: "applemusic",
    use: ".applemusic",
    desc: "*Search and Download Apple music songs.*",
    react: "📥",
    category: "download",
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
    const react = async (msgKey, emoji) => {
     try {
     await conn.sendMessage(from, {
        react: {
          text: emoji,
          key: msgKey
        }
      });
     } catch (e) {
      console.error("Reaction error:", e.message);
    }
     };

    try {
      if (!q) {
        await reply("*Please enter apple music name !!*")
      }
      
      const appleSearch = fetchJson(`https://delirius-apiofc.vercel.app/search/applemusicv2?query=${q}`);
      
      if (!appleSearch?.data?.length === 0) {
        await reply("*No results found :)*")
      }
      
      let list = "🎧 *`𝘼𝙋𝙋𝙇𝙀 𝙈𝙐𝙎𝙄𝘾 𝙎𝙀𝙍𝘾𝙃 𝙍𝙀𝙎𝙐𝙇𝙏𝙎`*\n\n🔢 *`Reply below number:`*\n\n";
      appleSearch?.data.forEach((m, i) => {
      list += `${i + 1} | | *${m.title}*\n`;
      });
      
      const listMsg = await conn.sendMessage(from, { text: list + "\n\n${hirux_footer}"  }, { quoted: mek });
    const listMsgId = listMsg.key.id;
      
     conn.ev.on("messages.upsert", async (update) => {
       
       const msg = update?.messages?.[0];
      if (!msg?.message) return;

      const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
      const isReplyToList = msg?.message?.extendedTextMessage?.contextInfo?.stanzaId === listMsgId;
      if (!isReplyToList) return;

      const index = parseInt(text.trim()) - 1;
      if (isNaN(index) || index < 0 || index >= appleSearch?.data.length) return reply("*❌ Invalid number please enter valid number.*");
      await react(msg.key, '✅');

      const chosen = appleSearch?.data[index];
      
      const appleDownload = await fetchJson(`https://delirius-apiofc.vercel.app/download/applemusicdl?url=${chosen.url}`);
      
      const askType = await conn.sendMessage(
        from, {
          image: {url: chosen.image},
          caption: `🎧 *\`𝘼𝙋𝙋𝙇𝙀 𝙈𝙐𝙎𝙄𝘾 𝘿𝙀𝙏𝘼𝙄𝙇𝙎\`*\n\n` +
          `*☘️ \`Title:\` ${chosen.title}*\n` +
          `*👤 \`Artist:\` ${chosen.artist}*\n` +
          `*⏰ \`Duration:\` ${appleDownload?.data?.duration}*\n` +
          `*📎 \`Url:\` ${chosen.url}*\n\n`
          `🔢 *\`Reply below a number:\`*\n\n` +
          `*1 | | 🎧 Audio type*\n` +
          `*2 | | 📂 Document type*\n` +
          `*3 | | 🎤 Voice cut type(ptt)*\n\n` + hirux_footer
        }, {quoted: msg}
      );
      
      const typeMsgId = askType.key.id;
      
      conn.ev.on("messages.upsert", async (tUpdate) => {
        const tMsg = tUpdate?.messages?.[0];
        if (!tMsg?.message) return;

        const tText = tMsg.message?.conversation || tMsg.message?.extendedTextMessage?.text;
        const isReplyToType = tMsg?.message?.extendedTextMessage?.contextInfo?.stanzaId === typeMsgId;
        if (!isReplyToType) return;

       // const { title, duration, views, link } = chosen;
        await react(tMsg.key, tText.trim() === "1" ? '🎧' : tText.trim() === "2" ? '📂' : '🎤');
        
        if (tText.trim() === "1") {
          await conn.sendMessage(from, { audio: { url: appleDownload?.data?.download }, mimetype: "audio/mpeg" });
        } else if (tText.trim() === "2" ) {
          await conn.sendMessage(from, { document: { url: appleDownload?.data?.download }, mimetype: "audio/mpeg", fileName: `${chosen.title}.mp3`, caption: `*ᴀᴘᴘʟᴇ ꜱᴏɴɢ ᴅᴏᴄᴜᴍᴇɴᴛ ꜰɪʟᴇ* 📂\n\n${hirux_footer}` });
        } else if (tText.trim() === "3" ) {
          await conn.sendMessage(from, { audio: { url: appleDownload?.data?.download }, mimetype: "audio/mpeg", ptt: true });
        } else {
          await conn.sendMessage(from,{text: "*❌ Please enter valid number (1-3).*" });
        }
        
      });
       
     });
      
    } catch (e) {
      console.error(e);
      await reply("❌ Error: " + e)
    }
  }
);

cmd(
  {
    pattern: "pindl",
    alias: ["pinterest", "pinterestdl"],
    react: "📥",
    use: ".pindl <pinterest image or video url>",
    desc: "Download pinterest video and image.",
    category: "download",
    filename: __filename
  }, async (conn, mek, m,{from, reply, q}) => {
    try {
      
    if (!q) {
      await reply("*Please enter pinterest image or video url !!*");
    }
      
      const pinApi = await fetchJson(`https://delirius-apiofc.vercel.app/download/pinterestdl?url=${q}`);
      
      const mediaType = pinApi?.data?.download?.type;
      
    if (!pinApi?.data) {
      await reply("No results found this link :)")
    }
    
    if ( mediaType === "image" ) {
      await conn.sendMessage(
        from, {
          image: {url: pinApi?.data?.download?.download },
          caption: `🖼 *\`PINTEREST IMAGE DOWNLOAD\`*\n\n*┏━━━━━━━━━━━━━━━━━━━*\n*┃ ☘️ Title: ${pinApi?.data.title}*\n*┃ 🤍 Likes: ${pinApi?.data.likes}*\n*┃ 👤 Author: ${pinApi?.data.username}*\n*┃ 📅 Upload date: ${pinApi?.data.upload}*\n*┗━━━━━━━━━━━━━━━━━━━*\n\n${hirux_footer}`
        }, {quoted: mek}
      )
    };
    
    if ( mediaType === "video" ) {
      await conn.sendMessage(
        from, {
          video: {url: pinApi?.data?.download?.url },
          caption: `🎥 *\`PINTEREST VIDEO DOWNLOAD\`*\n\n*┏━━━━━━━━━━━━━━━━━━━*\n*┃ ☘️ Title: ${pinApi?.data.title}*\n*┃ 🤍 Likes: ${pinApi?.data.likes}*\n*┃ 👤 Author: ${pinApi?.data.username}*\n*┃ 📅 Upload date: ${pinApi?.data.upload}*\n*┗━━━━━━━━━━━━━━━━━━━*\n\n${hirux_footer}`
        }, {quoted: mek}
      )
    };
      
    } catch (e) {
      console.error(e);
      await reply("❌ Error: " + e);
    }
  }
);

cmd(
  {
    pattern: "apk",
    alias: ["playstore", "application", "app"],
    react: "📥",
    use: ".apk <playstore app name>",
    desc: "Search and Download playstore apps",
    category: "download",
    filename: __filename
  }, async (conn, mek, m,{from, reply, q}) => {
    const react = async (msgKey, emoji) => {
     try {
     await conn.sendMessage(from, {
        react: {
          text: emoji,
          key: msgKey
        }
      });
     } catch (e) {
      console.error("Reaction error:", e.message);
    }
     };
    
    try {
      if (!q) {
                await reply("*Please enter playstore app name !!*");
            }
      const response = await apkSearch(q);
      if(response?.length === 0) return await reply("*No result found :)*");
      
      let list = "📦 *`𝙋𝙇𝘼𝙔 𝙎𝙏𝙊𝙍𝙀 𝘼𝙋𝙆 𝙎𝙀𝘼𝙍𝘾𝙃 𝙍𝙀𝙎𝙐𝙇𝙏𝙎`*\n\n🔢 *`Reply below number:`*\n\n";
    response.forEach((v, i) => {
      list += `${i + 1} | | *${v.name}*\n`;
    });
    
    const listMsg = await conn.sendMessage(from, { text: list + "\n\n${hirux_footer}"  }, { quoted: mek });
    const listMsgId = listMsg.key.id;
    
    conn.ev.on("messages.upsert", async (update) => {
      const msg = update?.messages?.[0];
      if (!msg?.message) return;
      
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
      const isReplyToList = msg?.message?.extendedTextMessage?.contextInfo?.stanzaId === listMsgId;
      if (!isReplyToList) return;

      const index = parseInt(text.trim()) - 1;
      if (isNaN(index) || index < 0 || index >= response.length) return reply("❌ *Invalid number please enter valud number*");
      await react(msg.key, '✅');
    
    const chosen = response[index];
    
    const apkdl = await apkDownload(chosen.id);
    
    const infoCap = `📦 *\`𝙋𝙇𝘼𝙔𝙎??𝙊𝙍𝙀 𝘼𝙋𝙆 𝙎𝙀𝘼𝙍𝘾𝙃 𝙍𝙀𝙎𝙐𝙇𝙏𝙎\`*\n\n` +
            `*┏━━━━━━━━━━━━━━━━*\n` +
            `*┃ ☘️ \`App name:\` ${apkdl.name || "No app name"}*\n` +
            `*┃ 📦 \`Package:\` ${apkdl.package || "No data"}*\n` +
            `*┃ 📥 \`App size:\` ${apkdl.size}*\n` +
            `*┃ 📅 \`Last Update:\` ${apkdl.lastUpdate}*\n` +
            `*┗━━━━━━━━━━━━━━━━━━━*\n\n` + hirux_footer
            
      await conn.sendMessage(from,{image: {url: apkdl.image}, caption: infoCap}, {quoted: msg});
      
      const ulMessg = await conn.sendMessage(from, { text: "*📥 Downloading your application . . .*" });
      
      const dom = await conn.sendMessage(from, { document: { url: apkdl.dl_link }, mimetype: "application/vnd.android.package-archive", fileName: apkdl.name + '.apk', caption: `${apkdl.name}\n\n${hirux_footer}` }, { quoted: msg });
      
      await conn.sendMessage(from, { text : '*✅ Sucessfully download your application . . .*' , edit : ulMessg.key });
      
      await conn.sendMessage(from, { react: { text: '📦', key: dom.key } });
        
      await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });    
    
    });
                
    } catch (e) {
      console.error(e);
      await reply("❌ Error: " + e);
    }
  }
)

cmd(
        {
            pattern: "xhamsterdl",
            desc: "Xhamster video download.",
            category: "download",
            react: "🔞",
            use: ".xhamsterdl <xhamster video link>",
            filename: __filename
        }, async (
            conn,
            mek,
            m, {
                from,
                q,
                reply
            }
        ) => {
            try {
                if (!q) {
                    await reply("*Please enter xhamster video link !!*")
                };
                
                const xhamDownload = await fetchJson(`https://saviya-kolla-api.koyeb.app/download/xham?url=${q}`);
                
                const ulMessg = await conn.sendMessage(from, { text: "*📥 Downloading your video...*" });
                
                await conn.sendMessage(
                    from, {
                        video: {url: xhamDownload.videoUrl},
                        caption: `🔞 \`Here is your xhamster.\`\n\n*☘️ \`Title:\` ${xhamDownload.title || "No title info."}*\n\n${hirux_footer}`
                    }, { quoted:mek }
                );
                
                await conn.sendMessage(from, { text : '*✅ Sucessfully download your video...*' , edit : ulMessg.key })
                
            } catch (e) {
                console.error(e);
                await reply("❌ Error: " + e);
            }
        }
    );

cmd(
    {
        pattern: "xhamster",
        alias: ["xham", "xhamstardl"],
        use: ".xhamster <xhamster video name>",
        react: "🔞",
        desc: "Search and download xhamster 18+ videos.",
        category: "download",
        filename: __filename
    }, async (
        conn,
        mek,
        m, {
            from,
            q,
            reply
        }
    ) => {

	const react = async (msgKey, emoji) => {
    try {
      await conn.sendMessage(from, {
        react: {
          text: emoji,
          key: msgKey
        }
      });
    } catch (e) {
      console.error("Reaction error:", e.message);
    }
  };
		
        try {
            
            if (!q) {
                await reply("*Please enter xhamster video name !!*")
            };
            
            const xhamSearch = await fetchJson(`https://saviya-kolla-api.koyeb.app/search/xham?query=${q}`);
           
           if (!xhamSearch.result) {
               await reply(`This xhamster video name no result found :)`)
           };
           
           let list = "*🔞 `𝙃𝙄𝙍𝙐 𝙓 𝙈𝘿 𝙑1 𝙓𝙃𝘼𝙈𝙎𝙏𝙀𝙍 𝙎𝙀𝘼𝙍𝘾𝙃 𝙍𝙀𝙎𝙐𝙇𝙏𝙎.`*\n\n";
    xhamSearch.result.forEach((xham, i) => {
      list += `*\`${i + 1}\` | | ${xham.title || "No title info"}*\n`;
    });
    
    const listMsg = await conn.sendMessage(from, { text: list + "\n🔢 *ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ᴀ ɴᴜᴍʙᴇʀ ᴄʜᴏᴏꜱᴇ ᴀ ʀᴇᴀᴜʟᴛ.*\n\n" + hirux_footer }, { quoted: mek });
    const listMsgId = listMsg.key.id;
    
    conn.ev.on("messages.upsert", async (update) => {
        const msg = update?.messages?.[0];
        if (!msg?.message) return;

        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text;
        const isReplyToList = msg?.message?.extendedTextMessage?.contextInfo?.stanzaId === listMsgId;
        if (!isReplyToList) return;

        const index = parseInt(text.trim()) - 1;
        if (isNaN(index) || index < 0 || index >= xhamSearch.result.length) return reply("❌ *`ɪɴᴠᴀʟɪᴅ ɴᴜᴍʙᴇʀ ᴘʟᴇᴀꜱᴇ ᴇɴᴛᴇʀ ᴠᴀʟɪᴅ  ɴᴜᴍʙᴇʀ.`*");
        await react(msg.key, '✅');

        const chosen = xhamSearch.result[index];
        
        const xhamDownload = await fetchJson(`https://saviya-kolla-api.koyeb.app/download/xham?url=${chosen.url}`)
      
        const askType = await conn.sendMessage(
            from,{
                image: {url: chosen.thumb || hirux_image },
                caption: `*🔞 \`𝙓𝙃𝘼𝘼𝙈𝙎𝙏𝙀𝙍 𝙑𝙄𝘿𝙀𝙊 𝙄𝙉𝙁𝙊\`*\n\n` +
                `*☘️ \`Title:\` ${xhamDownload.title}*\n` + 
                `*⏰ \`Duration:\` ${xhamDownload.duration}*\n` +
                `*👤 \`Uploader:\` ${chosen.uploader}*\n\n` +
                `*🔢 \`Reply below number:\`*\n\n` +
                `*1 | | 🎥 Download video type*\n` +
                `*2 | | 📂 Download document type*\n\n` + hirux_footer
            }, { quoted:msg }
        );
        
        const typeMsgId = askType.key.id;
        
        conn.ev.on("messages.upsert", async (tUpdate) => {
            
            const tMsg = tUpdate?.messages?.[0];
            if (!tMsg?.message) return;

            const tText = tMsg.message?.conversation || tMsg.message?.extendedTextMessage?.text;
            const isReplyToType = tMsg?.message?.extendedTextMessage?.contextInfo?.stanzaId === typeMsgId;
            if (!isReplyToType) return;
       
            await react(tMsg.key, tText.trim() === "1" ? '🎥' : tText.trim() === "2" ? '📂' : '❓');
            
            if (tText.trim() === "1") {
                await conn.sendMessage(
                    from,
                    {
                      video: {url: xhamDownload.videoUrl },
                      caption: `*🔞 Here is your xhamster video.*\n\n> ${xhamDownload.title}`
                    }, {quoted: tMsg}
                )
            } else if (tText.trim() === "2") {
                await conn.sendMessage(
                    from, {
                        document: { url: xhamDownload.videoUrl },
                        fileName: `${xhamDownload.title}.mp4`,
                        caption: "*`ʜᴇʀᴇ ɪꜱ ᴛʜᴇ xhamster ᴅᴏᴄᴜᴍᴇɴᴛ ꜰɪʟᴇ ᴏꜰ ʏᴏᴜʀ ᴠɪᴅᴇᴏ.`* 📂\n\n> " + xhamDownload.title,
                        mimetype: "video/mp4"
                    }, {quoted: tMsg}
                )
            } else {
                await conn.sendMessage(from, { text: "❌ *`ɪɴᴠᴀʟɪᴅᴇ ɪɴᴘᴜᴛ. 1ꜰᴏʀ ᴠɪᴅᴇᴏ ᴛʏᴘᴇ / 2 ꜰᴏʀ ᴅᴏᴄᴜᴍᴇɴᴛ ᴛʏᴘᴇ`*" }, { quoted: tMsg });
            }
        });
    });
            
            
        } catch (e) {
            console.error(e);
            await reply("❌ Error: " + e);
        }
    });

cmd (
  {
    pattern: "instagram",
    alias: ["igdl","insta","instagramdl"],
    use: '.igdl <instagram video link>',
    desc: "download instagram video.",
    category: "download",
    react:"📥",
    filename: __filename
  }, async (
    conn,
    mek,
    m, {
      from,
      q,
      reply
    }
  ) => {
    try {
      
      if (!q) {
        await reply("*Please enter instagram video link :)*")
      };
      
      const response_Insta = await fetchJson(`https://api.siputzx.my.id/api/d/igdl?url=` + q);
      
      if (!response_Insta.data) {
        await reply("*❌ No video found.*")
      }
      
      await conn.sendMessage(
        from, {
          video: {url: response_Insta.data.url},
          caption: `*📥 Here is your instagram video.*\n\n${hirux_footer}`
        }, {quoted: mek}
      );
      
    } catch (e) {
      console.error(e);
      await reply("❌ Error: " + e);
    }
  });

cmd(
  {
    pattern: "tiktok",
    alias: ["ttdl","tiktokdownload", "tt"],
    use: '.tiktok < Tik tok video link >',
    desc: "download tik tok videos.",
    category: "download",
    react:"📥",
    filename: __filename
  }, async (
    conn,
    mek,
    m, {
      from,
      q,
      reply
    }
  ) => {
    try {
      
      if (!q) {
        reply("*Please enter tik tok video url !!*");
      }
      
      const response = await dy_scrap.tiktok(q);
      if (!response?.status) {
        await reply("*❌ No video found*")
      }
      const { id, region, title, cover, duration, play, sd, hd, music, play_count, digg_count, comment_count, share_count, download_count, collect_count } = response?.result;

	      
	      const videodetails = `*🎥 \`𝙃𝙄𝙍𝙐 𝙓 𝙈𝘿 𝙏𝙄𝙆 𝙏𝙊𝙆 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙀𝙍\`*\n\n` +
  `*┏━━━━━━━━━━━━━━━*\n` +
  `*┃ ☘️ \`ᴛɪᴛʟᴇ:\`* ${title || "N/A"}\n` +
  `*┃ ⏰ \`ᴅᴜʀᴀᴛɪᴏɴ:\` ${duration || "N/A"}*\n` +
  `*┃ 👀 \`ᴠɪᴇᴡꜱ:\` ${play_count || "N/A"}*\n` +
  `*┃ 🤍 \`ʟɪᴋᴇꜱ:\` ${digg_count || "N/A"}*\n` +
  `*┃ 📎 \`ᴜʀʟ:\` ~${q || "No info"}~*\n` +
  `*┗━━━━━━━━━━━━━━━━━━*\n\n` +
  `🔽 *\`ᴘʟᴇᴀꜱᴇ ʀᴇᴘʟʏ ʙᴇʟʟᴏᴡ ɴᴜᴍʙᴇʀ:\`*\n\n` +
  `*❲1❳ \`𝙑𝙄𝘿𝙀𝙊 𝙏𝙔𝙋𝙀\` 🎥*\n` +
  `*\`1.1\` | | 🎫 ᴡɪᴛʜ ᴡᴀᴛᴇʀᴍᴀʀᴋ*\n` +
  `*\`1.2\` | | 🎟️ ᴡɪᴛʜᴏᴜᴛ ᴡᴀᴛᴇʀᴍᴀʀᴋ️*\n\n` +
  `*❲2❳ \`𝘼𝙐𝘿𝙄𝙊 𝙏𝙔𝙋𝙀\` 🎧*\n` +
  `*\`2.1\` | | 🎶 ᴀᴜᴅɪᴏ ꜰɪʟᴇ*\n` +
  `*\`2.2\` | | 🗃️ ᴅᴏᴄᴜᴍᴇɴᴛ ꜰɪʟᴇ*\n` +
  `*\`2.3\` | | 🎤 ᴠᴏɪᴄᴇ ᴄᴜᴛ [ptt]*\n\n` + hirux_footer;
        
        const videomsg = await conn.sendMessage(
          from,{
            image: { url: cover },
            caption: videodetails
          }, { quoted: mek }
        );
        
        conn.ev.on("messages.upsert", async (msgUpdate) => {
          
          const mp4msg = msgUpdate.messages[0];
                if (!mp4msg.message || !mp4msg.message.extendedTextMessage) return;

                const selectedOption = mp4msg.message.extendedTextMessage.text.trim();
                
          if (
            mp4msg.message.extendedTextMessage.contextInfo &&
            mp4msg.message.extendedTextMessage.contextInfo.stanzaId === videomsg.key.id
          ) {
            await conn.sendMessage(from, { react: { text: "📥", key: mp4msg.key } });
            
           switch (selectedOption) {
             case "1.1":
	             await conn.sendMessage(from, { video: { url: sd }, caption: `*🤍Here is your with water mark tik tok video.*\n\n☘️ \`ᴛɪᴛʟᴇ:\` ${title || "N/A"}\n\n${hirux_footer}` }, { quoted: mp4msg });
              break;
              
              case "1.2":
	             await conn.sendMessage(from, { video: { url: hd }, caption: `*🤍Here is your with out water mark tik tok video.*\n\n☘️ \`ᴛɪᴛʟᴇ:\` ${title || "N/A"}\n\n${hirux_footer}` }, { quoted: mp4msg });
              break;
  
  // AUDIO PATH
              case '2.1':
                await conn.sendMessage(from, { audio: { url: sd }, mimetype: "audio/mpeg" }, { quoted: mp4msg });   
                break;
                
                case '2.2':
                await conn.sendMessage(from, { document: { url: sd }, mimetype: "audio/mpeg", fileName: `${title || 'No title video'}.mp3`, caption: `*Here is your tik tok video audio document file 📂*\n\n${hirux_footer}` }, { quoted: mp4msg });
                break;
                
                case '2.3':
                await conn.sendMessage(from, { audio: { url: sd }, mimetype: 'audio/mp4', ptt: true }, { quoted: mp4msg });
                break;
                  
                 default:
                  await conn.sendMessage(from,{text: "*❌ Please enter valid number.*" }, { quoted: mp4msg });
           }
          }    
        })
        
    } catch (e) {
      console.error(e);
      reply("*❌ Error*")
    }
  });

cmd(
  {
    pattern: "facebook",
    alias: ["fb","fbdl"],
    use: '.fb < Facebook video link >',
    desc: "download facebook videos.",
    category: "download",
    react:"📥",
    filename: __filename
  }, async (
    conn,
    mek,
    m, {
      from,
      q,
      reply
    }
  ) => {
    try {
      
      if (!q) {
        reply("*Please enter facebook video url !!*");
      }
      
      const fbResult = await getFBInfo(q);
      
	      
	      const videodetails = `*🎥 \`𝙃𝙄𝙍𝙐 𝙓 𝙈𝘿 𝙁𝘼𝘾𝙀𝘽𝙊𝙊𝙆 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙀𝙍\`*\n\n` +
  `*┏━━━━━━━━━━━━━━━*\n` +
  `*┃ ☘️ \`ᴛɪᴛʟᴇ:\` ${fbResult.title || "No info"}*\n` +
  `*┃ 📎 \`ᴜʀʟ:\` ~${q || "No info"}~*\n` +
  `*┗━━━━━━━━━━━━━━━━━━*\n\n` +
  `🔽 *\`ᴘʟᴇᴀꜱᴇ ʀᴇᴘʟʏ ʙᴇʟʟᴏᴡ ɴᴜᴍʙᴇʀ:\`*\n\n` +
  `*❲1❳ \`𝙑𝙄𝘿𝙀𝙊 𝙏𝙔𝙋𝙀\` 🎥*\n` +
  `*1.1 \`| |\` 🪫 ꜱᴅ Qᴜᴀʟɪᴛʏ*\n` +
  `*1.2 \`| |\` 🔋 ʜᴅ Qᴜᴀʟɪᴛʏ*\n\n` +
  `*❲2❳ \`𝘼𝙐𝘿𝙄𝙊 𝙏𝙔𝙋𝙀\` 🎧*\n` +
  `*2.1 \`| |\` 🎶 ᴀᴜᴅɪᴏ ꜰɪʟᴇ*\n` +
  `*2.2 \`| |\` 🗃️ ᴅᴏᴄᴜᴍᴇɴᴛ ꜰɪʟᴇ*\n` +
  `*2.3 \`| |\` 🎤 ᴠᴏɪᴄᴇ ᴄᴜᴛ [ptt]*\n\n` + hirux_footer;
        
        const videomsg = await conn.sendMessage(
          from,{
            image: { url: fbResult.thumbnail },
            caption: videodetails
          }, { quoted: mek }
        );
        
        conn.ev.on("messages.upsert", async (msgUpdate) => {
          
          const mp4msg = msgUpdate.messages[0];
                if (!mp4msg.message || !mp4msg.message.extendedTextMessage) return;

                const selectedOption = mp4msg.message.extendedTextMessage.text.trim();
                
          if (
            mp4msg.message.extendedTextMessage.contextInfo &&
            mp4msg.message.extendedTextMessage.contextInfo.stanzaId === videomsg.key.id
          ) {
            await conn.sendMessage(from, { react: { text: "📥", key: mp4msg.key } });
            
           switch (selectedOption) {
             case "1.1":
	             await conn.sendMessage(from, { video: { url: fbResult.sd }, caption: `${fbResult.title || "No info"}\n\n${hirux_footer}` }, { quoted: mp4msg });
              break;
              
              case "1.2":
	             await conn.sendMessage(from, { video: { url: fbResult.hd }, caption: `${fbResult.title || "N/A"}\n\n${hirux_footer}` }, { quoted: mp4msg });
              break;
  
  // AUDIO PATH
              case '2.1':
                await conn.sendMessage(from, { audio: { url: fbResult.sd }, mimetype: "audio/mpeg" }, { quoted: mp4msg });   
                break;
                
                case '2.2':
                await conn.sendMessage(from, { document: { url: fbResult.sd }, mimetype: "audio/mpeg", fileName: `${fbResult.title || 'No title video'}.mp3`, caption: `*Here is your facebook video audio document file 📂*\n\n> ${hirux_footer}` }, { quoted: mp4msg });
                break;
                
                case '2.3':
                await conn.sendMessage(from, { audio: { url: fbResult.sd }, mimetype: 'audio/mp4', ptt: true }, { quoted: mp4msg });
                break;
                  
                 default:
                  await conn.sendMessage(from,{text: "*❌ Please enter valid number.*" }, { quoted: mp4msg });
           }
          }    
        })
        
    } catch (e) {
      console.error(e);
      reply("*❌ Error*")
    }
  });

cmd(
  {
    pattern: "video",
    alias: ["ytmp4","ytvideo"],
    use: '.video ලෙලෙනා',
    desc: "Search and download yt videos.",
    category: "download",
    react:"🎥",
    filename: __filename
  }, async (
    conn,
    mek,
    m, {
      from,
      q,
      reply
    }
  ) => {
    try {
      
    /*  if (!q) {
        reply("*Please enter you tube video name or url !!*");
      }*/
      
      let id = q.startsWith("https://") ? replaceYouTubeID(q) : null;
    
      if (!id) {
            const searchResults = await dy_scrap.ytsearch(q);
            if (!searchResults?.results?.length) return await reply("*Please enter you tube video name or url !!*");
            id = searchResults.results[0].videoId;
        }
        
        const data = await dy_scrap.ytsearch(`https://youtube.com/watch?v=${id}`);
        if (!data?.results?.length) return await reply("*No result found :)*");

        const { url, title, image, timestamp, ago, views, author } = data.results[0];
        
       /* const result = await ytmp3_v2(url);
	      const downloadUrl = result?.result?.download;*/
	      
	      const videodetails = `*🎧 \`𝙃𝙄𝙍𝙐 𝙓 𝙈𝘿 𝙑𝙄𝘿𝙀𝙊 𝘿𝙊𝙒𝙉𝙇𝙊𝘿𝙀𝙍\`*\n\n` +
  `*┏━━━━━━━━━━━━━━━*\n` +
  `*┃ ☘️ \`ᴛɪᴛʟᴇ:\` ${title || "No info"}*\n` +
  `*┃ ⏰ \`ᴅᴜʀᴀᴛɪᴏɴ:\` ${timestamp || "No info"}*\n` +
  `*┃ 📅 \`ʀᴇʟᴇᴀꜱᴇ ᴅᴀᴛᴇ:\` ${ago || "No info"}*\n` +
  `*┃ 👀 \`ᴠɪᴇᴡꜱ:\` ${views || "No info"}*\n` +
  `*┃ 👤 \`ᴀᴜᴛʜᴏʀ:\` ${author || "No info"}*\n` +
  `*┃ 📎 \`ᴜʀʟ:\` ~${url || "No info"}~*\n` +
  `*┗━━━━━━━━━━━━━━━━━━*\n\n` +
  `🔽 *\`ᴘʟᴇᴀꜱᴇ ʀᴇᴘʟʏ ʙᴇʟʟᴏᴡ ɴᴜᴍʙᴇʀ:\`*\n\n` +
  `*❲1❳ \`𝙑𝙄𝘿𝙀𝙊 𝙏𝙔𝙋𝙀\` 🎥*\n` +
  `*1.1 \`| |\` ᴠɪᴅᴇᴏ ᴛʏᴘᴇ (144ᴘ) 🎥*\n` +
  `*1.2 \`| |\` ᴠɪᴅᴇᴏ ᴛʏᴘᴇ (360ᴘ) 🎥*\n` +
  `*1.3 \`| |\` ᴠɪᴅᴇᴏ ᴛʏᴘᴇ (480ᴘ) 🎥*\n` +
  `*1.4 \`| |\` ᴠɪᴅᴇᴏ ᴛʏᴘᴇ (720ᴘ) 🎥*\n` +
  `*1.5 \`| |\` ᴠɪᴅᴇᴏ ᴛʏᴘᴇ (1080ᴘ) 🎥*\n\n` +
  `*❲2❳ \`𝘿𝙊𝘾 𝙏𝙔𝙋𝙀\` 📂*\n` +
  `*2.1 \`| |\` ᴅᴏᴄᴜᴍᴇɴᴛ ᴛʏᴘᴇ (144ᴘ) 📂*\n` +
  `*2.2 \`| |\` ᴅᴏᴄᴜᴍᴇɴᴛ ᴛʏᴘᴇ (360ᴘ) 📂*\n` +
  `*2.3 \`| |\` ᴅᴏᴄᴜᴍᴇɴᴛ ᴛʏᴘᴇ (480ᴘ) 📂*\n` +
  `*2.4 \`| |\` ᴅᴏᴄᴜᴍᴇɴᴛ ᴛʏᴘᴇ (720ᴘ) 📂*\n` +
  `*2.5 \`| |\` ᴅᴏᴄᴜᴍᴇɴᴛ ᴛʏᴘᴇ (1080ᴘ) 📂*\n\n` + hirux_footer;
        
        const videomsg = await conn.sendMessage(
          from,{
            image: { url: image },
            caption: videodetails
          }, { quoted: mek }
        );
        
        conn.ev.on("messages.upsert", async (msgUpdate) => {
          
          const mp4msg = msgUpdate.messages[0];
                if (!mp4msg.message || !mp4msg.message.extendedTextMessage) return;

                const selectedOption = mp4msg.message.extendedTextMessage.text.trim();
                
          if (
            mp4msg.message.extendedTextMessage.contextInfo &&
            mp4msg.message.extendedTextMessage.contextInfo.stanzaId === videomsg.key.id
          ) {
            await conn.sendMessage(from, { react: { text: "📥", key: mp4msg.key } });
            
           switch (selectedOption) {
             case "1.1":
               const qualityv144 = '144';
               const resultv144 = await ytmp4_v2(url, qualityv144);
	             const downloadUrlv144 = resultv144?.download?.url;
	             
	             await conn.sendMessage(from, { video: { url: downloadUrlv144 }, caption: `${resultv144?.result?.title || 'N/A'}\n\n${hirux_footer}` }, { quoted: mp4msg });
              break;
              
              case "1.2":
               const qualityv360 = '360';
               const resultv360 = await ytmp4_v2(url, qualityv360);
	             const downloadUrlv360 = resultv360?.download?.url;
	             
	             await conn.sendMessage(from, { video: { url: downloadUrlv360 }, caption: `${resultv360?.result?.title || 'N/A'}\n\n${hirux_footer}` }, { quoted: mp4msg });
              break;
              
              case "1.3":
               const qualityv480 = '480';
               const resultv480 = await ytmp4_v2(url, qualityv480);
	             const downloadUrlv480 = resultv480?.download?.url;
	             
	             await conn.sendMessage(from, { video: { url: downloadUrlv480 }, caption: `${resultv480?.result?.title || 'N/A'}\n\n${hirux_footer}` }, { quoted: mp4msg });
              break;
              
              case "1.4":
               const qualityv720 = '720';
               const resultv720 = await ytmp4_v2(url, qualityv720);
	             const downloadUrlv720 = resultv720?.download?.url;
	             
	             await conn.sendMessage(from, { video: { url: downloadUrlv720 }, caption: `${resultv720?.result?.title || 'N/A'}\n\n${hirux_footer}` }, { quoted: mp4msg });
              break;
              
              case "1.5":
               const qualityv1080 = '1080';
               const resultv1080 = await ytmp4_v2(url, qualityv1080);
	             const downloadUrlv1080 = resultv1080?.download?.url;
	             
	             await conn.sendMessage(from, { video: { url: downloadUrlv1080 }, caption: `${resultv1080?.result?.title || 'N/A'}\n\n${hirux_footer}` }, { quoted: mp4msg });
              break;
  
  // DOCUMENT PATH
              
              case '2.1':
                const qualityd144 = '144';
                const resultd144 = await ytmp4_v2(url, qualityd144);
	              const downloadUrld144 = resultd144?.download?.url;
	              
	              await conn.sendMessage(from, { document: { url: downloadUrld144 }, fileName: `${resultd144?.result?.title || 'N/A'}.mp4`, mimetype: "video/mp4", caption: `${result?.result?.title || 'N/A'}\n\n${hirux_footer}` }, { quoted: mp4msg });
                break;
                
                case '2.2':
                const qualityd360 = '360';
                const resultd360 = await ytmp4_v2(url, qualityd360);
	              const downloadUrld360 = resultd360?.download?.url;
	              
	              await conn.sendMessage(from, { document: { url: downloadUrld360 }, fileName: `${resultd360?.result?.title || 'N/A'}.mp4`, mimetype: "video/mp4", caption: `${result?.result?.title || 'N/A'}\n\n${hirux_footer}` }, { quoted: mp4msg });
                break;
                
                case '2.3':
                const qualityd480 = '480';
                const resultd480 = await ytmp4_v2(url, qualityd480);
	              const downloadUrld480 = resultd480?.download?.url;
	              
	              await conn.sendMessage(from, { document: { url: downloadUrld480 }, fileName: `${resultd480?.result?.title || 'N/A'}.mp4`, mimetype: "video/mp4", caption: `${result?.result?.title || 'N/A'}\n\n${hirux_footer}` }, { quoted: mp4msg });
                break;
                
                case '2.4':
                const qualityd720 = '720';
                const resultd720 = await ytmp4_v2(url, qualityd720);
	              const downloadUrld720 = resultd720?.download?.url;
	              
	              await conn.sendMessage(from, { document: { url: downloadUrld720 }, fileName: `${resultd720?.result?.title || 'N/A'}.mp4`, mimetype: "video/mp4", caption: `${result?.result?.title || 'N/A'}\n\n${hirux_footer}` }, { quoted: mp4msg });
                break;
                
                case '2.5':
                const qualityd1080 = '1080';
                const resultd1080 = await ytmp4_v2(url, qualityd1080);
	              const downloadUrld1080 = resultd1080?.download?.url;
	              
	              await conn.sendMessage(from, { document: { url: downloadUrld1080 }, fileName: `${resultd1080?.result?.title || 'N/A'}.mp4`, mimetype: "video/mp4", caption: `${result?.result?.title || 'N/A'}\n\n${hirux_footer}` }, { quoted: mp4msg });
                break;
                
                  
                  default:
                            await conn.sendMessage(from,{text: "*❌ Please enter valid number (1-3).*" }, { quoted: mp4msg });
           }
          }    
        })
        
    } catch (e) {
      console.error(e);
      reply("*❌ Error*")
    }
  });

cmd(
  {
    pattern: "song",
    alias: ["ytmp3","play","ytsong"],
    use: '.song ලෙලෙනා',
    desc: "Search and download yt songs.",
    category: "download",
    react:"🎵",
    filename: __filename
  }, async (
    conn,
    mek,
    m, {
      from,
      q,
      reply
    }
  ) => {
    try {
      
      let id = q.startsWith("https://") ? replaceYouTubeID(q) : null;
    
      if (!id) {
            const searchResults = await dy_scrap.ytsearch(q);
            if (!searchResults?.results?.length) return await reply("*📛 Please enter you tube song name or url.*");
            id = searchResults.results[0].videoId;
        }
        
        const data = await dy_scrap.ytsearch(`https://youtube.com/watch?v=${id}`);
        if (!data?.results?.length) return await reply("I couldn’t find anything 📛");

        const { url, title, image, timestamp, ago, views, author } = data.results[0];
        
        const result = await ytmp3_v2(url);
	      const downloadUrl = result?.result?.download;
	      
	      const songdetails = `*🎧 \`𝙃𝙄𝙍𝙐 𝙓 𝙈𝘿 𝙎𝙊𝙉𝙂 𝘿𝙊𝙒𝙉𝙇𝙊𝘿𝙀𝙍\`*\n\n` +
		  `*┏━━━━━━━━━━━━━━━*\n` +
	      `*┃ ☘️ \`ᴛɪᴛʟᴇ:\` ${title || "No info"}*\n` +
	      `*┃ ⏰ \`ᴅᴜʀᴀᴛɪᴏɴ:\` ${timestamp || "No info"}*\n` +
	      `*┃ 📅 \`ʀᴇʟᴇᴀꜱᴇ ᴅᴀᴛᴇ:\` ${ago || "No info"}*\n` +
	      `*┃ 👀 \`νɪᴇᴡꜱ:\` ${views || "No info"}*\n` +
	      `*┃ 👤 \`ᴀᴜᴛʜᴏʀ:\` ${author || "No info"}*\n` +
	      `*┃ 📎 \`ᴜʀʟ:\` ~${url || "No info"}~*\n` +
		  `*┗━━━━━━━━━━━━━━━━━━*\n\n` +
	      `🔽 *\`ᴘʟᴇᴀꜱᴇ ʀᴇᴘʟʏ ʙᴇʟʟᴏᴡ ɴᴜᴍʙᴇʀ:\`*\n\n` +
	      `*1 \`| |\` ᴀᴜᴅɪᴏ ᴛʏᴘᴇ 🎧*\n` +
	      `*2 \`| |\` ᴅᴏᴄᴜᴍᴇɴᴛ ᴛʏᴘᴇ 📂*\n` +
	      `*3 \`| |\` ᴠᴏɪᴄᴇ ɴᴏᴛᴇ 🎙️*\n\n` + hirux_footer;
        
        const songmsg = await conn.sendMessage(
          from,{
            image: { url: image || hirux_image },
            caption: songdetails
          }, { quoted: mek }
        );
        
        conn.ev.on("messages.upsert", async (msgUpdate) => {
          
          const mp3msg = msgUpdate.messages[0];
                if (!mp3msg.message || !mp3msg.message.extendedTextMessage) return;

                const selectedOption = mp3msg.message.extendedTextMessage.text.trim();
                
          if (
            mp3msg.message.extendedTextMessage.contextInfo &&
            mp3msg.message.extendedTextMessage.contextInfo.stanzaId === songmsg.key.id
          ) {
            await conn.sendMessage(from, { react: { text: "📥", key: mp3msg.key } });
            
           switch (selectedOption) {
             case "1": 
               
               await conn.sendMessage(
                 from,{
                   audio: { url: downloadUrl },
                   mimetype: "audio/mpeg",
                   contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: hirux_channelJid,
                        newsletterName: hirux_newsletterName,
                        serverMessageId: 143
                    }
                }
                 }, {  quoted: mp3msg }
               );
              break;
              
              case '2':
                await conn.sendMessage(
                  from,{
                    document: { url: downloadUrl },
                    mimetype: "audio/mpeg",
                    fileName: `${title}.mp3`,
                    caption: `* ʏᴏᴜʀ ʏᴛ ꜱᴏɴɢ ᴅᴏᴄᴜᴍᴇɴᴛ ꜰɪʟᴇ* 📂\n\n${hirux_footer}`,
                    contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: hirux_channelJid,
                        newsletterName: hirux_newsletterName,
                        serverMessageId: 143
                    }
                }
                  }, {  quoted: mp3msg }
                );
                break;
                
                case '3':
                  await conn.sendMessage(from, {
                    audio: { url: downloadUrl },
                    mimetype: "audio/mpeg",
                    ptt: true,
                    contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: hirux_channelJid,
                        newsletterName: hirux_newsletterName,
                        serverMessageId: 143
                    }
                }
                  }, { quoted: mp3msg });
                  break;
                  
                  default:
                            await conn.sendMessage(from,{text: "*❌ Please enter valid number (1-3).*" }, { quoted: mp3msg });
           }
          }    
        })
        
    } catch (e) {
      console.error(e);
      reply("*🎈 Error*")
    }
  });
