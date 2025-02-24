/* const { cmd } = require("../command");
const fs = require('fs');
const path = require('path');

cmd({
  pattern: "plugins1",
  alias: ["listplugins1", "pluginlist1"],
  desc: "List all available plugins with their usage details.",
  category: "utility",
  use: ".plugins",
  filename: __filename,
}, async (conn, mek, msg, { from, reply }) => {
  try {
    // Path to the plugins folder
    const pluginsDir = path.join(__dirname, '../plugins'); // Adjust the path as needed

    // Debug: Log the plugins directory
    console.log("Plugins Directory:", pluginsDir);

    // Read all files in the plugins folder
    const pluginFiles = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'));

    // Debug: Log the plugin files
    console.log("Plugin Files:", pluginFiles);

    if (pluginFiles.length === 0) {
      return reply("❌ No plugins found in the plugins folder.");
    }

    let pluginList = "📂 *Available Plugins Usages:*\n\n";

    // Iterate through each plugin file
    for (const file of pluginFiles) {
      const pluginPath = path.join(pluginsDir, file);

      // Debug: Log the plugin path
      console.log("Loading Plugin:", pluginPath);

      try {
        const plugin = require(pluginPath);

        // Debug: Log the plugin object
        console.log("Plugin Object:", plugin);

        // Extract plugin metadata
        if (plugin.cmd && plugin.cmd.pattern) {
          const { pattern, alias, desc, category, use } = plugin.cmd;
          pluginList += `🔹 *Pattern:* ${pattern}\n`;
          pluginList += `   *Alias:* ${alias ? alias.join(', ') : 'None'}\n`;
          pluginList += `   *Description:* ${desc || 'No description'}\n`;
          pluginList += `   *Category:* ${category || 'Uncategorized'}\n`;
          pluginList += `   *Usage:* ${use || 'No usage information'}\n\n`;
        } else {
          console.log(`Skipping ${file}: Missing or invalid cmd object.`);
        }
      } catch (error) {
        console.error(`Error loading plugin ${file}:`, error);
      }
    }

    // Debug: Log the final plugin list
    console.log("Plugin List:", pluginList);

    // Send the plugin list
    reply(pluginList);

  } catch (error) {
    console.error("Error fetching plugins:", error);
    reply("❌ An error occurred while fetching the plugin list.");
  }
});
*/
