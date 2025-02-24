/*

$$$$$$\            $$\                                               
$$  __$$\           $$ |                                              
$$ /  \__|$$\   $$\ $$$$$$$\  $$$$$$$$\  $$$$$$\   $$$$$$\   $$$$$$\  
\$$$$$$\  $$ |  $$ |$$  __$$\ \____$$  |$$  __$$\ $$  __$$\ $$  __$$\ 
 \____$$\ $$ |  $$ |$$ |  $$ |  $$$$ _/ $$$$$$$$ |$$ |  \__|$$ /  $$ |
$$\   $$ |$$ |  $$ |$$ |  $$ | $$  _/   $$   ____|$$ |      $$ |  $$ |
\$$$$$$  |\$$$$$$  |$$$$$$$  |$$$$$$$$\ \$$$$$$$\ $$ |      \$$$$$$  |
 \______/  \______/ \_______/ \________| \_______|\__|       \______/

Project Name : SubZero MD
Creator      : Darrell Mucheri ( Mr Frank OFC )
Repo         : https//github.com/mrfrank-ofc/SUBZERO-MD
Support      : wa.me/18062212660
*/





































































































































































































const config = require('../config');
const { cmd, commands } = require('../command');

const axios = require("axios");

cmd({
  pattern: "wiki",
  alias: ["wikipedia", "search"],
  desc: "Search for information on Wikipedia.",
  category: "utility",
  use: ".wiki <search_query>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const query = args.join(" ");
    if (!query) {
      return reply("❌ Please provide a search query. Example: `.wiki Albert Einstein`");
    }

    // Fetch Wikipedia summary
    const response = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    );

    const { title, extract, content_urls } = response.data;

    if (!extract) {
      return reply("❌ No results found. Please try a different query.");
    }

    // Format the Wikipedia summary
    const wikiMessage = `
📚 *Wikipedia Summary*: ${title}

${extract}

🔗 *Read More*: ${content_urls.desktop.page}
    `;

    reply(wikiMessage);
  } catch (error) {
    console.error("Error fetching Wikipedia data:", error);
    reply("❌ Unable to fetch Wikipedia data. Please try again later.");
  }
});

/*
const wiki = require('wikipedia');

// Define the Wikipedia search command
cmd({
    pattern: "wiki",
    desc: "Search Wikipedia for information",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Check if a query was provided
        if (!q) {
            return reply('Please provide a search query.');
        }

        // Fetch summary from Wikipedia
        const summary = await wiki.summary(q);
        
        // Format the reply
        let replyText = `
*📚 Wikipedia Summary 📚*

🔍 *Query*: _${q}_

💬 *Title*: _${summary.title}_

📝 *Summary*: _${summary.extract}_

🔗 *URL*: ${summary.content_urls.desktop.page}

> @ Powdered By SubZero `;

        // Send the reply with the thumbnail image
        await conn.sendMessage(from, { image: { url: summary.originalimage.source }, caption: replyText }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});
*/
