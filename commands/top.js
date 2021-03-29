const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
  
    if(args[0] == 'pp'){
      
   
   	const sorted = message.guild.members.cache.filter(m=>db.has(`pp.${m.user.id}`)&&!m.user.bot).array().sort((a, b) => { return (db.fetch(`pp.${b.user.id}`) || 0) - (db.fetch(`pp.${a.user.id}`) || 0) });
	const top10 = sorted.splice(0, args[1] || 10)
  var sira = 1
  const map = top10.map(s=>` ${sira++}. <@${s.user.id}> | **${db.fetch(`pp.${s.user.id}`)||0}** pp`).join('\n')
  let embed = new Discord.MessageEmbed()
  .setAuthor(client.gif.sunucu+' 🔥')
  .setColor('ff0000')
  .setDescription(map||`Paylaşımda Bulunan Yok!`)
  message.channel.send(embed)
      return
    } 

    if(args[0] == 'gif'){
      
   
   	const sorted = message.guild.members.cache.filter(m=>db.has(`gif.${m.user.id}`)&&!m.user.bot).array().sort((a, b) => { return (db.fetch(`gif.${b.user.id}`) || 0) - (db.fetch(`gif.${a.user.id}`) || 0) });
	const top10 = sorted.splice(0, args[1] || 10)
  var sira = 1
  const map = top10.map(s=>` **${sira++}-** <@${s.user.id}> | **${db.fetch(`gif.${s.user.id}`)||0}** gif`).join('\n')
  let embed = new Discord.MessageEmbed()
  .setColor('ff0000')
  .setAuthor(client.gif.sunucu+" 🍷")
  .setDescription(map||`Paylaşımda Bulunan Yok!`)
  message.channel.send(embed)   
      
   return 
  }
  
   	const sorted = message.guild.members.cache.filter(m=>db.has(`sayı.${m.user.id}`)&&!m.user.bot).array().sort((a, b) => { return (db.fetch(`sayı.${b.user.id}`) || 0) - (db.fetch(`sayı.${a.user.id}`) || 0) });
	const top10 = sorted.splice(0, args[0] || 10)
  var sira = 1
  const map = top10.map(s=>` **${sira++}-** <@!${s.user.id}> | Toplam: **${db.fetch(`sayı.${s.user.id}`)||0}** Paylaşım! (${db.fetch(`pp.${s.user.id}`)||0} **PP** ${db.fetch(`gif.${s.user.id}`)||0} **GİF**)`).join('\n')
  let embed = new Discord.MessageEmbed()
  .setColor('ff0000')
  .setAuthor(client.gif.sunucu+` 🍷`)
  .setDescription(map||`Paylaşımda Bulunan Yok!`)
  message.channel.send(embed)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'top',
}