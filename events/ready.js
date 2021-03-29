const Discord = require("discord.js");
module.exports = async client => {
  client.user.setPresence({ activity: { type: "WATCHING", name: "Alyén?"}, status: 'online' })
};