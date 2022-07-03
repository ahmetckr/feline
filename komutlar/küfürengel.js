const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')

exports.run = async(client, message, args) => {
let veri = db.fetch(`küfürengel_${message.guild.id}`)
let ak = args[0]
if(!ak) return message.channel.send(`${e.çarpı} Lütfen **aç** veya **kapat** yaz!`)
if(ak !== "aç" && ak !== "kapat") return message.channel.send(`${e.çarpı} Lütfen **aç** veya **kapat** yaz!`)
if(ak === "aç") {
if(veri) return message.channel.send(`${e.çarpı} **Küfür Engel** sistemi zaten açık!`)
db.set(`küfürengel_${message.guild.id}`, `aktif`)
return message.channel.send(`${e.tik} **Küfür engel** sistemi başarıyla aktif edildi!`)
}
if(ak === "kapat") {
if(!veri) return message.channel.send(`${e.çarpı} **Küfür Engel** sistemi zaten kapalı!`)
db.delete(`küfürengel_${message.guild.id}`)
message.channel.send(`${e.tik} **Küfür Engel** sistemi başarıyla deaktif edildi!`)
}

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfür-engel"],
  permLevel: 0
};

exports.help = {
  name: 'küfürengel',
  description: 'küfür engeller.',
  usage: '++küfürengel <aç> / ++küfürengel <kapat>'
};

