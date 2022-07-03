const Discord = require('discord.js')
const matessa = require('../ayarlar.json')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')

exports.run = async(client, message, args) => {
if(!message.member.hasPermissions('MANAGE_NICKNAMES')) return message.channel.send(e.çarpı + ' Bu işleme devam edebilmek için **Kullanıcı İsimlerini Yönet** yetkisine sahip olmalısın.')
let tag = args[0]
let kanal = message.mentions.channels.first()
if(!tag) return message.channel.send(e.çarpı + ' İşleme devam etmek için lütfen bir **tag** belirtin.')
if(tag.length > 3) return message.channel.send(e.çarpı + ' Tagınız 3 haneden büyük **olamaz**.')
if(!kanal) return message.channel.send(e.çarpı + ' Lütfen **Ototag Log** kanalını belirtin.')
db.set(`ototagtag_${message.guild.id}`, tag)
db.set(`ototagkanal_${message.guild.id}`, kanal.id)
  message.channel.send(e.tik + ' İşlem tamamlandı! \n **Sistem Özellikleri** \n\n Ototag Tag : `' + tag + '` \n Ototag Tag Log : ' + kanal + '')
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ototag',
  description: 'ayarladığınız tagı her gelenin adının başına yazar',
  usage: '++ototag'
};

