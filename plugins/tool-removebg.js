/* const config = require('../config');
const { cmd, commands } = require('../command');
const { davidcyCdn } = require('../lib/davidcyrilCdn');

cmd({
  pattern: 'removebg',
  react: '🖼️',
  desc: 'Remove background from an image',
  category: 'image',
  filename: __filename
}, async (conn, mek, m, {
  body,
  from,
  quoted,
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
    if (!/image/.test(mime)) return reply(`❌ Reply to an *image* with .removebg to remove background.`);

    // await conn.sendMessage(m.chat, { react: { text: `⏳`, key: m.key } });

    try {
        const media = await m.quoted.download();
        const fileType = m.quoted.mimetype.split('/')[1]; 
        
        let result = await davidcyCdn(media, fileType);
        
        if (!result.success) return reply(`❌ Upload failed: ${result.error}`);

        const imageUrl = result.url; 
        const removedBgUrl = `https://apis.davidcyriltech.my.id/removebg?url=${imageUrl}`;

        await conn.sendMessage(m.chat, {
            image: { url: removedBgUrl },
            caption: `🖼️ *Background Removed Successfully!*`
        }, { quoted: m });

        // await conn.sendMessage(m.chat, { react: { text: `✅`, key: m.key } });

    } catch (error) {
        console.error('Error in RemoveBG command:', error);
        reply(`❌ Error: ${error.message}`);
    }
});
*/
