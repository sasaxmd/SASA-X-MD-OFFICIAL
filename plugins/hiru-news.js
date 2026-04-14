const { cmd } = require("../command");
const { fetchJson } = require("../lib/functions");

cmd(
  {
    pattern: "hirunews",
    alias: ["hiru"],
    react: "🗞️",
    desc: "Get latest Hiru news.",
    category: "news",
    use: ".hiru",
    filename: __filename,
  },
  async (conn, mek, m, { from, reply }) => {
    try {
      const apiUrl = `https://tharuzz-news-api.vercel.app/api/news/hiru`;
      const hiruData = await fetchJson(apiUrl);

      if (!hiruData.datas || hiruData.datas.length === 0) {
        return reply("❌ පුවත් සොයාගත නොහැකි විය. API වෙතින් දත්ත ලැබුණේ නැත.");
      }

      // Get first news item
      const news = hiruData.datas[0];

      const caption = `
*🗞️ 𝙃𝙄𝙍𝙐 𝙉𝙀𝙒𝙎 🗞️*

*☘️ Title:* ${news.title || 'N/A'}
*📄 Description:* ${news.description || 'N/A'}
*🔗 Link:* ${news.link || 'N/A'}

> *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*
`;

      await conn.sendMessage(
        from,
        { image: { url: news.image }, caption },
        { quoted: mek }
      );
    } catch (e) {
      console.error("❌ Hiru news plugin error: ", e);
      return reply(`❌ Hiru news plugin එකේ දෝෂයක් ඇති විය: ${e.message}`);
    }
  }
);
