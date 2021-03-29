const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;

    const devtr = new Discord.MessageEmbed()
        .setColor("ff0000")
    .setAuthor(`Gif Mast Sunucu Say!`)
    .setDescription(`${client.emojis.cache.get('788482253529022496')} Sunucuda **${message.guild.memberCount}** Kullanıcı Var!\n${client.emojis.cache.get('788482253529022496')} Çevrimiçi **${message.guild.members.cache.filter(m => !m.user.members && m.user.presence.status !== "offline").size}** Kullanıcı Var!\n${client.emojis.cache.get('788482253529022496')} Seste **${count}** Kullanıcı Var!`)
    message.channel.send(devtr);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sayı'],
    permLevel: 0
};

exports.help = {
    name: 'say',
    description: 'Say',
    usage: 'say'
};