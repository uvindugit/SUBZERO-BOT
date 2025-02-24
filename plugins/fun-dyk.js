const config = require('../config');
const { cmd, commands } = require('../command');
const axios = require("axios");

cmd({
  pattern: "didyouknow",
  react: "❓",
  alias: ["dyk", "fact", "randomfact"],
  desc: "Get a random fun fact.",
  category: "utility",
  use: ".didyouknow",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply, react }) => {
  try {
    // Add a reaction to indicate the bot is processing the request
  //  await react("⏳"); // Hourglass emoji for processing

    // Fetch a random fact from the API
    const response = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");

    const { text } = response.data;

    // Format the fact message with emojis and footer
    const factMessage = `
🤔 *Did You Know?* 

${text}

─────────────────
> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ Sᴜʙᴢᴇʀᴏ
    `;

    // Send the formatted message
    await reply(factMessage);

    // Add a success reaction
  //  await react("✅"); // Checkmark emoji for success
  } catch (error) {
    console.error("Error fetching fact:", error);

    // Add an error reaction
 //   await react("❌"); // Cross mark emoji for failure

    // Send an error message
    reply("❌ Unable to fetch a fact. Please try again later.");
  }
});
