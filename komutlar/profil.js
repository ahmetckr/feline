const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json')
const moment = require('moment')
const db = require('quick.db')
const e = require('../emojiler.json')
exports.run = async(client, message, args) => {

let kisi = message.mentions.users.first() || client.users.get(args[0]) || message.author 
let gold; 
let veri = db.fetch(`gold_${kisi.id}`)
if(veri) gold = "Gold Aktif!"
if(!veri) gold = "Gold Aktif Değil!"
let durums = kisi.presence.status
let türkçesiçokdahagüzel;
if(durums === "online") türkçesiçokdahagüzel = "Çevrimiçi" 
if(durums === "offline") türkçesiçokdahagüzel = "Çevrimdışı"
if(durums === "idle") türkçesiçokdahagüzel = "Boşta" 
if(durums === "dnd") türkçesiçokdahagüzel = "Rahatsız Etmeyin"
  
///////////////////////
let kişi = message.mentions.users.first() || message.author
let sahipr = db.fetch(`sahiprozet_${kişi.id}`)
let sponsorr = db.fetch(`sponsorrozet_${kişi.id}`)
let destekçir = db.fetch(`destekcirozet_${kişi.id}`)
let goldr = db.fetch(`goldrozet_${kişi.id}`)
let sahip;
let sponsor;
let destekçi;
let golddd;
if(!sahipr) sahip = ' Sahip Rozeti : Yok '
if(sahipr) sahip = `${e.sahiprozeti} Sahip` 
if(!sponsorr) sponsor = ' Sponsor Rozeti : Yok '
if(sponsorr) sponsor = `${e.sponsorrozeti} Sponsor`
if(destekçi) destekçi = `${e.destekcirozeti} Destekçi`
if(!destekçir) destekçi = ' Destekçi Rozeti : Yok '
if(!goldr) golddd = ' Gold Rozeti : Yok '
if(goldr) golddd = `${e.goldrozeti} Gold Üye`
///////////////

moment.locale("tr")
 let zaman = moment(kisi.createdTimestamp).format('LLLL')  
let kzaman = moment(kisi.joinedTimestamp).format('LLLL')  
 let mete = new Discord.RichEmbed()
.setAuthor(kisi.username, kisi.avatarURL)
.addField('Kullanıcı Bilgisi', '`ID:` '+kisi.id+'\n`Profil:` <@!'+kisi.id+'>\n`Durum:` '+türkçesiçokdahagüzel+'\n`Kuruluş Tarihi:` '+zaman+' \n `Gold Durumu:` ' + gold + '')  
.addBlankField()
.addField('Üyelik Bilgisi', '`Takma İsmi:` '+message.guild.members.get(kisi.id).displayName+'\n`Katılım Tarihi` '+kzaman+'\n`Rolleri:` '+message.guild.members.get(kisi.id).roles.filter(a => a.name !== "@everyone").map(g => g).join(`, `)+' \n `Rozetler:`\n' + sahip + '\n ' + sponsor + ' \n ' + destekçi + ' \n ' + golddd)

 .setColor("RANDOM")
.setFooter(client.user.username, client.user.avatarURL)
message.channel.send(mete)
  }
  


exports.conf = {
enabled: true, 
guildOnly: false, 
aliases: [], 
permLevel: 0 
};

exports.help = {
name: 'profil',
description: 'Profilini, profilinizi görüntülersiniz',
usage: '++profil / ++profil <@kişi>'
}


