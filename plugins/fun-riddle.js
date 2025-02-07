// SUBZERO MD PROPERTY
// MADE BY MR FRANK
// REMOVE THIS IF YOU ARE GAY

/* const config = require('../config');
const { cmd, commands } = require('../command');
const axios = require('axios');

// List of 100 riddles with answers (A, B, C, D)
const riddles = [
  {
    question: "What has keys but can't open locks?",
    options: { A: "Piano", B: "Door", C: "Keychain", D: "Map" },
    answer: "A"
  },
  {
    question: "What has to be broken before you can use it?",
    options: { A: "Egg", B: "Glass", C: "Promise", D: "Chain" },
    answer: "A"
  },
  {
    question: "I’m tall when I’m young, and I’m short when I’m old. What am I?",
    options: { A: "Tree", B: "Candle", C: "Pencil", D: "Mountain" },
    answer: "B"
  },
  {
    question: "What has a heart that doesn’t beat?",
    options: { A: "Artichoke", B: "Robot", C: "Clock", D: "Book" },
    answer: "A"
  },
  {
    question: "What has hands but can’t clap?",
    options: { A: "Clock", B: "Gloves", C: "Tree", D: "Person" },
    answer: "A"
  },
  // Add 95 more riddles here...
];

// Store user progress (current riddle index)
const userProgress = new Map();

const setupRiddlePlugin = (conn) => {
  cmd({
    pattern: 'riddle',
    alias: ['riddles'],
    react: '🤔',
    desc: 'Play a riddle game with multiple-choice answers',
    category: 'Fun',
    filename: __filename
  }, async (conn, mek, m, { from, reply, sender }) => {
    try {
      // Get or initialize user progress
      let currentIndex = userProgress.get(sender) || 0;

      // If user has completed all riddles, reset progress
      if (currentIndex >= riddles.length) {
        currentIndex = 0;
        userProgress.set(sender, 0);
      }

      // Get a random riddle
      const randomIndex = Math.floor(Math.random() * riddles.length);
      const riddle = riddles[randomIndex];

      // Format the riddle message
      const riddleMessage = `
🤔 *Riddle Time!* 🤔

${riddle.question}

A) ${riddle.options.A}
B) ${riddle.options.B}
C) ${riddle.options.C}
D) ${riddle.options.D}

Reply with A, B, C, or D to answer!
`;

      // Send the riddle
      await reply(riddleMessage);

      // Store the correct answer for the user
      userProgress.set(sender, { index: randomIndex, answer: riddle.answer });

    } catch (error) {
      console.error('Error in riddle plugin:', error);
      reply('An error occurred while fetching the riddle. Please try again.');
    }
  });

  // Event listener for user responses
  conn.ev.on('messages.upsert', async (update) => {
    const message = update.messages[0];
    if (!message.message || !message.message.extendedTextMessage) return;

    const sender = message.key.remoteJid;
    const userAnswer = message.message.extendedTextMessage.text.trim().toUpperCase();

    // Check if the user is playing the riddle game
    if (userProgress.has(sender)) {
      const { index, answer } = userProgress.get(sender);

      // Validate the answer
      if (['A', 'B', 'C', 'D'].includes(userAnswer)) {
        if (userAnswer === answer) {
          await conn.sendMessage(sender, { text: '🎉 *Correct!* 🎉\nLet\'s move to the next riddle!' }, { quoted: message });
          userProgress.delete(sender); // Reset for the next riddle
        } else {
          await conn.sendMessage(sender, { text: '❌ *Wrong!* ❌\nTry again!' }, { quoted: message });
        }
      } else {
        await conn.sendMessage(sender, { text: '⚠️ Invalid choice! Please reply with A, B, C, or D.' }, { quoted: message });
      }
    }
  });
};

// Export the setup function
module.exports = setupRiddlePlugin;
*/
