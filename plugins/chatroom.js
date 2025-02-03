/*const { cmd } = require('../command');
const { getDb } = require('../lib/db');


getDb();

// Create a new chatroom
cmd({
  pattern: "createchat",
  desc: "Create a new chatroom",
  category: "chat",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  const chatroomName = m.body.split(' ').slice(1).join(' ').trim();

  if (!chatroomName) return reply('Please provide a name for the chatroom.');

  try {
    const db = getDb();
    const chatrooms = db.collection('chatrooms');

    // Check if the chatroom already exists
    const existingChatroom = await chatrooms.findOne({ name: chatroomName });
    if (existingChatroom) return reply(`Chatroom "${chatroomName}" already exists.`);

    // Insert the new chatroom
    await chatrooms.insertOne({ name: chatroomName });
    reply(`Chatroom "${chatroomName}" created successfully!`);
  } catch (err) {
    console.error(err);
    reply('An error occurred while creating the chatroom.');
  }
});

// List all chatrooms
cmd({
  pattern: "showchats",
  desc: "List all available chatrooms",
  category: "chat",
  filename: __filename
}, async (conn, mek, m, { reply }) => {
  try {
    const db = getDb();
    const chatrooms = db.collection('chatrooms');

    const chatroomList = await chatrooms.find().toArray();
    if (chatroomList.length === 0) return reply('No chatrooms available.');

    const chatroomNames = chatroomList.map(room => `- ${room.name}`).join('\n');
    reply(`Available Chatrooms:\n${chatroomNames}`);
  } catch (err) {
    console.error(err);
    reply('An error occurred while fetching chatrooms.');
  }
});

// Join a chatroom
cmd({
  pattern: "joinchat",
  desc: "Join a chatroom",
  category: "chat",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  const chatroomName = m.body.split(' ').slice(1).join(' ').trim();

  if (!chatroomName) return reply('Please provide the name of the chatroom to join.');

  try {
    const db = getDb();
    const chatrooms = db.collection('chatrooms');
    const chatroomMembers = db.collection('chatroom_members');

    // Check if the chatroom exists
    const chatroom = await chatrooms.findOne({ name: chatroomName });
    if (!chatroom) return reply(`Chatroom "${chatroomName}" does not exist.`);

    // Check if the user is already a member
    const isMember = await chatroomMembers.findOne({ chatroom_id: chatroom._id, user_id: from });
    if (isMember) return reply(`You are already a member of "${chatroomName}".`);

    // Add the user to the chatroom
    await chatroomMembers.insertOne({ chatroom_id: chatroom._id, user_id: from });
    reply(`You have joined the chatroom "${chatroomName}".`);
  } catch (err) {
    console.error(err);
    reply('An error occurred while joining the chatroom.');
  }
});

// Send a message to a chatroom
cmd({
  pattern: "sendchat",
  desc: "Send a message to the chatroom",
  category: "chat",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  const [command, ...messageParts] = m.body.split(' ');
  const message = messageParts.join(' ').trim();

  if (!message) return reply('Please provide a message to send.');

  try {
    const db = getDb();
    const chatroomMembers = db.collection('chatroom_members');
    const chatroomMessages = db.collection('chatroom_messages');

    // Get the chatroom the user is in
    const chatroomMember = await chatroomMembers.findOne({ user_id: from });
    if (!chatroomMember) return reply('You are not a member of any chatroom.');

    // Insert the message into the chatroom
    await chatroomMessages.insertOne({
      chatroom_id: chatroomMember.chatroom_id,
      user_id: from,
      message: message,
      timestamp: new Date()
    });

    reply('Message sent successfully!');
  } catch (err) {
    console.error(err);
    reply('An error occurred while sending the message.');
  }
});

// Fetch messages from a chatroom
cmd({
  pattern: "readchat",
  desc: "Read messages from the chatroom",
  category: "chat",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const db = getDb();
    const chatroomMembers = db.collection('chatroom_members');
    const chatroomMessages = db.collection('chatroom_messages');

    // Get the chatroom the user is in
    const chatroomMember = await chatroomMembers.findOne({ user_id: from });
    if (!chatroomMember) return reply('You are not a member of any chatroom.');

    // Fetch the latest messages
    const messages = await chatroomMessages
      .find({ chatroom_id: chatroomMember.chatroom_id })
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray();

    if (messages.length === 0) return reply('No messages in this chatroom yet.');

    const messageList = messages.map(msg => `[${msg.timestamp.toLocaleString()}] ${msg.user_id}: ${msg.message}`).join('\n');
    reply(`Latest Messages:\n${messageList}`);
  } catch (err) {
    console.error(err);
    reply('An error occurred while fetching messages.');
  }
});
*/
