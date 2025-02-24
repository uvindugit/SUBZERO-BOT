const { cmd } = require('../command');
const axios = require('axios');
const FormData = require('form-data');

cmd({
  pattern: 'readqr',
  alias: ['scanqr'],
  react: '📷',
  desc: 'Read QR code from an image using ZXing API.',
  category: 'tools',
  filename: __filename
}, async (conn, mek, msg, { from, reply, quoted, args }) => {
  try {
    // Check if the message contains an image
    if (!quoted || !quoted.image) {
      return reply('❌ Please reply to an image containing a QR code.');
    }

    // Download the image
    const buffer = await conn.downloadMediaMessage(quoted);

    // Create a FormData object
    const form = new FormData();
    form.append('file', buffer, { filename: 'qr_code.jpg' });

    // Send the image to the ZXing API
    const response = await axios.post('https://zxing.org/w/decode', form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    // Extract the decoded text from the response
    const decodedText = response.data.text;

    // Check if the decoded text is valid
    if (!decodedText) {
      return reply('❌ No QR code found in the image.');
    }

    // Reply with the decoded text
    await reply(`✅ Decoded QR Code:\n\n${decodedText}`);

  } catch (error) {
    console.error('Error reading QR code:', error);
    if (error.response && error.response.status === 400) {
      reply('❌ No QR code found in the image.');
    } else {
      reply('❌ An error occurred while reading the QR code. Please try again.');
    }
  }
});
