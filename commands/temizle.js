const Discord = require('discord.js');
const data = require('quick.db');


exports.run = async (client, message, args) => {
if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(new Discord.MessageEmbed().setColor('2F3136').setDescription(`Bu Komutu Kullanabilmek İçin \`MESAJLARI YÖNET\` Yetkisine Sahip Olmalısın!`)).then(m => m.delete({timeout: 5000}));
if(!args[0]) return message.channel.send(new Discord.MessageEmbed().setColor('ff0000').setDescription(`Bir Miktar Gir!`));
if(args[0] > 100) return message.channel.send(new Discord.MessageEmbed().setColor('ff0000').setDescription(`100den Aşağı bir değer gir.`));
message.channel.bulkDelete(args[0]);
return message.channel.send(new Discord.MessageEmbed().setColor('ff0000').setDescription(`**__${args[0]}__** Adet Mesaj Başarıyla Silindi!`)).then(m => m.delete({timeout: 5000}));
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sil","clear","temizle"],
  permLevel: 0
}

exports.help = {
  name: 'sil'
};