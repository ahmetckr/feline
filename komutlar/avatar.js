const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')

exports.run = async(client, message, args) => {
let kişi = message.mentions.users.first() || client.users.get(f => f.username.includes(args[0])) || message.author
let embed = new Discord.RichEmbed()
.setDescription(`**${kişi.username}** adlı kişinin avatarı!`)
.setImage(kişi.avatarURL)
.setColor(v.embedrenk)
.setFooter(`${message.author.tag} tarafından ${kişi.tag} adlı kişinin avatarı istendi.`, client.user.avatarURL)
.setTimestamp()
message.channel.send(embed)


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pp"],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: 'avatarınızı görüntülersiniz!',
  usage: '++ayarlar'
};

