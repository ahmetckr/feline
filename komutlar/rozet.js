const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json')
const moment = require('moment')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')

exports.run = async(client, message, args) => {
if(message.author.id !== ayarlar.sahip && message.author.id !== ayarlar.sahip2) return message.channel.send(e.çarpı+" Bu komut Sahip(ler)ime özel!")
let va = args[0]
if(!va && va !== "ver" && va !== "al") return message.channel.send(e.çarpı+" Lütfen seçenek belirt; `ver`, `al`")
let kişi = message.mentions.users.first() || client.users.get(args[1])
if(!kişi) return message.channel.send(e.çarpı+" Bir kişi belirt") // kişi.bot artık çalışmıyor kişi.bot === true çalışıyor
let rozet = args[2]
  let rozetler = ["gold", "sponsor", "sahip", "destekçi"]
if(rozet !== rozetler && !rozet) return message.channel.send(e.çarpı+" Lütfen rozet girin") // bu ver'in altında olmucak mı yo
let sahipr = db.fetch(`sahiprozet_${kişi.id}`)
let sponsorr = db.fetch(`sponsorrozet_${kişi.id}`)
let destekçir = db.fetch(`destekcirozet_${kişi.id}`)
let goldr = db.fetch(`goldrozet_${kişi.id}`)
  if(va === "ver") { 
if(rozet === "gold") {
if(goldr) return message.channel.send(e.çarpı+" Bu rozet zaten var almak için; `++rozet al`")
db.set(`goldrozet_${kişi.id}`, `aktif`)
message.channel.send(e.tik+" rozet başarıyla **"+kişi.username+"** kullanıcıya verildi!")
}
    
if(rozet === "destekçi") {
if(destekçir) return message.channel.send(e.çarpı+" Bu rozet zaten var almak için; `++rozet al`")
db.set(`destekcirozet_${kişi.id}`, 'aktif')
message.channel.send(e.tik+" rozet başarıyla **"+kişi.username+"** kullanıcıya verildi!")
}    
    
if(rozet === "sponsor") {
if(sponsorr) return message.channel.send(e.çarpı+" Bu rozet zaten var almak için; `++rozet al`")
db.set(`sponsorrozet_${kişi.id}`, `aktif`)
message.channel.send(e.tik+" rozet başarıyla **"+kişi.username+"** kullanıcıya verildi!")
}    

if(rozet === "sahip") {
if(sahipr) return message.channel.send(e.çarpı+" Bu rozet zaten var almak için; `++rozet al`")
db.set(`sahiprozet_${kişi.id}`, `aktif`)
message.channel.send(e.tik+" rozet başarıyla **"+kişi.username+"** kullanıcıya verildi!")
}}

  if(va === "al") { 
if(rozet === "gold") {
if(!goldr) return message.channel.send(e.çarpı+" Bu rozet zaten yok almak için; `++rozet ver`")
db.delete(`goldrozet_${kişi.id}`)
message.channel.send(e.tik+" rozet başarıyla **"+kişi.username+"** adlı kullanıcıdan alındı!")
}
    
if(rozet === "destekçi") {
if(!destekçir) return message.channel.send(e.çarpı+" Bu rozet zaten yok almak için; `++rozet al`")
db.delete(`destekçirozet_${kişi.id}`)
message.channel.send(e.tik+" rozet başarıyla **"+kişi.username+"** adlı kullanıcıdan alındı!")
}    
    
if(rozet === "sponsor") {
if(!sponsorr) return message.channel.send(e.çarpı+" Bu rozet zaten yok almak için; `++rozet al`")
db.delete(`sponsorrozet_${kişi.id}`, `aktif`)
message.channel.send(e.tik+" rozet başarıyla **"+kişi.username+"** adlı kullanıcıdan alındı!")
}    

if(rozet === "sahip") {
if(!sahipr) return message.channel.send(e.çarpı+" Bu rozet zaten yok almak için; `++rozet al`")
db.delete(`sahiprozet_${kişi.id}`)
message.channel.send(e.tik+" rozet başarıyla **"+kişi.username+"** adlı kullanıcıdan alındı!")
}}  
  
}
exports.conf = {
enabled: true, 
guildOnly: false, 
aliases: [], 
permLevel: 0 
};

exports.help = {
name: 'rozet',
description: 'sahiplerin kullanıcılara rozet verebileceği bir komut',
usage: '++rozet <ver/al> <@kişi> <rozet adı> '
}


