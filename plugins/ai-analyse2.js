const config = require('../config');
const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
  pattern: 'textdetect',
  alias: ['ocr'],
  react: '💡',
  desc: 'Detect text in an image using OCR.',
  category: 'tools',
  filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
  if (!quoted) return reply('Quote an image to detect text.');

  try {
    const buffer = await m.quoted.download();
    if (!buffer) return reply('Failed to download the quoted image.');

    const base64String = buffer.toString('base64');
    await reply('```Detecting text...🔎```');

    // Hugging Face Inference API (using Donut model for OCR)
    const apiUrl = 'https://api-inference.huggingface.co/models/naver-clova-ix/donut-base-finetuned-cord-v2';
    const response = await axios.post(apiUrl, {
      inputs: base64String, // Send the base64 image
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Extract the detected text
    const text = response.data[0]?.generated_text || 'No text detected.';
    await reply(`📝 *Text Detection Result*:\n\n${text}`);
  } catch (error) {
    console.error('Error in sending request:', error);
    await reply('❌ Unable to detect text. Please try again later.');
  }
});

cmd({
  pattern: 'imageanalyze',
  alias: ['img2text'],
  react: '💡',
  desc: 'Analyze an image and generate a description.',
  category: 'tools',
  filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
  if (!quoted) return reply('Quote an image to analyze.');

  try {
    const buffer = await m.quoted.download();
    if (!buffer) return reply('Failed to download the quoted image.');

    const base64String = buffer.toString('base64');
    await reply('```Analyzing image...🔎```');

    // Hugging Face Inference API (using BLIP model for image captioning)
    const apiUrl = 'https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large';
    const response = await axios.post(apiUrl, {
      inputs: base64String, // Send the base64 image
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Extract the generated caption
    const caption = response.data[0]?.generated_text || 'No description available.';
    await reply(`📷 *Image Analysis Result*:\n\n${caption}`);
  } catch (error) {
    console.error('Error in sending request:', error);
    await reply('❌ Unable to analyze the image. Please try again later.');
  }
});

cmd({
  pattern: 'objectdetect',
  alias: ['objdetect'],
  react: '💡',
  desc: 'Detect objects in an image.',
  category: 'tools',
  filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
  if (!quoted) return reply('Quote an image to detect objects.');

  try {
    const buffer = await m.quoted.download();
    if (!buffer) return reply('Failed to download the quoted image.');

    const base64String = buffer.toString('base64');
    await reply('```Detecting objects...🔎```');

    // Hugging Face Inference API (using CLIP model for object detection)
    const apiUrl = 'https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32';
    const response = await axios.post(apiUrl, {
      inputs: base64String, // Send the base64 image
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Extract the detected objects
    const objects = response.data[0]?.labels || 'No objects detected.';
    await reply(`📦 *Object Detection Result*:\n\n${objects.join(', ')}`);
  } catch (error) {
    console.error('Error in sending request:', error);
    await reply('❌ Unable to detect objects. Please try again later.');
  }
});
