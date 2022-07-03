const Discord = require('discord.js')
const matessa = require('../ayarlar.json')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')

exports.run = async(client, message, args) => {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${e.çarpı} Bu komutu kullanabilmek için \`Mesajları Yönet\` yetkisine sahip olman gerekiyor.`)
let sayı = args[0]
if(!sayı) return message.channel.send(e.çarpı+" Lütfen bir sayı gir.")
if(isNaN(sayı)) return message.channel.send(e.çarpı+" Lütfen bir sayı gir.")
if(sayı > 100) return message.channel.send(e.çarpı+" Lütfen **100 sayısından küçük bir sayı** gir.")


message.channel.bulkDelete(sayı)
message.channel.send(e.tik+" Başarıyla **"+sayı+"** tane mesajı sildim.").then(a => a.delete(3000))
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["temizle"],
  permLevel: 0
};

exports.help = {
  name: 'sil',
  description: 'belirttiğiniz kadar mesaj siler.',
  usage: '++sil <0-100>'
};

