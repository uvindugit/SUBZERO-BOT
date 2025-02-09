//  SUBZERO MD PROPERTY
// MADE BY MR FRANK
// REMOVE THIS IF YOU ARE GAY

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
    
    let message = '🏆 *\`EPL TABLE STANDINGS\`* 🏆\n\n';
    
    if (Array.isArray(standings)) {
      standings.forEach((team) => {
        message += `${team.position}. ${team.team} - ${team.points} pts\n`;
      });
      // Add "> subzero" at the bottom of the results
      message += '\n> subzero';
    } else {
      // In case the structure is different, display the raw data
      message += standings;
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

// BUNDESLIGA

cmd({
  pattern: 'bundesliga',
  alias: 'bundeliga',
  react: '⚽',
  desc: 'Display current EPL standings',
  category: 'sports',
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Retrieve the data from the API
    const data = await fetchJson('https://api.dreaded.site/api/standings/BL1');
    
    // Access the standings from the "data" property as per your original snippet
    const standings = data.data;
    
    let message = '🏆 *\`BUNDESLIGA STANDINGS\`* 🏆\n\n';
    
    if (Array.isArray(standings)) {
      standings.forEach((team) => {
        message += `${team.position}. ${team.team} - ${team.points} pts\n`;
      });
      // Add "> subzero" at the bottom of the results
      message += '\n> subzero';
    } else {
      // In case the structure is different, display the raw data
      message += standings;
    }
        
    // Send the standings with an image
    await conn.sendMessage(from, {
      image: { url: `https://i.ibb.co/KjBxCbrM/mrfrankofc.jpg` }, // Image URL
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
    console.error('Error fetching Bundesliga standings:', error);
    reply('Something went wrong. Unable to fetch Bundesliga standings.');
  }
});

// LALIGA

cmd({
  pattern: 'laliga',
  alias: 'llga',
  react: '⚽',
  desc: 'Display current EPL standings',
  category: 'sports',
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Retrieve the data from the API
    const data = await fetchJson('https://api.dreaded.site/api/standings/PD');
    
    // Access the standings from the "data" property as per your original snippet
    const standings = data.data;
    
    let message = '🏆 *\`LALIGA TABLE STANDINGS\`* 🏆\n\n';
    
    if (Array.isArray(standings)) {
      standings.forEach((team) => {
        message += `${team.position}. ${team.team} - ${team.points} pts\n`;
      });
      // Add "> subzero" at the bottom of the results
      message += '\n> subzero';
    } else {
      // In case the structure is different, display the raw data
      message += standings;
    }
        
    // Send the standings with an image
    await conn.sendMessage(from, {
      image: { url: `https://i.ibb.co/JRCwLzd1/mrfrankofc.jpg` }, // Image URL
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
    console.error('Error fetching La Liga standings:', error);
    reply('Something went wrong. Unable to fetch La Liga standings.');
  }
});



















// DADDY FRANK OFFICIAL


/* //  SUBZERO MD PROPERTY
// MADE BY MR FRANK
// REMOVE THIS IF YOU ARE GAY

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
    
    let message = '🏆 *\`EPL TABLE STANDINGS\`* 🏆\n\n';
    
    if (Array.isArray(standings)) {
      standings.forEach((team, index) => {
        message += `${team.position}. ${team.team} - ${team.points} pts\n`;
      });
      // Add footer after the standings, regardless of the number of teams
      message += '\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ sᴜʙᴢᴇʀᴏ ʙᴏᴛ\n';
    } else {
      // In case the structure is different, display the raw data
      message += standings;
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

// BUNDESLIGA

cmd({
  pattern: 'bundesliga',
  alias: 'bundeliga',
  react: '⚽',
  desc: 'Display current EPL standings',
  category: 'sports',
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Retrieve the data from the API
    const data = await fetchJson('https://api.dreaded.site/api/standings/BL1');
    
    // Access the standings from the "data" property as per your original snippet
    const standings = data.data;
    
    let message = '🏆 *\`BUNDESLIGA STANDINGS\`* 🏆\n\n';
    
    if (Array.isArray(standings)) {
      standings.forEach((team, index) => {
        message += `${team.position}. ${team.team} - ${team.points} pts\n`;
      });
      // Add footer after the standings, regardless of the number of teams
      message += '\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ sᴜʙᴢᴇʀᴏ ʙᴏᴛ\n';
    } else {
      // In case the structure is different, display the raw data
      message += standings;
    }
        
    // Send the standings with an image
    await conn.sendMessage(from, {
      image: { url: `https://i.ibb.co/KjBxCbrM/mrfrankofc.jpg` }, // Image URL
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
    console.error('Error fetching Bundesliga standings:', error);
    reply('Something went wrong. Unable to fetch Bundesliga standings.');
  }
});

// LALIGA

cmd({
  pattern: 'laliga',
  alias: 'llga',
  react: '⚽',
  desc: 'Display current EPL standings',
  category: 'sports',
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Retrieve the data from the API
    const data = await fetchJson('https://api.dreaded.site/api/standings/PD');
    
    // Access the standings from the "data" property as per your original snippet
    const standings = data.data;
    
    let message = '🏆 *\`LALIGA TABLE STANDINGS\`* 🏆\n\n';
    
    if (Array.isArray(standings)) {
      standings.forEach((team, index) => {
        message += `${team.position}. ${team.team} - ${team.points} pts\n`;
      });
      // Add footer after the standings, regardless of the number of teams
      message += '\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ sᴜʙᴢᴇʀᴏ ʙᴏᴛ\n';
    } else {
      // In case the structure is different, display the raw data
      message += standings;
    }
        
    // Send the standings with an image
    await conn.sendMessage(from, {
      image: { url: `https://i.ibb.co/JRCwLzd1/mrfrankofc.jpg` }, // Image URL
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
    console.error('Error fetching La Liga standings:', error);
    reply('Something went wrong. Unable to fetch La Liga standings.');
  }
});

// DADDY FRANK OFFICIAL


*/
/*
//  SUBZERO MD PROPERTY
// MADE BY MR FRANK
// REMOVE THIS IF YOU ARE GAY

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
    
    let message = '🏆 *\`EPL TABLE STANDINGS\`* 🏆\n\n';
    
    if (Array.isArray(standings)) {
      standings.forEach((team, index) => {
        message += `${team.position}. ${team.team} - ${team.points} pts\n`;
        if (index === 19) { // 20th point
          message += '\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ sᴜʙᴢᴇʀᴏ ʙᴏᴛ\n';
        }
      });
    } else {
      // In case the structure is different, display the raw data
      message += standings;
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

// BUNDESLIGA

cmd({
  pattern: 'bundesliga',
  alias: 'bundeliga',
  react: '⚽',
  desc: 'Display current EPL standings',
  category: 'sports',
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Retrieve the data from the API
    const data = await fetchJson('https://api.dreaded.site/api/standings/BL1');
    
    // Access the standings from the "data" property as per your original snippet
    const standings = data.data;
    
    let message = '🏆 *\`BUNDESLIGA STANDINGS\`* 🏆\n\n';
    
    if (Array.isArray(standings)) {
      standings.forEach((team, index) => {
        message += `${team.position}. ${team.team} - ${team.points} pts\n`;
        if (index === 19) { // 20th point
          message += '\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ sᴜʙᴢᴇʀᴏ ʙᴏᴛ\n';
        }
      });
    } else {
      // In case the structure is different, display the raw data
      message += standings;
    }
        
    // Send the standings with an image
    await conn.sendMessage(from, {
      image: { url: `https://i.ibb.co/KjBxCbrM/mrfrankofc.jpg` }, // Image URL
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
    console.error('Error fetching Bundesliga standings:', error);
    reply('Something went wrong. Unable to fetch Bundesliga standings.');
  }
});

// LALIGA

cmd({
  pattern: 'laliga',
  alias: 'llga',
  react: '⚽',
  desc: 'Display current EPL standings',
  category: 'sports',
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Retrieve the data from the API
    const data = await fetchJson('https://api.dreaded.site/api/standings/PD');
    
    // Access the standings from the "data" property as per your original snippet
    const standings = data.data;
    
    let message = '🏆 *\`LALIGA TABLE STANDINGS\`* 🏆\n\n';
    
    if (Array.isArray(standings)) {
      standings.forEach((team, index) => {
        message += `${team.position}. ${team.team} - ${team.points} pts\n`;
        if (index === 19) { // 20th point
          message += '\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ sᴜʙᴢᴇʀᴏ ʙᴏᴛ\n';
        }
      });
    } else {
      // In case the structure is different, display the raw data
      message += standings;
    }
        
    // Send the standings with an image
    await conn.sendMessage(from, {
      image: { url: `https://i.ibb.co/JRCwLzd1/mrfrankofc.jpg` }, // Image URL
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
    console.error('Error fetching La Liga standings:', error);
    reply('Something went wrong. Unable to fetch La Liga standings.');
  }
});
*/
// DADDY FRANK OFFICIAL





/* //  SUBZERO MD PROPERTY
// MADE BY MR FRANK
// REMOVE THIS IF YOU ARE GAY


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
    
    let message = '🏆 *\`EPL TABLE STANDINGS\`* 🏆\n\n';
    
    if (Array.isArray(standings)) {
      standings.forEach(team => {
        message += `${team.position}. ${team.team} - ${team.points} pts`;
      });
    } else {
      // In case the structure is different, display the raw data
      message += standings
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
    // BUNDESLIGA

cmd({
  pattern: 'bundesliga',
  alias: 'bundeliga',
  react: '⚽',
  desc: 'Display current EPL standings',
  category: 'sports',
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Retrieve the data from the API
    const data = await fetchJson('https://api.dreaded.site/api/standings/BL1');
    
    // Access the standings from the "data" property as per your original snippet
    const standings = data.data;
    
    let message = '🏆 *\`BUNDESLIGA STANDINGS\`* 🏆\n\n';
    
    if (Array.isArray(standings)) {
      standings.forEach(team => {
        message += `${team.position}. ${team.team} - ${team.points} pts`;
      });
    } else {
      // In case the structure is different, display the raw data
      message += standings
    }
        
        // Send the standings with an image
    await conn.sendMessage(from, {
      image: { url: `https://i.ibb.co/KjBxCbrM/mrfrankofc.jpg` }, // Image URL
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
    // LALIGA
cmd({
  pattern: 'laliga',
  alias: 'llga',
  react: '⚽',
  desc: 'Display current EPL standings',
  category: 'sports',
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // Retrieve the data from the API
    const data = await fetchJson('https://api.dreaded.site/api/standings/PD');
    
    // Access the standings from the "data" property as per your original snippet
    const standings = data.data;
    
    let message = '🏆 *\`LALIGA TABLE STANDINGS\`* 🏆\n\n';
    
    if (Array.isArray(standings)) {
      standings.forEach(team => {
        message += `${team.position}. ${team.team} - ${team.points} pts`;
      });
    } else {
      // In case the structure is different, display the raw data
      message += standings
    }
        
        // Send the standings with an image
    await conn.sendMessage(from, {
      image: { url: `https://i.ibb.co/JRCwLzd1/mrfrankofc.jpg` }, // Image URL
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
*/






