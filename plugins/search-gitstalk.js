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
  pattern: "gitstalk",
  alias: ["githubstalk", "ghstalk"],
  desc: "Get information about a GitHub user, including their profile picture, bio, and more.",
  category: "utility",
  use: ".gitstalk <username>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const username = args.join(" ");
    if (!username) {
      return reply("❌ Please provide a GitHub username. Example: `.gitstalk octocat`");
    }

    // Fetch GitHub user information from the API
    const response = await axios.get(`https://api.siputzx.my.id/api/stalk/github?user=${encodeURIComponent(username)}`);
    const { status, data } = response.data;

    if (!status || !data) {
      return reply("❌ No information found for the specified GitHub user. Please try again.");
    }

    const {
      username: ghUsername,
      nickname,
      bio,
      id,
      nodeId,
      profile_pic,
      url,
      type,
      admin,
      company,
      blog,
      location,
      email,
      public_repo,
      public_gists,
      followers,
      following,
      created_at,
      updated_at,
    } = data;

    // Format the GitHub user information message
    const gitstalkMessage = `
👤 *GitHub Username*: ${ghUsername}
📛 *Nickname*: ${nickname || "N/A"}
📝 *Bio*: ${bio || "N/A"}
🆔 *ID*: ${id}
🔗 *Node ID*: ${nodeId}
🌐 *Profile URL*: ${url}
👥 *Type*: ${type}
👑 *Admin*: ${admin ? "Yes" : "No"}
🏢 *Company*: ${company || "N/A"}
📖 *Blog*: ${blog || "N/A"}
📍 *Location*: ${location || "N/A"}
📧 *Email*: ${email || "N/A"}
📂 *Public Repos*: ${public_repo}
📜 *Public Gists*: ${public_gists}
👥 *Followers*: ${followers}
👣 *Following*: ${following}
📅 *Created At*: ${new Date(created_at).toLocaleString()}
🔄 *Updated At*: ${new Date(updated_at).toLocaleString()}
\n\n> © Mr Frank OFC
  `;

    // Send the GitHub user information message with the profile picture as an image attachment
    await conn.sendMessage(from, {
      image: { url: profile_pic }, // Attach the profile picture
      caption: gitstalkMessage, // Add the formatted message as caption
    });
  } catch (error) {
    console.error("Error fetching GitHub user information:", error);
    reply("❌ Unable to fetch GitHub user information. Please try again later.");
  }
});


//----- 

cmd({
    pattern: "githubstalk2",
    desc: "Fetch detailed GitHub user profile including profile picture.",
    category: "menu",
    react: "🖥️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide a GitHub username. ");
        }
        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `👤 *Username*: ${data.name || data.login}
🔗 *Github Url*:(${data.html_url})
📝 *Bio*: ${data.bio || 'Not available'}
🏙️ *Location*: ${data.location || 'Unknown'}
📊 *Public Repos*: ${data.public_repos}
👥 *Followers*: ${data.followers} | Following: ${data.following}
📅 *Created At*: ${new Date(data.created_at).toDateString()}
🔭 *Public Gists*: ${data.public_gists}

> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ Mʀ Fʀᴀɴᴋ`;
          const sentMsg = await conn.sendMessage(from,{image:{url: data.avatar_url },caption: userInfo },{quoted:mek })
    } catch (e) {
        console.log(e);
        reply(`error: ${e.response ? e.response.data.message : e.message}`);
    }
});


