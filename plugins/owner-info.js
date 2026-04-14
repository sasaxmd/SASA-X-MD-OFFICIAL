const { cmd } = require('../command');
const config = require('../settings');


cmd({
    pattern: "owner",
    react: "🥷",
    desc: "Display full owner and team info with image",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from }) => {
    try {
        const caption = `
*◄●●━━𝗛𝗜𝗥𝗨 𝗫 𝗠𝗗 𝗩𝟭━━●●►*
*╭──────────●●►*
*│𝗢𝘄𝗻𝗲𝗿 𝗡𝗮𝗺𝗲 = 𝚆𝙳. 𝙷𝙸𝚁𝚄𝙽*
*│𝗢𝘄𝗻𝗲𝗿 𝗖𝗼𝘂𝗻𝘁𝗿𝘆 =* *𝚂𝚛𝚒 𝙻𝚊𝚗𝚔𝚊*
*│𝗢𝘄𝗻𝗲𝗿 𝗗𝗶𝘀𝘁𝗿𝗶𝗰 =* *𝚁𝚊𝚝𝚗𝚊𝚙𝚞𝚛𝚊*
*│𝗢𝘄𝗻𝗲𝗿 𝗦𝗰𝗵𝗼𝗼𝗹 = 𝚁.𝚁.𝚅*
*│𝗢𝘄𝗻𝗲𝗿 𝗝𝗼𝗯 = 𝚂𝚝𝚞𝚍𝚎𝚗𝚝*
*│𝗢𝘄𝗻𝗲𝗿 𝗔𝗴𝗲 =* *16*
*│𝗢𝘄𝗻𝗲𝗿 𝗚𝗿𝗮𝗱𝗲 =* *11*
*│𝗢𝘄𝗻𝗲𝗿 𝗡𝘂𝗺𝗯𝗲𝗿 = 0702529242*
*╰──────────●●►*
> *𝙄 𝘼𝙈 𝙃𝙄𝙍𝙐 𝙓 🥷☘️*`;

        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/88ec05.jpg' },
            caption: caption
        });

    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { text: `❌ Error: ${error.message}` });
    }
});

