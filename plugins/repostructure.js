const { cmd } = require('../command'); // Assuming you have a command handler
const axios = require('axios'); // For making HTTP requests to GitHub API

// GitHub repository details
const REPO_OWNER = 'mrfrank-ofc';
const REPO_NAME = 'SUBZERO-BOT';
const GITHUB_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`;

// Function to fetch repository structure recursively
async function fetchRepoStructure(url, path = '') {
    try {
        const response = await axios.get(url);
        const structure = [];

        for (const item of response.data) {
            if (item.type === 'dir') {
                // Recursively fetch subdirectories
                const subStructure = await fetchRepoStructure(item.url, `${path}/${item.name}`);
                structure.push(`${path}/${item.name}`, ...subStructure);
            } else {
                // Add files to the structure
                structure.push(`${path}/${item.name}`);
            }
        }

        return structure;
    } catch (error) {
        console.error("Error fetching repository structure:", error);
        return [];
    }
}

// Function to format the repository structure as a tree
function formatTree(structure) {
    const tree = ['/SUBZERO-MD'];
    const indent = '│   ';
    const lastIndent = '└── ';
    const dirIndent = '├── ';

    structure.forEach((item, index) => {
        const isLast = index === structure.length - 1;
        const parts = item.split('/');
        const depth = parts.length - 1;

        let line = '';
        for (let i = 1; i < depth; i++) {
            line += indent;
        }

        if (isLast) {
            line += lastIndent + parts[parts.length - 1];
        } else {
            line += dirIndent + parts[parts.length - 1];
        }

        tree.push(line);
    });

    return tree.join('\n');
}

// Command to display repository structure
cmd({
    pattern: "repotree", // Command trigger
    alias: ["repostructure", "repodir"], // Aliases
    use: '.repotree', // Example usage
    react: "🌳", // Emoji reaction
    desc: "Display the folder structure of the bot's repository.", // Description
    category: "utility", // Command category
    filename: __filename // Current file name
},

async (conn, mek, m, { from, reply }) => {
    try {
        // Fetch the repository structure
        const structure = await fetchRepoStructure(GITHUB_API_URL);

        if (structure.length === 0) {
            return reply("*No files or folders found in the repository.*");
        }

        // Format the structure as a tree
        const tree = formatTree(structure);

        // Send the tree structure to the user
        await reply(`\`\`\`\n${tree}\n\`\`\``);
    } catch (error) {
        console.error("Error:", error); // Log the error
        reply("*Error: Unable to fetch the repository structure. Please try again later.*");
    }
});
