const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')

exports.run = async(client, message, args) => {
let veri = db.fetch(`reklamengel_${message.guild.id}`)
let ak = args[0]
if(!ak) return message.channel.send(`${e.çarpı} Lütfen **aç** veya **kapat** yaz!`)
if(ak !== "aç" && ak !== "kapat") return message.channel.send(`${e.çarpı} Lütfen **aç** veya **kapat** yaz!`)
if(ak === "aç") {
if(veri) return message.channel.send(`${e.çarpı} **Reklam Engel** sistemi zaten açık!`)
db.set(`reklamengel_${message.guild.id}`, `aktif`)
return message.channel.send(`${e.tik} **Reklam engel** sistemi başarıyla aktif edildi!`)
}
if(ak === "kapat") {
if(!veri) return message.channel.send(`${e.çarpı} **Reklam Engel** sistemi zaten kapalı!`)
db.delete(`reklamengel_${message.guild.id}`)
message.channel.send(`${e.tik} **Reklam Engel** sistemi başarıyla inaktif edildi!`)
}

}; //dc baksana

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reklam-engel"],
  permLevel: 0
};

exports.help = {
  name: 'reklamengel',
  description: 'sunucunuzdaki reklamları engeller',
  usage: '++reklamengel <aç/kapat>'
};

