const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')

exports.run = async(client, message, args) => {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(` ${e.n} Bu işleme devam edebilmek için **Mesajları Yönet** yetkisine sahip olmalısın.`)
let ak = args[0]
let veri = db.fetch(`saas_${message.guild.id}`)
if(!ak) return message.channel.send(`${e.çarpı} Lütfen aç veya kapat yaz!`)
if(ak !== "aç" && ak !== "kapat") return message.channel.send(`${e.çarpı} Lütfen **aç** veya **kapat** yazar mısın.`)
if(ak === "aç") {
  if(veri) return message.channel.send(`${e.çarpı} **Oto-as** filtresi zaten **açık**!`) // Oto-as daha havalı ama sen bilirsin :D // sa - as 'ın anlamı çok yanlış oluyor kanka dine hakarete giriyo ben yeni öğrendim onu'
db.set(`saas_${message.guild.id}`, `Aktif`)
message.channel.send(`${e.tik} **oto-as** filtresi başarıyla açıldı!`)
}
if(ak === "kapat") {
if(!veri) return message.channel.send(`${e.çarpı} **Oto-as** filtresi zaten **kapalı**!`)
db.delete(`saas_${message.guild.id}`)
message.channel.send(`${e.tik} **Oto-as** başarıyla kapatıldı!`)
}
  
}; 

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'oto-as',
  description: 'otomatik aleyküm selam der.',
  usage: '++oto-as <aç/kapat>'
};

