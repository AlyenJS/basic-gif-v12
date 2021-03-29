const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
let kisi = message.mentions.members.first() ? message.mentions.members.first() : message.member
let stat = []
if(db.has(`pp.${kisi.user.id}`)){
  stat.push(`**${db.fetch(`pp.${kisi.user.id}`)}** photo`)
}
  if(db.has(`gif.${kisi.user.id}`)){
  stat.push(`**${db.fetch(`gif.${kisi.user.id}`)}** gif`)
}
let embed = new Discord.MessageEmbed()
.setAuthor(client.gif.sunucu+'')
.setColor('ff0000')
  .setDescription(stat[0] ? stat.join(' | ') +  ' Paylaşım Yapmışsın!\n**Toplam Paylaşım:** ' + db.fetch(`sayı.${kisi.user.id}`)||0 :`Paylaşımda Bulunulmamış!`)
  message.channel.send(embed)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['me'],
  permLevel: 0
};

exports.help = {
  name: 'stat',
}
