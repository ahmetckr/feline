const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json')
const moment = require('moment')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')
exports.run = async(client, message, args) => {
if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('Sayaç sistemini ayarlayabilmek için **sunucuyu yönet** yetkisine sahip olmalısın.')
if(args[0] !== 'ayarla' && args[0] !== 'sıfırla') return message.channel.send(' Lütfen ``ayarla`` ya da ``sıfırla`` yazabilir misin?')
  if(args[0] === 'ayarla') {
if(!args[1]) return message.channel.send(' Lütfen **hedef sayaç sayısı**nı yazabilir misin?') 
if(isNaN(args[1])) return message.channel.send(' Lütfen **hedef sayaç sayısı**nı yazabilir misin?') 
if(message.guild.memberCount >= args[1]) return message.channel.send('**Hedef sayaç sayısı** sunucudaki kişi sayısından **yüksek** olmak zorunda.')
if(!message.mentions.channels.first()) return message.channel.send('Lütfen **sayaç log** kanalını etiketler misin?')
db.set(`sayaçkanal_${message.guild.id}`, message.mentions.channels.first().id)
db.set(`sayaçsayı_${message.guild.id}`, args[1])
message.channel.send('Sayaç sistemi **aktif** hale getirildi. \n\n **Sistem Özellikleri** \n Sayaç Kanalı : ``' + message.mentions.channels.first().name + '`` \n Sayaç Sayısı : ``' + args[1] + '``')
}
if(args[0] === 'sıfırla') {
let kontrol = db.fetch(`sayaçkanal_${message.guild.id}`)
if(!kontrol) return message.channel.send(' Sayaç sistemi **zaten inaktif** halde!')
db.delete(`sayaçkanal_${message.guild.id}`)
db.delete(`sayaçsayı_${message.guild.id}`) 
message.channel.send(`Sayaç sistemi **inaktif** hale getirildi! Tekrar aktif hale getirmek istersen: \`++sayaç\``) //istemezsen sileyim o  \yok yok çok iyi yakıştı gel sunucuy`oa k
}
}

exports.conf = {
enabled: true, 
guildOnly: false, 
aliases: [], 
permLevel: 0 
};

exports.help = {
name: 'sayaç',
description: 'bir hedef belirlersiniz ve o hedefe kadar gelen kişileri sayar hedefe ulaşınca sayaçı sıfırlar!',
'usage': '++sayaç <ayarla/sıfırla> <sayı> <#kanal>'
}

