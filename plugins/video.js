const { cmd } = require('../command');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

cmd({
  pattern: "newvideo",
  desc: "Download a video using the provided API",
  category: "media",
  filename: __filename
}, async (conn, mek, m, { from, reply, quoted }) => {
  try {
    // Check if the message contains a URL
    const url = m.body.split(' ')[1] || (quoted ? quoted.text : '');

    if (!url) return reply('Please provide a valid URL.');

    // Call the API to download the video
    const apiUrl = `https://api.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl, { responseType: 'stream' });

    // Save the video to a temporary file
    const tempFilePath = path.join(__dirname, '../temp/video.mp4');
    const writer = fs.createWriteStream(tempFilePath);

    response.data.pipe(writer);

    writer.on('finish', async () => {
      // Send the video to the user
      await conn.sendMessage(from, { video: { url: tempFilePath }, caption: 'Here is your video!' }, { quoted: m });

      // Delete the temporary file
      fs.unlinkSync(tempFilePath);
    });

    writer.on('error', (err) => {
      console.error('Error writing video file:', err);
      reply('An error occurred while saving the video.');
    });
  } catch (err) {
    console.error('Video download error:', err);
    reply('An error occurred while downloading the video.');
  }
});
