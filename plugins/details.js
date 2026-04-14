const axios = require("axios");
const moment = require("moment-timezone");
const { cmd } = require("../command");

cmd({
    pattern: "details",
    desc: "*📋 Show full details (time, weather, city, greeting, etc.)*",
    category: "info",
    react: "📑",
    filename: __filename
},
async (conn, mek, m, { reply, sendMessage }) => {
    try {
        // 🔹 Location details
        const city = "Colombo";
        const country = "Sri Lanka";

        // 🔹 Get weather data
        const weatherApi = `https://wttr.in/${city}?format=%C+%t`;
        const { data: weather } = await axios.get(weatherApi);

        // 🔹 Time and date
        const now = moment().tz("Asia/Colombo");
        const date = now.format("YYYY-MM-DD");
        const time = now.format("hh:mm A");
        const day = now.format("dddd");

        // 🔹 Greeting based on time
        const hour = now.hour();
        let greeting = "🌙 Good Night";
        if (hour >= 5 && hour < 12) greeting = "🌅 Good Morning";
        else if (hour >= 12 && hour < 18) greeting = "☀️ Good Afternoon";
        else if (hour >= 18 && hour < 22) greeting = "🌆 Good Evening";

        // 🔹 Final styled message
        const message = `
*╭───❖ 『𝘿𝙀𝙏𝘼𝙄𝙇𝙎』❖────❖*
*│ 📅 Date:* ${date}
*│ 🕒 Time:* ${time}
*│ 📆 Day:* ${day}
*│ 🌦️ Weather:* ${weather}
*│ 🌍 Country:* ${country}
*│ 🏙️ City:* ${city}
*│ 💬 Greeting:* ${greeting}
*╰───────────────❖*

> *𝙃𝙄𝙍𝙐 - 𝙓 - 𝙈𝘿 - 𝘽𝙊𝙏*
`;

        // 🔹 Send image with description
        await conn.sendMessage(m.chat, {
            image: { url: "https://files.catbox.moe/88ec05.jpg" },
            caption: message.trim(),
        }, { quoted: m });

    } catch (err) {
        console.error(err);
        reply("⚠️ Error fetching details!");
    }
});
