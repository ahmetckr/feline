const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json')
const moment = require('moment')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')
exports.run = async(client, message, args) => {
if(message.author.id !== '708827616584531998' && message.author.id !== '369855905162067988') {
    return message.reply(e.tik+' yetersiz yetki!')
}
let grol = client.guilds.get("735916019578568715").roles.get(v.grol)
let eç = args[0]
if(!eç) return message.channel.send(`Merhaba sahibim! Lütfen **ekle** ya da **çıkar** yazabilir misin?`)
if(args[0] === 'ekle') {
let kişi = message.mentions.users.first() || client.users.get(args[1]) 
if(!kişi) return message.channel.send(` Hey! Lütfen bir **kişi** belirtir misin?`)
  
db.set(`gold_${kişi.id}`, Date.now())
message.guild.members.get(kişi.id).addRole(grol.id)
  message.channel.send(e.tik+" **"+kişi.tag+"** adlı kişiye **Gold Üye** avantajlarını verdim.")

client.channels.get(v.glog).send(e.tik+" **"+kişi.tag+"** adlı kişiye **"+message.author.username+"** adlı sahibim tarafından **Gold Üye** avantajları eklendi!")
}
if(eç === "çıkar") {
let kişi = message.mentions.users.first() || client.users.get(args[1]) 
if(!kişi) return message.channel.send(` Hey! Lütfen bir **kişi** belirtir misin?`)
  
db.delete(`gold_${kişi.id}`)
message.guild.members.get(kişi.id).removeRole(grol.id)
message.channel.send(e.tik+" **"+kişi.tag+"** adlı kişiyi başarıyla goldluktan çıkardım.")

client.channels.get(v.glog).send(e.tik+" **"+kişi.tag+"** adlı kişi **"+message.author.username+"** adlı sahibim tarafından **Gold Üyelikten** çıkarıldı.")
}
}

exports.conf = {
enabled: true, 
guildOnly: false, 
aliases: [], 
permLevel: 0 
};

exports.help = {
name: 'gold',
description: 'gold verir alır',
'usage': '++gold ver <@kişi> / ++gold al <@kişi>'
}

