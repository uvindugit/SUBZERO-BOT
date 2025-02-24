const config = require('../config');
const { cmd, commands } = require('../command');
const axios = require("axios");

cmd({
  pattern: "riddle",
  alias: ["puzzle", "brainteaser"],
  desc: "Get a random riddle with 4 possible answers. The correct answer is revealed after 15 seconds.",
  category: "utility",
  use: ".riddle",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    // Fetch a random riddle from the API
    const response = await axios.get("https://riddles-api.vercel.app/random");
    const { riddle, answer } = response.data;

    // Generate 4 options (1 correct and 3 random incorrect ones)
    const options = await generateOptions(answer);

    // Format the riddle message with options
    const riddleMessage = `
🤔 *Riddle*: ${riddle}

🅰️ ${options[0]}
🅱️ ${options[1]}
🅾️ ${options[2]}
🆎 ${options[3]}

⏳ The answer will be revealed in 15 seconds...
    `;

    // Send the riddle message
    await reply(riddleMessage);

    // Wait for 15 seconds before revealing the answer
    setTimeout(async () => {
      const answerMessage = `
🎉 *Answer*: ${answer}

💡 *Explanation*: If you got it right, well done! If not, better luck next time!
      `;
      await reply(answerMessage);
    }, 15000); // 15 seconds delay
  } catch (error) {
    console.error("Error fetching riddle:", error);

    // Send an error message
    reply("❌ Unable to fetch a riddle. Please try again later.");
  }
});

// Helper function to generate 4 options (1 correct and 3 random incorrect ones)
async function generateOptions(correctAnswer) {
  try {
    // Fetch random words or incorrect answers from an API (e.g., Random Word API)
    const randomWordsResponse = await axios.get("https://random-word-api.herokuapp.com/word?number=3");
    const randomWords = randomWordsResponse.data;

    // Combine the correct answer with 3 random words
    const options = [correctAnswer, ...randomWords];

    // Shuffle the options to randomize their order
    return shuffleArray(options);
  } catch (error) {
    console.error("Error generating options:", error);
    // Fallback to simple options if the API fails
    return [correctAnswer, "A shadow", "A whistle", "A cloud"];
  }
}

// Helper function to shuffle an array (for randomizing options)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
