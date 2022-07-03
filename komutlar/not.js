const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json')
const moment = require('moment')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')
require('moment-duration-format')
exports.run = async (client, message, args) => {
let a = args[0]//bak, al // söyle knk//birden fazla mı olcak notlar bence 5 tane not tek alabilsin aynen mantıklı
if(!a) return message.channel.send("Lütfen seçenek belirt; `liste`,  `al`, `sil`")//ben yazam yaz kanka
if( a !== 'al' && a !== 'liste' && a !== 'sil' ) return message.channel.send("Lütfen seçenek belirt; `liste`,  `al`, `sil`")
if(a === "al") {
let not = args.slice(1).join(" ")
let k1 = db.fetch(`not1_${message.author.id}`)
let k2 = db.fetch(`not2_${message.author.id}`)
let k3 = db.fetch(`not3_${message.author.id}`)
let k4 = db.fetch(`not4_${message.author.id}`)
let k5 = db.fetch(`not5_${message.author.id}`)
let k1a = db.fetch(`not1t_${message.author.id}`) || 'Not Alınmamış'
let k2a = db.fetch(`not2t_${message.author.id}`) || 'Not Alınmamış'
let k3a = db.fetch(`not3t_${message.author.id}`) || 'Not Alınmamış'
let k4a = db.fetch(`not4t_${message.author.id}`) || 'Not Alınmamış'
let k5a = db.fetch(`not5t_${message.author.id}`) || 'Not Alınmamış'
let k1t;
if(!k1a) k1t = 'Olmayan notun tarihi olamaz.'
if(k1a) k1t = moment(k1a).add(3, "hours").format("LLLL")

let k2t;
if(!k2a) k2t = 'Olmayan notun tarihi olamaz.'//Eşkıya Dünyaya Hükümdar Olmaz daki söze benzedi :D :D :D :D
if(k2a) k2t = moment(k2a).add(3, "hours").format("LLLL")

let k3t;
if(!k3a) k3t = 'Olmayan notun tarihi olamaz.'
if(k3a) k3t = moment(k3a).add(3, "hours").format("LLLL")

let k4t;
if(!k4a) k4t = 'Olmayan notun tarihi olamaz.'//Adam(Bot) öldü ****************************
if(k4a) k4t = moment(k4a).add(3, "hours").format("LLLL")

let k5t;
if(!k5a) k5t = 'Olmayan notun tarihi olamaz.'
if(k5a) k5t = moment(k5a).add(3, "hours").format("LLLL")
  
if(!not) return message.channel.send(`Lütfen almak istediğin **not**u girer misin?`)
if(!k1) {
db.set(`not1_${message.author.id}`, not)
db.set(`not1t_${message.author.id}`, Date.now())
message.channel.send(' ✧ | **Not Alındı** \n\n » | **Not** : **' + not + '**')
}
if(k1) {
db.set(`not2_${message.author.id}`, not)
db.set(`not2t_${message.author.id}`, Date.now())
message.channel.send(' ✧ | **Not Alındı** \n\n » | **Not** : **' + not + '**')
}
if(k2) {
db.set(`not3t_${message.author.id}`, Date.now())
db.set(`not3_${message.author.id}`, not)
message.channel.send(' ✧ | **Not Alındı** \n\n » | **Not** : **' + not + '**')
}
if(k3) {// y
db.set(`not4_${message.author.id}`, not)
db.set(`not4t_${message.author.id}`, Date.now())
message.channel.send(' ✧ | **Not Alındı** \n\n » | **Not** : **' + not + '**')
}
  if(k4) {
db.set(`not5_${message.author.id}`, not)
db.set(`not5t_${message.author.id}`, Date.now())
message.channel.send(' ✧ | **Not Alındı** \n\n » | **Not** : **' + not + '**')
} // tamam not alma bitti şimdi silmeyi mi yapalım listelemeyi mi ?

  
}
  if(a === "sil") {
let not = args[1]
if(!not) return message.channel.send(' Silmek istediğin notun numarasını yazar mısın? ``++not sil 1``\n\n Notlarına bakmak için: ``++not liste``')
if(isNaN(not))return message.channel.send(' Silmek istediğin notun numarasını yazar mısın? ``++not sil 1``\n\n Notlarına bakmak için: ``++not liste``')//fetchlerin altına
let k1 = db.fetch(`not1_${message.author.id}`)
let k2 = db.fetch(`not2_${message.author.id}`)
let k3 = db.fetch(`not3_${message.author.id}`)
let k4 = db.fetch(`not4_${message.author.id}`)
let k5 = db.fetch(`not5_${message.author.id}`)
let k1a = db.fetch(`not1t_${message.author.id}`) 
let k2a = db.fetch(`not2t_${message.author.id}`) 
let k3a = db.fetch(`not3t_${message.author.id}`) 
let k4a = db.fetch(`not4t_${message.author.id}`) 
let k5a = db.fetch(`not5t_${message.author.id}`) 
let k1t;
if(!k1a) k1t = 'Olmayan notun tarihi olamaz.'
if(k1a) k1t = moment(k1a).add(3, "hours").format("LLLL")

let k2t;
if(!k2a) k2t = 'Olmayan notun tarihi olamaz.'//Eşkıya Dünyaya Hükümdar Olmaz daki söze benzedi :D :D :D :D
if(k2a) k2t = moment(k2a).add(3, "hours").format("LLLL")

let k3t;
if(!k3a) k3t = 'Olmayan notun tarihi olamaz.'
if(k3a) k3t = moment(k3a).add(3, "hours").format("LLLL")

let k4t;
if(!k4a) k4t = 'Olmayan notun tarihi olamaz.'//Adam(Bot) öldü ****************************
if(k4a) k4t = moment(k4a).add(3, "hours").format("LLLL")

let k5t;
if(!k5a) k5t = 'Olmayan notun tarihi olamaz.'
if(k5a) k5t = moment(k5a).add(3, "hours").format("LLLL")


if(not === '1') {
if(!k1) return message.channel.send(' Silmek istediğin not numarasında herhangi bir not yok.')
db.delete(`not1_${message.author.id}`)
db.delete(`not1t_${message.author.id}`) 
return message.channel.send(' **1** **Numaralı Notun Silindi!** \n\n **Not**: `' + k1 + '` \n **Not Alınma Tarihi** : `' + k1t + '`')
}
if(not === '2') {
if(!k2) return message.channel.send(' Silmek istediğin not numarasında herhangi bir not yok.')
db.delete(`not2_${message.author.id}`)
db.delete(`not2t_${message.author.id}`)
return message.channel.send(' **2** **Numaralı Notun Silindi!** \n\n **Not**: `' + k1 + '` \n **Not Alınma Tarihi** : `' + k2t + '`')
}
if(not === '3') {
if(!k3) return message.channel.send(' Silmek istediğin not numarasında herhangi bir not yok.')
db.delete(`not3_${message.author.id}`)
db.delete(`not3t_${message.author.id}`)
return message.channel.send(' **3** **Numaralı Notun Silindi!** \n\n **Not**: `' + k3 + '` \n **Not Alınma Tarihi** : `' + k3t + '`')
}
if(not === '4') {
if(!k4) return message.channel.send(' Silmek istediğin not numarasında herhangi bir not yok.')
db.delete(`not4_${message.author.id}`)
db.delete(`not4t_${message.author.id}`)
  return message.channel.send(' **4** **Numaralı Notun Silindi!** \n\n **Not**: `' + k4 + '` \n **Not Alınma Tarihi** : `' + k4t + '` ')
}
if(not === '5') {
if(!k5) return message.channel.send(' Silmek istediğin not numarasında herhangi bir not yok.')
db.delete(`not5_${message.author.id}`)
db.delete(`not5t_${message.author.id}`)
  return message.channel.send(' **5** **Numaralı Notun Silindi!** \n\n **Not**: `' + k5 + '`\n **Not Alınma Tarihi** : `' + k5t + '`')
}}
  
if(a === "liste") {
let k1 = db.fetch(`not1_${message.author.id}`) || '1 Numaralı Notu Verilerimde Bulamadım!'
let k2 = db.fetch(`not2_${message.author.id}`) || '2 Numaralı Notu Verilerimde Bulamadım!'
let k3 = db.fetch(`not3_${message.author.id}`) || '3 Numaralı Notu Verilerimde Bulamadım!'
let k4 = db.fetch(`not4_${message.author.id}`) || '4 Numaralı Notu Verilerimde Bulamadım!'
let k5 = db.fetch(`not5_${message.author.id}`) || '5 Numaralı Notu Verilerimde Bulamadım!'
let k1a = db.fetch(`not1t_${message.author.id}`) 
let k2a = db.fetch(`not2t_${message.author.id}`) 
let k3a = db.fetch(`not3t_${message.author.id}`) 
let k4a = db.fetch(`not4t_${message.author.id}`) 
let k5a = db.fetch(`not5t_${message.author.id}`) 
let k1t;
if(!k1a) k1t = 'Olmayan notun tarihi olamaz.'
if(k1a) k1t = moment(k1a).add(3, "hours").format("LLLL")

let k2t;
if(!k2a) k2t = 'Olmayan notun tarihi olamaz.'//Eşkıya Dünyaya Hükümdar Olmaz daki söze benzedi :D :D :D :D
if(k2a) k2t = moment(k2a).add(3, "hours").format("LLLL")

let k3t;
if(!k3a) k3t = 'Olmayan notun tarihi olamaz.'
if(k3a) k3t = moment(k3a).add(3, "hours").format("LLLL")

let k4t;
if(!k4a) k4t = 'Olmayan notun tarihi olamaz.'//Adam(Bot) öldü ****************************
if(k4a) k4t = moment(k4a).add(3, "hours").format("LLLL")

let k5t;
if(!k5a) k5t = 'Olmayan notun tarihi olamaz.'
if(k5a) k5t = moment(k5a).add(3, "hours").format("LLLL")
// fixed <3 gel bakalım şimdi descriptionu yapcam
// no wait
  
// SOHBET - CHAT //
//               //
//               //
// SOHBET - CHAT //  
let embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTimestamp()
.setThumbnail(message.author.avatarURL)
.setFooter(client.user.username, client.user.avatarURL)
.setDescription('Hey ``' + message.author.tag + '`` şu anda senin not defterini görüntülüyorum, eğer not defterinde değişiklikler yapmak istersen ``++not`` komutunu kullanabilirsin. \n\n » **1 Numaralı Not** : ' + k1 + ' \n • ** Not Alınma Tarihi ** : `' + k1t + '` \n\n » ** 2 Numaralı Not ** : ' + k2 + ' \n • ** Not Alınma Tarihi ** : `' + k2t + '` \n\n » **3 Numaralı Not** : ' + k3 + ' \n • **Not Alınma Tarihi** :`' + k3t + '` \n\n » **4 Numaralı Not** : ' + k4 + ' \n  • ** Not Alınma Tarihi ** : `' + k4t + '` \n\n » **5 Numaralı Not** : ' + k5 + ' \n • ** Not Alınma Tarihi ** : `' + k5t + '`')//Kanka tarihi ** gün önce tarzı yapabilir miyiz    yaparız da öyle çok kullanışlı olmaz ama her ikisiyle birlikte yaparız  aynen parantez denen bişe var                                                  
message.channel.send(embed)
}
} 
  /* SÜSLER
    », •,✧ 
  
  */

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'not',
    description: 'not alırsınız, silersiniz veya notlarınıza bakarsınız',
    usage: '++not <liste> / ++not al <notunuz> / ++not sil <1/2/3/4/5> '
}