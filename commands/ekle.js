const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
  let kisi = message.mentions.members.first()
  if(!kisi) return message.channel.send(new Discord.MessageEmbed().setColor('ff0000').setDescription(`Bir Kullanıcı Etiketle!`));
  if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setColor('ff0000').setDescription(`Bir Kategori Gir!`));
   if(!['gif','pp'].includes(args[1])) return message.channel.send(new Discord.MessageEmbed().setColor('ff0000').setDescription(`Kategoriyi Doğru Gir!`));
   if(!args[2]) return message.channel.send(new Discord.MessageEmbed().setColor('ff0000').setDescription(`Sayı Gir!`));
  if(isNaN(args[2]))return message.channel.send(new Discord.MessageEmbed().setColor('ff0000').setDescription(`Sayı Gir!`));
  if(args[2].startsWith('-')) return message.channel.send(new Discord.MessageEmbed().setColor('ff0000').setDescription(`Ekleme Yaparken Dikkat Et!`));
  db.add(`${args[1]}.${kisi.user.id}`,args[2])
  db.add(`sayı.${kisi.user.id}`,args[2])
  message.channel.send(new Discord.MessageEmbed()
  .setColor('ff0000')
  .setDescription(`Girilen Miktarda Puan Ekledim!`));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'bonus',
}
