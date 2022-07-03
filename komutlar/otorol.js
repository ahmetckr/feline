const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json')
const moment = require('moment')
const db = require('quick.db')
const e = require('../emojiler.json')
exports.run = async(client, message, args) => {
if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send('Otorol sistemini ayarlayabilmek için **rolleri yönet** yetkisine sahip olmalısın.') //bura doğru muydu
  if(!args[0]) return message.channel.send(`Lütfen \`kullanıcı\`, \`bot\` ya da \`sıfırla\` yazar mısın?`)
  if(args[0] !== 'kullanıcı' && args[0] !== 'bot' && args[0] !== "sıfırla") return message.channel.send('Lütfen ``kullanıcı``, ``bot`` ya da ``sıfırla`` yazar mısın? ')

  if(args[0] === "sıfırla") {
   let kullanıcır = db.fetch(`otorolkullanıcırol_${message.guild.id}`) 
 let kullanıcık = db.fetch(`otorolkullanıcıkanal_${message.guild.id}`)
let botr = db.fetch(`otorolbotrol_${message.guild.id}`)
let botk = db.fetch(`otorolbotkanal_${message.guild.id}`)
 



    let kb = args[1]
    if(!kb) return message.channel.send(`Lütfen **kullanıcı**, **bot** yada **hepsi** yazar mısın?`)
    if(kb !== "kullanıcı" && kb !== "bot" && kb !== "hepsi") return message.channel.send(`Lütfen **kullanıcı**, **bot** yada **hepsi** yazar mısın?`)
  
  
  
  
  
  
  
  if(kb === "hepsi") {
if(!kullanıcır && !kullanıcık) return message.channel.send(`Kullanıcılar için otorol sistemi **zaten inaktif**!`)    
if(!botr && !botk) return message.channel.send(`Botlar için otorol sistemi **zaten inaktif**!`)  
  
  db.delete(`otorolkullanıcırol_${message.guild.id}`) 
  db.delete(`otorolkullanıcıkanal_${message.guild.id}`)
  db.delete(`otorolbotrol_${message.guild.id}`)
  db.delete(`otorolbotkanal_${message.guild.id}`)
  message.channel.send(`${e.tik} Otorol sistemi başarıyla hem **botlar** hem de **kullanıcılar** için sıfırlandı.`)
  }

// bokak a   
if(kb === 'bot') {

let kontrol = db.fetch(`otorolbotrol_${message.guild.id}`)

if(!kontrol) return message.channel.send(' Botlar için otorol sistemi **zaten inaktif**! ')
  db.delete(`otorolkullanıcıkanal_${message.guild.id}`)
  db.delete(`otorolbotrol_${message.guild.id}`)
message.channel.send(e.tik+'| Otorol sistemi **botlar** için ``inaktif`` hale getirildi!')
}
if(kb === 'kullanıcı') {
let kontrol = db.fetch(`otorolkullanıcırol_${message.guild.id}`)

if(!kontrol) return message.channel.send(' Kullanıcılar için otorol sistemi **zaten inaktif**! ')
db.delete(`otorolkullanıcıkanal_${message.guild.id}`)
db.delete(`otorolkullanıcırol_${message.guild.id}`)
message.channel.send(' Otorol sistemi **kullanıcılar** için ``inaktif`` hale getirildi!')
}
  
  }

  if(args[0] === 'kullanıcı') {
let kontrol = db.fetch(`otorolkullanıcırol_${message.guild.id}`)
let kontrol1 = db.fetch(`otorolkullanıcıkanal_${message.guild.id}`)
if(kontrol) return message.channel.send(' Kullanıcılar için otorol sistemi **zaten aktif**! \n\n **Sistem Bilgileri** \n Kullanıcı Rolü : ``' + kontrol.name + '`` \n Kullanıcı Log Kanalı : ``' + kontrol1.name + '``')
let rol = message.mentions.roles.first()
if(!rol) return message.channel.send(' Lütfen işleme devam etmek için **kullanıcılara verilecek rolü** etiketler misin? ')
let kanal = message.mentions.channels.first()
if(!kanal) return message.channel.send(' Lütfen işleme devam etmek için **kullanıcılar için log kanalını** etiketler misin? ')
  db.set(`otorolkullanıcırol_${message.guild.id}`, rol.id)
  db.set(`otorolkullanıcıkanal_${message.guild.id}`, kanal.id)
message.channel.send(' Otorol sistemi kullanıcılar **aktif edildi!** \n\n **Sistem Bilgileri** \n Kullanıcı Rolü : ``' + rol.name + '`` \n Kullanıcı Log Kanalı : ``' + kanal.name + '``')
}

  
  if(args[0] === "bot") {
let botrol = message.mentions.roles.first()
if(!botrol) return message.channel.send(`Lütfen işleme devam etmek için **botlara verilecek rolü** etiketler misin?`) 
let kanal = message.mentions.channels.first()
if(!kanal) return message.channel.send(` Lütfen işleme devam etmek için **botlar için log kanalını** etiketler misin? `)
db.set(`otorolbotrol_${message.guild.id}`, botrol.id)
db.set(`otorolbotkanal_${message.guild.id}`, kanal.id)
message.channel.send(' Otorol sistemi kullanıcılar **aktif edildi!** \n\n **Sistem Bilgileri** \n Kullanıcı Rolü : ``' + botrol.name + '`` \n Kullanıcı Log Kanalı : ``' + kanal.name + '``')// kanal ayarlamadın aa doğru // kanka benim mesaj gibi yapsana
  }
  
  }
  


exports.conf = {
enabled: true, 
guildOnly: false, 
aliases: [], 
permLevel: 0 
};

exports.help = {
name: 'otorol',
description: 'ayarladığınız kullanıcı, bot rolünü, ayarladığınız kullanıcı, bot log kanalına kullanıcı yada bot girince rol verir ve log kanalına atar.',
'usage': '++otorol <kullanıcı/bot> <@rol> <#kanal>'
}


