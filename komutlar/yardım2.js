const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')

exports.run = async(client, message, args) => {
let linkler = "[Sunucuna Ekle](https://discord.com/oauth2/authorize?client_id=735875810560573460&scope=bot&permissions=1543842999) **-** [Destek Sunucusu](https://discord.gg/NMaQCBk)"
let resim = "https://media.discordapp.net/attachments/737635204834787361/737740374143008888/4.jpg?width=1442&height=376"
let embed = new Discord.RichEmbed()
.setColor('ORANGE')
.setThumbnail(client.user.avatarURL)
.setFooter(client.user.username + ' tüm hakları sakldır.' , message.guild.iconURL)
.setAuthor(message.author.username + ' | Yardım ', message.author.avatarURL)
.setImage(resim)
.setDescription(e.tada + ' Yardım menüsüne hoş geldin `' + message.author.tag + '` \n ' + e.unitro + ' Bir komut hakkında bilgi almak için: `++komut-bilgi <komut-adı>` kullanabilirsin!\n ' + e.yuv + ' Ping değerim **' + client.ping.toFixed(2) + 'ms** olarak ölçüldü.\n \n\n ' + e.cekic + ' • ``++yardım yetkili`` - Yetkili Komutları \n ' + e.sa + ' • ``++yardım kullanıcı`` - Kullanıcı Komutları \n ' + e.kk + '• ``++yardım kayıt`` - Kayıt Sistemi Komutları \n ' + e.parti + ' • ``++sponsor`` - Sponsorumuz hakkında bilgi alın! \n\n '+linkler)                  

message.channel.send(embed)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yardım2"],
  permLevel: 0
};

exports.help = {
  name: 'y2',
  description: 'yakında olacak olan yardım menüsü',
  usage: '++yardım2'
};

