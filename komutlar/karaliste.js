const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json')
const moment = require('moment')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')
exports.run = async(client, message, args) => {
if(message.author.id !== '708827616584531998') {
if(message.author.id !== '369855905162067988') {
    return message.reply(':x: yetersiz yetki!')
}}
let eç = args[0]
if(!eç) return message.channel.send(`Merhaba sahibim! Lütfen **ekle** ya da **çıkar** yazabilir misin?`)
if(args[0] === 'ekle') {
let kişi = message.mentions.users.first() || client.users.get(args[1]) 
if(!kişi) return message.channel.send(` Hey! Lütfen bir **kişi** belirtir misin?`)
let sebep = args.slice(2).join(" ") || "Belirtmemiş." 

db.set(`karaliste_${kişi.id}`, sebep)
db.set(`karalistezaman_${kişi.id}`, Date.now())  
  
message.channel.send(e.tik+' Başarıyla **'+kişi.tag+"** adlı kişiyi **"+sebep+"** sebebinden dolayı karalisteye aldım. Artık beni **kullanamayacak**!")

client.channels.get(v.klog).send(`${kişi.tag} adlı kullanıcı **${message.author.tag}** isimli sahibim tarafından ${sebep} sebebi ile kara listeye alındı! Artık beni **kullanamayacak**!`)
kişi.send('Hey **' + kişi.tag + '**, ``' + message.author.tag + '`` isimli sahibim tarafından **' + sebep + '** sebebi ile karalisteye alındın! Artık beni **kullanamayacaksın**!')
}
if(eç === "çıkar") {
  let kişi = message.mentions.users.first() || client.users.get(args[1]) 
if(!kişi) return message.channel.send(` Hey! Lütfen bir **kişi** belirtir misin?`)

db.delete(`karaliste_${kişi.id}`)
db.delete(`karalistezaman_${kişi.id}`)  
let sebep = db.fetch(`karaliste_${kişi.id}`) || "Belirtilmemiş."
message.channel.send(e.tik+' Başarıyla **'+kişi.tag+"** adlı kişiyi karalisteden aldım. Artık beni **kullanabilecek**!")

client.channels.get(v.klog).send(`${kişi.tag} adlı kullanıcı **${message.author.tag}** isimli sahibim tarafından ${sebep} sebebi ile karalisteden çıkarıldı! Artık beni **kullanabilecek**!`)
kişi.send('Hey **' + kişi.tag + '**, ``' + message.author.tag + '`` isimli sahibim tarafından **' + sebep + '** sebebi ile karalisteden çıkartıldın! Artık beni **kullanabileceksin.**!')

}
}

exports.conf = {
enabled: true, 
guildOnly: false, 
aliases: ["kl"], 
permLevel: 0 
};

exports.help = {
name: 'karaliste',
description: 'karalisteye alır veya çıkarır',
'usage': '++kl ekle <@kişi> / ++kl çıkar <@kişi>'
}

