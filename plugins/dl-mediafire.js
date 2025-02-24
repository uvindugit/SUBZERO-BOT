const axios = require('axios');
const { cmd } = require('../command');

cmd({
  pattern: 'mediafire',
  alias: ['mfire', 'mfdl'],
  react: '📥',
  desc: 'Download files from MediaFire links.',
  category: 'tools',
  use: '.mediafire <MediaFire URL>',
  filename: __filename
}, async (conn, mek, msg, { from, reply, args }) => {
  try {
    // Check if the user provided a MediaFire URL
    if (!args.length) {
      return reply('❌ Please provide a MediaFire URL!\nExample: `.mediafire https://www.mediafire.com/file/xyz/file.zip`');
    }

    const url = args[0];
    await reply('📥 Fetching file details from MediaFire...');

    // Fetch file details using the API
    const apiUrl = `https://api.nexoracle.com/downloader/media-fire?apikey=e276311658d835109c&url=${encodeURIComponent(url)}`;
    const { data } = await axios.get(apiUrl);

    // Check if the API returned valid data
    if (!data.result || data.status !== 200) {
      return reply('❌ Failed to fetch file details. Please check the URL and try again.');
    }

    const { name, size, date, mime, link } = data.result;

    // Prepare the response message
    const caption = `📂 *File Details*\n\n` +
                    `*📛 Name:* ${name}\n` +
                    `*📦 Size:* ${size}\n` +
                    `*📅 Date:* ${date}\n` +
                    `*📄 MIME Type:* ${mime}\n\n` +
                    `🔗 *Download Link:*\n${link}\n\n` +
                    `> © Powered by Subzero`;

    // Send the file details and download link
    await reply(caption);

  } catch (error) {
    console.error('MediaFire Error:', error);
    reply('❌ An error occurred while fetching the file details. Please try again later.');
  }
});
