const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')
const moment = require('moment')
require('moment-duration-format')
exports.run = async(client, message, args) => {
if(message.author.id !== '708827616584531998') {
if(message.author.id !== '369855905162067988') {
    return message.reply(e.çarpı+" Bu komut sahibime özel")
}}
let ak = args[0]
if(!ak) return message.channel.send(`${e.çarpı} Lütfen **aç** ya da **kapat** yazar mısın?`)
if(ak !== "aç" && ak !== "kapat") return message.channel.send(`${e.çarpı} Lütfen **aç** ya da **kapat** yazar mısın?`)
let bakım = db.fetch(`bakım`)
let bakımz = db.fetch(`bakımzamanı`)
moment.locale("tr")
  if(ak === "aç") {
if(bakım) return message.channel.send(e.çarpı+" Bakım zaten açık")
    let sebep = args.slice(1).join(" ")
if(!sebep) return message.channel.send(e.çarpı+ " Lütfen bir sebep gir")
db.set(`bakım`, sebep)
db.set(`bakımzamanı`, Date.now())
message.channel.send(e.tik+" Bakım modu başarıyla açıldı!\n\n__**✧ Veriler ✧**__\n• Bakım tahmini bitme tarihi: **"+moment().add(6, "hour").format("LLLL")+"**\n» Bakımı açan sahibim: **"+message.author.tag+"**")                                   
}
if(ak === "kapat") {
if(!bakım) return message.channel.send(e.çarpı+" Bakım zaten kapalı")
db.delete(`bakım`)
db.delete(`bakımzamanı`)
message.channel.send(e.tik+" Bakım modu başarıyla kapatıldı\n\n__**✧ Veriler ✧ **__\n• Bakım tahmini bittiği tarih: **"+moment(bakımz).add(6, "hour").format('LLLL')+"**\n» Normalde bitiş tarihi: **"+moment().add(3, "hour").format("LLLL")+"** \n\n» Bakımı bitiren sahibim: **"+message.author.tag+"**")
  
  /* SÜSLER
    », •,✧ 
  
  */
}
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'bakım',
  description: 'Bakımı açıp kapatırsınız',
  usage: '++bakım'
};

