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


// SUBZERO PROPERTY 
// I KNEW U WOULD COME

const config = require('../config');
const { cmd, commands } = require('../command');
const axios = require("axios");

/*

cmd({
  pattern: 'tinyurl',
  alias: ['tiny', 'shorten', 'short', 'shorturl'],
  react: '🪤',
  desc: 'Shorten a URL using TinyURL or ShortURL.',
  category: 'main',
  filename: __filename
}, async (conn, mek, m, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!q) return reply('Please provide a URL to shorten.');

    await reply('> *Subzero Processing...*');

    let apiUrl = '';
    if (command === 'tiny' || command === 'tinyurl') {
      apiUrl = `https://api.davidcyriltech.my.id/tinyurl?url=${encodeURIComponent(q)}`;
    } else {
      apiUrl = `https://api.davidcyriltech.my.id/bitly?link=${encodeURIComponent(q)}`;
    }

    await reply('> *Shortening URL...*');

    const response = await fetchJson(apiUrl);
    const result = response.result;

    const caption = ` \`SUBZERO URL SHORTENER\` \n\n\n*Original Link:* ${q}\n\n*Shortened Link:* ${result}\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ғʀᴀɴᴋ`;

 // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://i.ibb.co/DR0k2XM/mrfrankofc.jpg` },  // Image URL
            caption: caption,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363304325601080@newsletter',
                    newsletterName: '『 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃 』',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in shortining URL:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
*/
/*
cmd({
  pattern: "tinyurl",
  alias: ["shorten", "shorturl"],
  desc: "Shorten a long URL using TinyURL.",
  category: "utility",
  use: ".tinyurl <long_url>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const longUrl = args[0];
    if (!longUrl) {
      return reply("❌ Please provide a valid URL. Example: `.tinyurl https://example.com/very-long-url`");
    }

    // Validate the URL
    if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
      return reply("❌ Invalid URL. Please include 'http://' or 'https://'.");
    }

    // Shorten the URL using TinyURL API
    const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
    const shortUrl = response.data;

    // Send the shortened URL
    reply(`🔗 *Shortened URL*:\n\n${shortUrl}`);
  } catch (error) {
    console.error("Error shortening URL:", error);
    reply("❌ Unable to shorten the URL. Please check the URL and try again.");
  }
});
*/


cmd({
  pattern: "tinyurl",
  alias: ["shorten", "shorturl", "tiny"],
  desc: "Shorten a long URL using TinyURL with an optional custom alias.",
  category: "utility",
  use: ".tinyurl <long_url>|<alias>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const input = args.join(" ");
    const [longUrl, alias] = input.split("|");

    if (!longUrl) {
      return reply("❌ Please provide a valid URL. Example: `.tinyurl https://example.com/very-long-url`");
    }

    // Validate the URL
    if (!longUrl.startsWith("http://") && !longUrl.startsWith("https://")) {
      return reply("❌ Invalid URL. Please include 'http://' or 'https://'.");
    }

    let shortUrl;

    if (alias) {
      // Check if the alias is already taken
      const aliasCheckUrl = `https://tinyurl.com/${alias}`;
      try {
        const aliasCheckResponse = await axios.head(aliasCheckUrl);
        if (aliasCheckResponse.status === 200) {
          return reply(`❌ The alias '${alias}' is already taken. Please choose another alias.`);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Alias is available, create the custom URL
          shortUrl = `https://tinyurl.com/${alias}`;
        } else {
          throw error;
        }
      }
    } else {
      // Shorten the URL using TinyURL API
      const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
      shortUrl = response.data;
    }

    // Create the caption for the status message
    const caption = `\`SUBZERO URL SHORTENER\`\n\n\n*Original Link:* ${longUrl}\n\n*Shortened Link:* ${shortUrl}\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ғʀᴀɴᴋ`;

    // Send the status message with an image
    await conn.sendMessage(from, {
      image: { url: `https://i.ibb.co/DR0k2XM/mrfrankofc.jpg` }, // Image URL
      caption: caption,
      contextInfo: {
        mentionedJid: [mek.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363304325601080@newsletter',
          newsletterName: '『 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃 』',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("Error shortening URL:", error);
    reply(`❌ An error occurred: ${error.message}`);
  }
});
