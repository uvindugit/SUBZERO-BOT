//  SUBZERO MD PROPERTY
// MADE BY MR FRANK
// REMOVE THIS IF YOU ARE GAY

const axios = require('axios');
const ytSearch = require('yt-search');
const config = require('../config');
const { cmd, commands } = require('../command');


//  SUBZERO MD PROPERTY
// MADE BY MR FRANK
// REMOVE THIS IF YOU ARE GAY


cmd({
  pattern: 'videonew',
  alias: ['videodoc', 'film', 'mp4'],
  react: '🎥',
  desc: 'Search and download videos from YouTube',
  category: 'Search',
  filename: __filename
}, async (conn, mek, m, { from, reply, args, sender }) => {
  try {
    // Check if a query is provided
    if (!args[0]) {
      return reply('Please provide a video name.');
    }

    const query = args.join(' ');

    // Perform a YouTube search based on the query
    const searchResults = await ytSearch(query);

    // Check if any videos were found
    if (!searchResults || !searchResults.videos.length) {
      return reply('No video found for the specified query.');
    }

    const firstVideo = searchResults.videos[0];
    const videoUrl = firstVideo.url;

    // Function to get download data from APIs
    const getDownloadData = async (url) => {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error('Error fetching data from API:', error);
        return { success: false };
      }
    };

    // List of APIs to try
    const apis = [
      `https://api-rin-tohsaka.vercel.app/download/ytmp4?url=${encodeURIComponent(videoUrl)}`,
      `https://api.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`,
      `https://www.dark-yasiya-api.site/download/ytmp4?url=${encodeURIComponent(videoUrl)}`,
      `https://api.giftedtech.web.id/api/download/dlmp4?url=${encodeURIComponent(videoUrl)}&apikey=gifted-md`,
      `https://api.dreaded.site/api/ytdl/video?url=${encodeURIComponent(videoUrl)}`
    ];

    let downloadData;
    for (const api of apis) {
      downloadData = await getDownloadData(api);
      if (downloadData && downloadData.success) break;
    }

    // Check if a valid download URL was found
    if (!downloadData || !downloadData.success || !downloadData.result?.download_url) {
      return reply('Failed to retrieve download URL from all sources. Please try again later.');
    }

    const downloadUrl = downloadData.result.download_url;
    const videoDetails = downloadData.result;

    // Validate the download URL
    if (!downloadUrl || typeof downloadUrl !== 'string' || !downloadUrl.startsWith('http')) {
      return reply('Invalid download URL. Please try again.');
    }

    // Prepare the message payload with external ad details
    const messagePayload = {
      video: { url: downloadUrl },
      mimetype: 'video/mp4',
      caption: `*${videoDetails.title || 'Downloaded by SUBZERO-MD'}*`,
      contextInfo: {
        externalAdReply: {
          title: videoDetails.title || 'SUBZERO-MD Video Download',
          body: 'Powered by SUBZERO-MD',
          mediaType: 1,
          sourceUrl: 'https://github.com/MrFrank-ofc/SUBZERO-BOT', // Replace with your desired link
          thumbnailUrl: firstVideo.thumbnail || 'https://i.imgur.com/v9gJCSD.jpeg',
          renderLargerThumbnail: true,
        },
      },
    };

    // Send the video
    await conn.sendMessage(from, messagePayload, { quoted: mek });

  } catch (error) {
    console.error('Error during download process:', error);
    reply(`Download failed due to an error: ${error.message || error}`);
  }
});
