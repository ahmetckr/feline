const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')

exports.run = async(client, message, args) => {
let embed = new Discord.RichEmbed()
.setTitle("Feline'yi Sunucuna ekle")
.setTimestamp()
.setDescription("Felineyi eklemek istemen bizi mutlu etti! işte davet linkleri! \n\n[ Feline'yi edin!](https://discord.com/oauth2/authorize?client_id=735875810560573460&scope=bot&permissions=1543842999) - [Feline'nin sunucusuna katıl](https://discord.gg/dNGgRf8) - [Feline'ye oy ver!](https://top.gg/bot/735875810560573460)")                               
.setColor("RANDOM")
message.channel.send(embed) //dc
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ekle"],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Felineyi davet edersiniz!',
  usage: '++davet'
};

