const { isJidGroup } = require('@whiskeysockets/baileys');
const config = require('../settings');
const tharuzz_footer = "> *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*";
const tharuzz_image = "https://files.catbox.moe/88ec05.jpg";
const tharuzz_channelJid = "1120363418953677198@newsletter";
const tharuzz_newsletterName = "𝗛𝗜𝗥𝗨 𝗫 𝗠𝗗 𝗩𝟭";


const getContextInfo = (m) => {
    return {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: tharuzz_channelJid,
            newsletterName: tharuzz_newsletterName,
            serverMessageId: 143,
        },
    };
};

const ppUrls = [
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
];

const GroupEvents = async (conn, update) => {
    try {
        const isGroup = isJidGroup(update.id);
        if (!isGroup) return;

        const metadata = await conn.groupMetadata(update.id);
        const participants = update.participants;
        const desc = metadata.desc || "No Description";
        const groupMembersCount = metadata.participants.length;

        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(update.id, 'image');
        } catch {
            ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];
        }

        for (const num of participants) {
            const userName = num.split("@")[0];
            const timestamp = new Date().toLocaleString();

            if (update.action === "add" && config.WELCOME === "true") {
                const WelcomeText = `👋 𝙃𝙀𝙔 @${userName}!

*𝙒𝙀𝙇𝘾𝙊𝙈𝙀 𝙏𝙊 ${metadata.subject}* 🏡  
You’re member #${groupMembersCount} — glad you joined!  

🕒 *\`𝙅𝙊𝙄𝙉 𝙏𝙄𝙈𝙀:\`* ${timestamp}  
📌 *\`𝙂𝙍𝙊𝙐𝙋 𝘿𝙀𝙎𝘾𝙍𝙄𝙋𝙄𝙏𝙄𝙊𝙉:\`*  
${desc}

Make yourself at home and follow the rules to keep the vibe cool!  

${tharuzz_footer}`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: WelcomeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "remove" && config.WELCOME === "true") {
                const GoodbyeText = `😔 @${userName} 𝙃𝘼𝙎 𝙇𝙀𝙁𝙏 𝙏𝙃𝙀 𝙂𝙍𝙊𝙐𝙋.

🕒 *\`𝙇𝙀𝙁𝙏 𝙏𝙄𝙈𝙀:\`* ${timestamp}  
👥 *\`𝙍𝙀𝙈𝘼𝙄𝙉𝙄𝙉𝙂 𝙈𝙀𝙈𝘽𝙀𝙍𝙎:\`* ${groupMembersCount}  
*බැ නවතන්න යන්නම ඕනේ නම් යන්න*
👋 *𝙃𝙄𝙍𝙐 𝙓 𝙈𝘿 𝙑1 𝙎𝘼𝙔 𝙂𝙊𝙊𝘿 𝘽𝙔𝙀*

${tharuzz_footer}`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: GoodbyeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "demote" && config.ADMIN_EVENTS === "true") {
                const demoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `⚠️ *Admin Notice*

@${demoter} 𝙃𝘼𝙎 𝙍𝙀𝙈𝙊𝙑𝙀𝘿 @${userName} 𝙁𝙍𝙊𝙈 𝘼𝘿𝙈𝙄𝙉 🚫  

🕒 *\`𝙏𝙄𝙈𝙀:\`* ${timestamp}  
📢 *\`𝙂𝙍𝙊𝙐𝙋:\`* ${metadata.subject}

${tharuzz_footer}`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });

            } else if (update.action === "promote" && config.ADMIN_EVENTS === "true") {
                const promoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `🎉 *Admin Notice*

@${promoter} has promoted @${userName} to admin! 🛡️  

🕒 *\`𝙏𝙄𝙈𝙀:\`* ${timestamp}  
📢 *\`𝙂𝙍𝙊𝙐𝙋:\`* ${metadata.subject}  

Give a warm welcome to our new leader!

${tharuzz_footer}`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });
            }
        }
    } catch (err) {
        console.error('Group event error:', err);
    }
};

module.exports = GroupEvents;
