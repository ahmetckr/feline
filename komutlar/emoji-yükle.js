const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const emojiler = require('../emojiler.json')
const v = require('../veriler.json')

exports.run = async(client, message, args) => {
if(!message.member.hasPermission("MANAGE_EMOJIS")) return message.channel.send(` ${emojiler.n} | Bu işleme devam edebilmek için **Emojileri Yönet** yetkisine sahip olmalısın. `)
let isim = args[0]
let url = args[1]
let k = [ "ğ", "Ğ", "ç", "Ç", "ş", "Ş", "ü", "Ü", "ö", "Ö", "ı", "İ", '@', '<' , '>' , '*' , '-' ]
if(!isim) return message.channel.send(emojiler.çarpı + ' Sunucunuza emoji ekleyebilmem için emojinin ismini ve urlsini yazmanız gerek! `++emoji-yükle isim url`')
  if(isim.includes(k)) return message.channel.send("Discord emojilerinde **Türkçe Karakter** kullanımı yasaklandı.")
if(!url) return message.channel.send(emojiler.çarpı + ' Sunucunuza emoji ekleyebilmem için emojinin ismini ve urlsini yazmanız gerek! `++emoji-yükle isim url`')
message.guild.createEmoji(url, isim)
let a = message.guild.emojis.find( e => e.name === isim)
message.channel.send(emojiler.tik + " Emojiniz başarıyla ** " +isim+ " ** ismi ile eklendi! " + a)

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'emoji-yükle',
  description: 'Sunucunuza emoji yüklersiniz',
  usage: '++emoji-yükle'
};

 
