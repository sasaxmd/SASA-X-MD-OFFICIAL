const config = require('../settings')
const axios = require('axios');
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const fs = require('fs');
var imgmsg = "*Give me a anime name !*"
var descgs = "It gives details of given anime name."
var cants = "I cant find this anime."

//====================================================================================
cmd({
    pattern: "garl",
    alias: ["imgloli"],
    react: '😎',
    desc: "Download anime loli images.",
    category: "anime",
    use: '.loli',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let res = await axios.get('https://api.lolicon.app/setu/v2?num=1&r18=0&tag=lolicon')
let wm = `😎 Random Garl image

> *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*`
await conn.sendMessage(from, { image: { url: res.data.data[0].urls.original }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})

//=====================================================================
cmd({
    pattern: "waifu",
    alias: ["imgwaifu"],
    react: '💫',
    desc: "Download anime waifu images.",
    category: "anime",
    use: '.waifu',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.pics/sfw/waifu')
let wm = `🩵 Random Waifu image

> *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*`
await conn.sendMessage(from, { image: { url: res.data.url }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})

//================================================================
cmd({
    pattern: "neko",
    alias: ["imgneko"],
    react: '💫',
    desc: "Download anime neko images.",
    category: "anime",
    use: '.neko',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.pics/sfw/neko')
let wm = `🩷 Random neko image

> *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*`
await conn.sendMessage(from, { image: { url: res.data.url  }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})
  
//=====================================================================
cmd({
    pattern: "megumin",
    alias: ["imgmegumin"],
    react: '💕',
    desc: "Download anime megumin images.",
    category: "anime",
    use: '.megumin',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.pics/sfw/megumin')
let wm = `❤️‍🔥Random megumin image

> *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*`
await conn.sendMessage(from, { image: { url: res.data.url }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})

//================================================================
cmd({
    pattern: "maid",
    alias: ["imgmaid"],
    react: '💫',
    desc: "Download anime maid images.",
    category: "anime",
    use: '.maid',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.im/search/?included_tags=maid')
let wm = `😎 Random maid image

> *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*`
await conn.sendMessage(from, { image: { url: res.data.images[0].url  }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})

//=====================================================================
cmd({
    pattern: "awoo",
    alias: ["imgawoo"],
    react: '😎',
    desc: "Download anime awoo images.",
    category: "anime",
    use: '.awoo',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let res = await axios.get('https://api.waifu.pics/sfw/awoo')
let wm = `😎 Random awoo image

> *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*`
await conn.sendMessage(from, { image: { url: res.data.url }, caption: wm}, { quoted: mek })
} catch (e) {
reply(cants)
console.log(e)
}
})
// Anmiex
cmd({
    pattern: "animegirl",
    desc: "Fetch a random anime girl image.",
    category: "fun",
    react: "🧚🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '*𝘼𝙉𝙄𝙈𝙀 𝙂𝙄𝙍𝙇 𝙄𝙈𝘼𝙂𝙀* 🌸\n\n\n > *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});

cmd({
    pattern: "animegirl1",
    desc: "Fetch a random anime girl image.",
    category: "fun",
    react: "🧚🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '𝘼𝙉𝙄𝙈𝙀 𝙂𝙄𝙍𝙇 𝙄𝙈𝘼𝙂𝙀 🌸\n\n\n > *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});

cmd({
    pattern: "animegirl2",
    desc: "Fetch a random anime girl image.",
    category: "fun",
    react: "🧚🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '𝘼𝙉𝙄𝙈𝙀 𝙂𝙄𝙍𝙇 𝙄𝙈𝘼𝙂𝙀 🌸\n\n\n > *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});

cmd({
    pattern: "animegirl3",
    desc: "Fetch a random anime girl image.",
    category: "fun",
    react: "🧚🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '𝘼𝙉𝙄𝙈𝙀 𝙂𝙄𝙍𝙇 𝙄𝙈𝘼𝙂𝙀\n\n\n > *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});

cmd({
    pattern: "animegirl4",
    desc: "Fetch a random anime girl image.",
    category: "fun",
    react: "🧚🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '𝘼𝙉𝙄𝙈𝙀 𝙂𝙄𝙍𝙇 𝙄𝙈𝘼𝙂𝙀 🌸\n\n\n > *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});

cmd({
    pattern: "animegirl5",
    desc: "Fetch a random anime girl image.",
    category: "fun",
    react: "🧚🏻",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '𝘼𝙉𝙄𝙈𝙀 𝙂𝙄𝙍𝙇 𝙄𝙈𝘼𝙂𝙀\n\n\n > *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});


//==========anime=====

cmd({
    pattern: "anime",
    desc: "anime the bot",
    category: "main",
    react: "⛱️",
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let dec = `*𝙃𝙄𝙍𝙐 𝙓 𝙈𝘿 𝘼𝙉𝙄𝙈𝙀 𝙄𝙈𝘼𝙂𝙀𝙎*`
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/b26f27aa5daaada031b90.jpg`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/51b44e4b086667361061b.jpg`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/7d165d73f914985542537.jpg`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/3d9732d2657d2d72dc102.jpg`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/8daf7e432a646f3ebe7eb.jpg`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/7514b18ea89da924e7496.jpg`},caption:dec},{quoted:mek});
await conn.sendMessage(from,{image:{url: `https://telegra.ph/file/ce9cb5acd2cec7693d76b.jpg`},caption:dec},{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
});


cmd({
    pattern: "anime1",
    desc: "Animal image.",
    react: "🧚‍♀️",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/aD7t0Bc.jpg` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/PQO5wPN.jpg` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/5At1P4A.jpg` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/MjtH3Ha.jpg` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/QQW7VKy.jpg` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "anime2",
    desc: "Animal image.",
    react: "🧚‍♀️",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/0r1Bn88.jpg` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/2Xdpuov.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/0hx-3AP.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/q054x0_.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/4lyqRvd.jpg` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "anime3",
    desc: "Animal image.",
    react: "🧚‍♀️",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/gnpc_Lr.jpeg` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/P6X-ph6.jpg` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/~p5W9~k.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/7Apu5C9.jpg` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/OTRfON6.jpg` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "anime4",
    desc: "Animal image.",
    react: "🧚‍♀️",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/aGgUm80.jpg` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/i~RQhRD.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/94LH-aU.jpg` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/V8hvqfK.jpg` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirunhirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/lMiXE7j.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})


cmd({
    pattern: "anime5",
    desc: "Animal image.",
    react: "🧚‍♀️",
    category: "other",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/-ABlAvr.jpg` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/HNEg0-Q.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/3x~ovC6.jpg` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/brv-GJu.jpg` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

await conn.sendMessage(from,{image :{ url: `https://i.waifu.pics/FWE8ggD.png` },caption: '> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ hirun' },{quoted:mek});

}catch(e){
console.log(e)
reply(`${e}`)
}
})

cmd({
    pattern: "dog",
    desc: "Fetch a random dog image.",
    category: "fun",
    react: "🐶",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://dog.ceo/api/breeds/image/random`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.message }, caption: '> *© Powered By hirun> ' }, { quoted: mek });
    } catch (e) {
        console.log(e); // ❯❯ Powered by HIRU-X-MD 👑
        reply(`єяяσя ƒєт¢нιηg ∂σg ιмαgє: ${e.message}`);
    }
});



//-----------------------------------------------------=


cmd({
    pattern: "animegirl8",
    desc: "Fetch a random anime girl image.",
    category: "fun",
    react: "👧",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '👧 *Random Anime Girl Image* 👧\n > *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`*Error Fetching Anime Girl image*: ${e.message}`);
    }
});
//
cmd({
    pattern: "poke",
    category: "fun",
    use: '<quote|reply|tag>',
},
async(Void, citel) => {
    var bite = await fetchJson(`https://api.waifu.pics/sfw/poke`);
    const response = await axios.get(bite.url, {
        responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "utf-8");
    let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
    let gif = await GIFBufferToVideoBuffer(buffer);
    if (users) {
        let cap = `@${citel.sender.split("@")[0]} poked to @${users.split("@")[0]} `;
        Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [users, citel.sender], caption: cap }, { quoted: citel });
    } else {
        let cap = `@${citel.sender.split("@")[0]} poked to everyone. `;
        Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [citel.sender], caption: cap }, { quoted: citel });
    }
}
)
//-----------------------------------------------------------------------
cmd({
    pattern: "hug1",
    category: "fun",
    use: '<quote|reply|tag>',
},
async(Void, citel) => {
    var bite = await fetchJson(`https://api.waifu.pics/sfw/hug`);
    const response = await axios.get(bite.url, {
        responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "utf-8");
    let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
    let gif = await GIFBufferToVideoBuffer(buffer);
    if (users) {
        let cap = `@${citel.sender.split("@")[0]} hug to @${users.split("@")[0]} `;
        Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [users, citel.sender], caption: cap }, { quoted: citel });
    } else {
        let cap = `@${citel.sender.split("@")[0]} huged to everyone. `;
        Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [citel.sender], caption: cap }, { quoted: citel });
    }
}
)
//-----------------------------------------------------------------------
cmd({
    pattern: "hold1",
    category: "fun",
    use: '<quote|reply|tag>',
},
async(Void, citel) => {
    var bite = await fetchJson(`https://api.waifu.pics/sfw/handhold`);
    const response = await axios.get(bite.url, {
        responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "utf-8");
    let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
    let gif = await GIFBufferToVideoBuffer(buffer);
    if (users) {
        let cap = `@${citel.sender.split("@")[0]} hold hand of @${users.split("@")[0]} `;
        Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [users, citel.sender], caption: cap }, { quoted: citel });
    } else {
        let cap = `@${citel.sender.split("@")[0]} holed to everyone. `;
        Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [citel.sender], caption: cap }, { quoted: citel });
    }
}
) 
//-----------------------------------------------------------------------
cmd({
    pattern: "hifi1",
    category: "fun",
    use: '<quote|reply|tag>',
},
async(Void, citel) => {
    var bite = await fetchJson(`https://api.waifu.pics/sfw/highfive`);
    const response = await axios.get(bite.url, {
        responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "utf-8");
    let users = citel.mentionedJid ? citel.mentionedJid[0] : citel.msg.contextInfo.participant || false;
    let gif = await GIFBufferToVideoBuffer(buffer);
    if (users) {
        let cap = `@${citel.sender.split("@")[0]} highfive with @${users.split("@")[0]} `;
        Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [users, citel.sender], caption: cap }, { quoted: citel });
    } else {
        let cap = `@${citel.sender.split("@")[0]} highfived with everyone. `;
        Void.sendMessage(citel.chat, { video: gif, gifPlayback: true, mentions: [citel.sender], caption: cap }, { quoted: citel });
    }
}
)
//-----------------------------------------------------------------------
cmd({
pattern: "waifu1",
desc: "To get Waifu Random Pics",
category: "fun",
filename: __filename
},

async(Void, citel, text) => {

 let name1 = text.split("|")[0] || ''
let name2 = text.split("|")[1] || `1`
let cap = text.split("|")[1] ? '': '---Waifu Pics Here---'

for (let i = 0; i < name2; i++)
{
let response;
if(name1 == 'nsfw'){ response = await fetch("https://api.waifu.pics/nsfw/waifu");    }
else  { response = await fetch("https://api.waifu.pics/sfw/waifu");  }

const nekodds = await response.json();
let buttonMessages = {
image: { url: nekodds.url, },
caption: cap,
headerType: 1,
};
await Void.sendMessage(citel.chat, buttonMessages, { quoted: citel })
}

})
//-----------------------------------------------------------------------
cmd({
pattern: "naruto1",
desc: "To get Naruto Random Videos",
category: "fun",
filename: __filename
},
async(Void, citel,text) =>
{
let res=await axios.get("https://raw.githubusercontent.com/mask-sir/api.mask-ser/main/Naruto.json")
let url =  res.data.result[Math.floor(Math.random() * res.data.result.length)];
return await Void.sendMessage(citel.chat,{video :{url : url } , caption: Config.caption }, { quoted: citel })
})
//-----------------------------------------------------------------------
cmd({
pattern: "neko2",
category: "fun",
desc: "Sends a Neko Image in chat",
filename: __filename
},
async(Void, citel, text) => {
let name1 = text.split("|")[0] || ''
let name2 = text.split("|")[1] || `1`
let cap = text.split("|")[1] ? '': "Here we go😊!!!!"

for (let i = 0; i < name2; i++)
{
let response;
if(name1 == 'nsfw'){ response = await fetch("https://waifu.pics/api/nsfw/neko");    }
else  { response = await fetch("https://waifu.pics/api/sfw/neko");  }

const nekodds = await response.json();
let buttonMessages = {
image: { url: nekodds.url, },
caption: cap,
headerType: 1,
};
await Void.sendMessage(citel.chat, buttonMessages, { quoted: citel })
}

})
//-----------------------------------------------------------------------
cmd({
pattern: "foxgirl",
category: "fun",
desc: "Sends image of Fox Girl in current chat.",
filename: __filename
},
async(Void, citel, text) => 
{
let  waifuddfg = await axios.get(`https://nekos.life/api/v2/img/fox_girl`);
await Void.sendMessage(citel.chat, {image: { url: waifuddfg.data.url } }, { quoted: citel })
})
//-----------------------------------------------------------------------
cmd({
pattern: "animenews1",
category: "fun" ,
desc: "Sends Anime News in chat",
filename: __filename
},
async(Void, citel, text) => {
let qq = [
    "Anime News Today",
    "New Anime",
    "Uocoming Anime News",
    "New Anime Info",
    "Whats news in Anime",
    "Anime Series",
    "Manga News today",
    "Anime New News",
    "Anime News today",
];
let q1 = qq[Math.floor(Math.random() * qq.length)];
//&domains=techcrunch.com,animenewsnetwork.com,myanimelist.net,comingsoon.net,crunchyroll.com
let URL1 = `https://newsapi.org/v2/everything?q=${q1}&domains=techcrunch.com,animenewsnetwork.com,myanimelist.net,comingsoon.net,crunchyroll.com&language=en&sortby=publishedat&apikey=cd4116be09ef4a0caceedf21b6258460&pageSize=8`;
const response = await axios.get(URL1);
let result = await response;
result = result.data.articles;
result.map(async(r, idx) => {
    Void.sendMessage(
        citel.chat, {
            image: { url: r.urlToImage },
            caption: `*Title☘️:* ${r.title}\n\n*Content🌸:* ${r.content}\n*Author🤵:* ${r.author}\n*Source🍬:* ${r.source.name}\n*Created On🎀:* ${r.publishedAt}\n*More on🔥:* ${r.url}\n\n*Powered by ${tlang().title}*`,
        }, {
            quoted: citel,
        }

    );
});


}
)
//-----------------------------------------------------------------------
cmd({
pattern: "loli",
category: "fun",
filename: __filename,
desc: "Sends image of loli in current chat."
},
async(Void, citel, text) => {
waifud = await axios.get("https://waifu.pics/api/sfw/shinobu");
var wbutss = [{
buttonId: `${prefix}loli`,
buttonText: { displayText: `Next Loli🌸` },
type: 1,
}, ];

await Void.sendMessage(citel.chat, {image: { url: waifud.data.url }}, {quoted: citel})
}
)









