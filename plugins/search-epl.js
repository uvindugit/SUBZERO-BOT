const axios = require('axios');
const config = require('../config');
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
  pattern: 'epl',
  alias: 'englishspremierleague',
  react: '⚽',
  desc: 'Display current EPL standings',
  category: 'sports',
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Retrieve the data from the API
    const data = await fetchJson('https://api.dreaded.site/api/standings/PL');
    
    // Access the standings from the "data" property as per your original snippet
    const standings = data.data;
    
    let message = '🏆 *\`EPL TABLE STANDINGS\`*\n\n';
    
    if (Array.isArray(standings)) {
      standings.forEach(team => {
        message += `${team.position}. ${team.team} - ${team.points} pts`;
      });
    } else {
      // In case the structure is different, display the raw data
      message += JSON.stringify(standings, null, 2);
    }
        
        // Send the standings with an image
    await conn.sendMessage(from, {
      image: { url: `https://i.ibb.co/4g5ZZnWZ/mrfrankofc.jpg` }, // Image URL
      caption: message,
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

  } catch (error) {
    console.error('Error fetching Premier League standings:', error);
    reply('Something went wrong. Unable to fetch Premier League standings.');
  }
});
    // DADDY FRANK OFFICIAL
