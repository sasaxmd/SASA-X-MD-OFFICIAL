const { cmd, commands } = require('../command');
const os = require('os');
const { prepareWAMessageMedia, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

cmd({
  pattern: "allcommands",
  alias: ["allmenu", "commands"],
  react: "📜",
  desc: "Display full bot command list with categories",
  category: "main",
  use: '.allmenu',
  filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
  try {
    // Hostname Detect
    let hostname;
    if (os.hostname().length == 12) hostname = 'replit';
    else if (os.hostname().length == 36) hostname = 'heroku';
    else if (os.hostname().length == 8) hostname = 'koyeb';
    else hostname = os.hostname();

    const tharuzz_footer = "> *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*";
    const tharuzz_image = "https://files.catbox.moe/88ec05.jpg"; // <-- Replace with your banner or logo

    const category = q ? q.trim().toLowerCase() : "";
    const allCategories = [...new Set(commands.map(cmd => cmd.category).filter(c => !!c))];

    // 🔹 Build Menu Function
    function buildMenu(cat) {
      let menu = `*𝙃𝙄𝙍𝙐 𝙓 𝙈𝘿 𝘼𝙇𝙇 𝘾𝙊𝙈𝙈𝘼𝙉𝘿*\n\n*🪀 Category:* ${cat.toUpperCase()}\n\n`;
      let filtered = commands.filter(cmd => cmd.category === cat && !cmd.dontAddCommandList);

      if (filtered.length === 0) menu += "_No commands found._\n";
      else {
        filtered.forEach(c => {
          menu += `> • .${c.pattern}\n`;
        });
      }

      menu += `\n☘️ *Total:* ${filtered.length}\n\n${tharuzz_footer}`;
      return menu;
    }

    // 🔹 Prepare Card List
    const cards = [];
    const displayCats = category ? [category] : ["download", "group", "fun", "owner", "ai", "anime", "convert", "group", "other", "reaction", "main", "logo"]; // default 11 menus

    for (const cat of displayCats) {
      const menuText = buildMenu(cat);

      const preparedMedia = await prepareWAMessageMedia(
        { image: { url: tharuzz_image } },
        { upload: conn.waUploadToServer }
      );

      const card = {
        header: proto.Message.InteractiveMessage.Header.create({
          ...preparedMedia,
          title: `🧸 ${cat.toUpperCase()} Commands`,
          subtitle: "𝙃𝙄𝙍𝙐 𝙓 𝙈𝘿 𝘾𝙊𝙈𝙈𝘼𝙉𝘿 𝙇𝙄𝙎𝙏",
          hasMediaAttachment: true
        }),
        body: { text: menuText },
        nativeFlowMessage: {}
      };

      cards.push(card);
    }

    // 🔹 Build Carousel Message
    const msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: { text: "" },
              carouselMessage: {
                cards,
                messageVersion: 1
              }
            }
          }
        }
      },
      { quoted: m }
    );

    await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });

  } catch (e) {
    console.log("❌ Error in allcommands:", e);
    reply(`❌ Error in allcommands:\n${e.message}`);
  }
});