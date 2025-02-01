/*import mongoose from 'mongoose';
import { cmd } from '../command.js';

// MongoDB connection
mongoose.connect('mongodb+srv://darexmucheri:cMd7EoTwGglJGXwR@cluster0.uwf6z.mongodb.net/botdb?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema for bot settings
const botSettingsSchema = new mongoose.Schema({
    userId: String, // User's WhatsApp ID
    autoBio: { type: Boolean, default: false } // AutoBio setting
});

// Model for bot settings
const BotSettings = mongoose.model('BotSettings', botSettingsSchema);

// Function to update autoBio setting
async function updateAutoBio(userId, status) {
    await BotSettings.findOneAndUpdate(
        { userId },
        { autoBio: status },
        { upsert: true, new: true }
    );
}

// Function to get autoBio setting
async function getAutoBio(userId) {
    const settings = await BotSettings.findOne({ userId });
    return settings ? settings.autoBio : false;
}

// Command to toggle autoBio
cmd({
    pattern: "autobio",
    alias: ["bio"],
    desc: "Toggle autoBio on/off",
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { from, reply, text, isCreator }) => {
    if (!isCreator) return reply('This command is only for the bot owner.');

    try {
        const [command, status] = text.split(' ');

        if (!command || !['on', 'off'].includes(status?.toLowerCase())) {
            return reply('Usage: `.autobio on` or `.autobio off`');
        }

        const newStatus = status.toLowerCase() === 'on';
        await updateAutoBio(from, newStatus);

        return reply(`AutoBio has been turned ${newStatus ? 'on ✅' : 'off ❌'}.`);
    } catch (error) {
        console.error('Error in autobio command:', error);
        return reply('An error occurred while processing your request.');
    }
});

// Handler to update bot's bio
let handler = m => m;

handler.all = async function (m) {
    try {
        // Get the autoBio setting from MongoDB
        const autoBio = await getAutoBio(this.user.jid);

        if (autoBio) {
            let _muptime;

            // Calculate uptime
            if (process.send) {
                process.send('uptime');
                _muptime = await new Promise(resolve => {
                    process.once('message', resolve);
                    setTimeout(resolve, 1000);
                }) * 1000;
            }

            // Format the uptime
            let muptime = clockString(_muptime);

            // Set the bot's bio
            let bio = `\n⌚ Time Active: ${muptime}\n\n ┃ 🛡️ᑭᖇIᑎᑕᕮ ᗷOT ᗰᗪ🛡️`;
            await this.updateProfileStatus(bio).catch(_ => _);
        }
    } catch (error) {
        console.error('Error in bio updater:', error);
    }
};

export default handler;

// Function to format uptime
function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000); // Days
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24; // Hours
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60; // Minutes
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60; // Seconds

    return [d, ' Day(s) ️', h, ' Hour(s) ', m, ' Minute(s)']
        .map(v => v.toString().padStart(2, 0))
        .join('');
}
*/
