// BELONGS TO SUBZERO


const { cmd } = require('../command');
const connectDB = require('../lib/db'); // Import the MongoDB connection
const Diary = require('../models/Diary'); // Import the Diary model

// Connect to MongoDB
connectDB();

// Add a note to the diary
cmd({
    pattern: "diaryadd",
    alias: ["addnote", "adddiary"],
    use: '.diaryadd <text>',
    react: "📝",
    desc: "Add a note to your diary.",
    category: "diary",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender, body }) => {
    try {
        const note = body.split(' ').slice(1).join(' '); // Extract the note text
        if (!note) {
            return reply("⚠️ Please provide a note to add. Example: `.diaryadd Today was a great day with Subzero Bot!`");
        }

        // Save the note to the database
        const newNote = new Diary({ userId: sender, note });
        await newNote.save();

        // Send a formatted message with an image
        const ALIVE_IMG = 'https://i.ibb.co/35JHgk14/mrfrankofc.jpg'; // Replace with your image URL
        const formattedInfo = `📝 *Note added to your diary!✅*\n\n` +
                              `*🔖 "${note}"*\n\n` +
                              `_📆 Time: ${new Date().toLocaleString()}_`;

        await conn.sendMessage(from, {
            image: { url: ALIVE_IMG },
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363304325601080@newsletter',
                    newsletterName: '𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃🎀',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
    } catch (error) {
        console.error("Error:", error); // Log the error
        reply("*Error: Unable to add the note. Please try again later.*");
    }
});

// Delete a note from the diary
cmd({
    pattern: "diarydelete",
    alias: ["deletenote", "deletediary"],
    use: '.diarydelete <note number>',
    react: "🗑️",
    desc: "Delete a note from your diary.",
    category: "diary",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender, body }) => {
    try {
        const noteNumber = parseInt(body.split(' ')[1]); // Extract the note number
        if (isNaN(noteNumber) || noteNumber < 1) {
            return reply("Please provide a valid note number. Example: `.diarydelete 1`");
        }

        // Fetch all notes for the user
        const notes = await Diary.find({ userId: sender }).sort({ timestamp: 1 });
        if (noteNumber > notes.length) {
            return reply(`You only have ${notes.length} notes in your diary.`);
        }

        // Delete the specified note
        const noteToDelete = notes[noteNumber - 1];
        await Diary.findByIdAndDelete(noteToDelete._id);

        // Send a formatted message with an image
        const ALIVE_IMG = 'https://i.ibb.co/35JHgk14/mrfrankofc.jpg'; // Replace with your image URL
        const formattedInfo = `🗑️ *Note ${noteNumber} deleted from your diary!✅*\n\n` +
                              `*🔖 "${noteToDelete.note}"*\n\n` +
                              `_📆 Time: ${noteToDelete.timestamp.toLocaleString()}_`;

        await conn.sendMessage(from, {
            image: { url: ALIVE_IMG },
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363304325601080@newsletter',
                    newsletterName: '𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
    } catch (error) {
        console.error("Error:", error); // Log the error
        reply("*Error: Unable to delete the note. Please try again later.*");
    }
});

// Show all notes in the diary
cmd({
    pattern: "showdiary",
    alias: ["viewdiary", "diary", "viewnotes", "notes"],
    use: '.showdiary',
    react: "📖",
    desc: "View all notes in your diary.",
    category: "diary",
    filename: __filename
}, async (conn, mek, m, { from, reply, sender }) => {
    try {
        // Fetch all notes for the user
        const notes = await Diary.find({ userId: sender }).sort({ timestamp: 1 });
        if (notes.length === 0) {
            return reply("Your diary is empty. Add a note with `.diaryadd <text>`.");
        }

        // Format the notes as a numbered list
        let diaryList = "📖 `SUBZERO USER DIARY`  📖\n\n⟣━━━━━━━━━━━━━━━━⟢\n\n";
        notes.forEach((note, index) => {
            diaryList += `*🔖 ${index + 1}. ${note.note}*\n` +
                         `📆 _Time: ${note.timestamp.toLocaleString()}_\n\n`;
        });

        // Send a formatted message with an image
        const ALIVE_IMG = 'https://i.ibb.co/35JHgk14/mrfrankofc.jpg'; // Replace with your image URL
        await conn.sendMessage(from, {
            image: { url: ALIVE_IMG },
            caption: diaryList,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363304325601080@newsletter',
                    newsletterName: '❄️ 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃❄️',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
    } catch (error) {
        console.error("Error:", error); // Log the error
        reply("*Error: Unable to fetch your diary. Please try again later.*");
    }
});
