const Discord = require("discord.js")
const client = new Discord.Client()
const ayarlar = require("./ayarlar.json")
const chalk = require("chalk")
const fs = require("fs")
const moment = require("moment")
const db = require("quick.db")
const request = require("request")
const ms = require("parse-ms")
const express = require("express")
const http = require("http")
const app = express()
const logs = require("discord-logs")
require("moment-duration-format")
logs(client)
require("./util/eventLoader")(client)
var prefix = ayarlar.prefix
const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};
////commands

client.gif = {
  kategoriler: ["","","","","","","","","","","",""], ///Mevcut gif kanallarının idleri eğer daha çok varsa ,"" şeklinde uzatabilirsiniz.
  log: "", //Gif Loglarının atılacağı yer
  sunucu: "Sunucunun ismi", //Sunucunuzun İsmi
  rastgele: {
    PP: "", //Random PP Kanal ID
    GIF: "" //Random Gif Kanal ID
  }
  
}
client.commands = new Discord.Collection(); 
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.on('message', async msg =>{

  let categories = client.gif.kategoriler
  
  if(msg.attachments.size == 0&&categories.includes(msg.channel.parentID)){
  
  if(msg.author.bot) return;
  
  msg.delete({timeout:500})
  
  msg.reply('Bu Kanal PP/GİF Dışında Şeye Kapalıdır!').then(m=>m.delete({timeout:5000}))

}
  if(msg.attachments.size > 0 && categories.includes(msg.channel.parentID)){

  db.add(`sayı.${msg.author.id}`,msg.attachments.size)
  let emojis = ["🍷"]
  var random = Math.floor(Math.random()*(emojis.length));
  let pp = 0
  let gif = 0
  msg.attachments.forEach(atch=>{
   if(atch.url.endsWith('.webp')||atch.url.endsWith('.png')||atch.url.endsWith('.jpeg')||atch.url.endsWith('.jpg')){
     db.add(`pp.${msg.author.id}`,1)
     pp = pp + 1
   }
    if(atch.url.endsWith('.gif')){
     db.add(`gif.${msg.author.id}`,1)
      gif = gif +1
    }
  })
  let mesaj = ``
  if(gif > 0 && pp === 0){
    mesaj = `${gif} gif`
  }
if(pp > 0 && gif === 0){
    mesaj = `${pp} pp`
  }
if(gif > 0 && pp > 0){
    mesaj = `${pp} pp, ${gif} gif`
  }
  client.channels.cache.get(client.gif.log).send(new Discord.MessageEmbed().setColor('ff0000').setAuthor(`🌙 ${client.gif.sunucu} 🌙`).setDescription(`${emojis} **Gönderen:** ${msg.author} \`(${msg.author.id})\`\n**Gönderilen Kanal:** <#${msg.channel.id}> \`(${msg.channel.id})\`\n**Gönderilen:** \`${mesaj}\` Gönderilmiştir!\n**Toplam Gönderilen:** \`${db.fetch(`sayı.${msg.author.id}`)||0} PP/Gif\` Gönderilmiş!`))
}
})

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.on("userUpdate", async(eski, yeni) => {
  if(eski.avatarURL() === yeni.avatarURL()) return;
  let avatar = (yeni.avatarURL({dynamic:true,size:1024})).split("?")[0];
  if((avatar).endsWith(".gif")) {
    client.channels.cache.get(client.gif.rastgele.PP).send(new Discord.MessageEmbed().setColor('ff0000').setFooter(`${yeni.tag}`).setImage(avatar));
  } else {
    client.channels.cache.get(client.gif.rastgele.GIF).send(new Discord.MessageEmbed().setColor('ff0000').setFooter(`${yeni.tag}`).setImage(avatar));
  };
});
console.log('Bot Başarıyla Bağlandı!')
client.login(ayarlar.token).catch(err=> console.error('Tokeni Yenileyip Tekrar Girin'));
