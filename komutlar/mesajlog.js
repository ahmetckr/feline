const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json')
const moment = require('moment')
const db = require('quick.db')
let emojiler = require('../emojiler.json')

exports.run = async(client, message, args) => {

if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(` ${emojiler.n} | Bu işleme devam edebilmek için **Mesajları Yönet** yetkisine sahip olmalısın. `)

    
  let mete = args[0]
  if( mete !== "ayarla") if( mete !== "sıfırla") return message.channel.send( emojiler.n + " | Lütfen `ayarla` ya da `sıfırla` değerlerinden birini gir. ")
  if(mete === "ayarla") {
let veri = db.fetch(`mesajlog_${message.guild.id}`)
if(veri) return message.channel.send(emojiler.n + ' Mesaj-log sistemi zaten **aktif edilmiş**! Kapatmak için : `++mesaj-log kapat`')
   let kanal = message.mentions.channels.first()
   if(!kanal) return message.channel.send(emojiler.n  + " | `++mesaj-log ayarla #kanal` şeklinde bir kanal belirtmelisin. ") 
   message.channel.send( emojiler.y +  "| Mesaj log kanalı "  +  kanal  +  " olarak ayarlandı.")
   return db.set(`mesajlog_${message.guild.id}`, kanal.id)
  } 
    if(mete === "sıfırla") {
 let veri = db.fetch(`mesajlog_${message.guild.id}`)
if(!veri) return message.channel.send(emojiler.n + ' Mesaj-log sistemi zaten **aktif edilmemiş**! Açmak için : `++mesaj-log ayarla`')

      message.channel.send( emojiler.y  + " | Mesaj log kanalı sıfırlandı. ")
      db.delete(`mesajlog_${message.guild.id}`)
    }
  }
  


exports.conf = {
enabled: true, 
guildOnly: false, 
aliases: [], 
permLevel: 0 
};

exports.help = {
name: 'mesaj-log',
description: 'mesaj loglarını görüntülersiniz',
usage: '++mesaj-log'
}



 