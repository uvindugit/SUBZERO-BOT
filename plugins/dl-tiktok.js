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
  pattern: "tiktokstalk",
  alias: ["ttstalk", "tiktokuser"],
  desc: "Get information about a TikTok user, including their profile picture, bio, and stats.",
  category: "utility",
  use: ".tiktokstalk <username>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const username = args.join(" ");
    if (!username) {
      return reply("❌ Please provide a TikTok username. Example: `.tiktokstalk mrbeast`");
    }

    // Fetch TikTok user information from the API
    const response = await axios.get(`https://api.siputzx.my.id/api/stalk/tiktok?username=${encodeURIComponent(username)}`);
    const { status, data } = response.data;

    if (!status || !data) {
      return reply("❌ No information found for the specified TikTok user. Please try again.");
    }

    const {
      user: {
        uniqueId,
        nickname,
        avatarLarger,
        signature,
        verified,
        bioLink,
        region,
        language,
        createTime,
      },
      stats: {
        followerCount,
        followingCount,
        heartCount,
        videoCount,
        diggCount,
      },
    } = data;

    // Format the TikTok user information message
    const tiktokMessage = `
👤 *TikTok Username*: @${uniqueId}
📛 *Nickname*: ${nickname}
📝 *Bio*: ${signature || "N/A"}
✅ *Verified*: ${verified ? "Yes" : "No"}
🌐 *Region*: ${region || "N/A"}
🗣️ *Language*: ${language || "N/A"}
🔗 *Bio Link*: ${bioLink?.link || "N/A"}
📅 *Account Created*: ${new Date(createTime * 1000).toLocaleString()}

📊 *Stats*:
👥 *Followers*: ${followerCount.toLocaleString()}
👣 *Following*: ${followingCount.toLocaleString()}
❤️ *Total Likes*: ${heartCount.toLocaleString()}
🎥 *Total Videos*: ${videoCount.toLocaleString()}
👍 *Total Diggs*: ${diggCount.toLocaleString()}
    `;

    // Send the TikTok user information message with the profile picture as an image attachment
    await conn.sendMessage(from, {
      image: { url: avatarLarger }, // Attach the profile picture
      caption: tiktokMessage, // Add the formatted message as caption
    });
  } catch (error) {
    console.error("Error fetching TikTok user information:", error);
    reply("❌ Unable to fetch TikTok user information. Please try again later.");
  }
});

   //&&&&&&&&;


cmd({
  pattern: "tiktokdl",
  alias: ["ttdl", "tiktokdownload"],
  desc: "Download a TikTok video by providing the video URL.",
  category: "utility",
  use: ".tiktokdl <tiktok_url>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const tiktokUrl = args.join(" ");
    if (!tiktokUrl) {
      return reply("❌ Please provide a TikTok video URL. Example: `.tiktokdl https://vt.tiktok.com/ZSjXNEnbC`");
    }

    // Fetch TikTok video download links from the API
    const response = await axios.get(`https://api.siputzx.my.id/api/tiktok?url=${encodeURIComponent(tiktokUrl)}`);
    const { status, data } = response.data;

    if (!status || !data || !data.urls || data.urls.length === 0) {
      return reply("❌ Unable to fetch the TikTok video. Please check the URL and try again.");
    }

    // Get the first video URL (usually the highest quality)
    const videoUrl = data.urls[0];

    // Send the TikTok video as an attachment
    await conn.sendMessage(from, {
      video: { url: videoUrl }, // Attach the video
      caption: "🎥 *TikTok Video Downloader*\n🔗 *Original URL*: " + tiktokUrl,
    });
  } catch (error) {
    console.error("Error downloading TikTok video:", error);
    reply("❌ Unable to download the TikTok video. Please try again later.");
  }
});
