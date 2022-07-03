const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json')
const moment = require('moment')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')
exports.run = async(client, message, args) => {

/////////////////////////////////////////OTOROL
let otorolk;
let otorolkr;
let otorolb;
let otorolbr;
let kullanıcır = db.fetch(`otorolkullanıcırol_${message.guild.id}`) 
let kullanıcık = db.fetch(`otorolkullanıcıkanal_${message.guild.id}`)
let botr = db.fetch(`otorolbotrol_${message.guild.id}`)
let botk = db.fetch(`otorolbotkanal_${message.guild.id}`)
if(kullanıcır) otorolkr = `${e.açık} <@&${kullanıcır}>` // KULLANICI ROL
if(!kullanıcır) otorolkr = `${e.kapalı} **Kapalı**`  // KULLANICI ROL
if(botr) otorolbr = `${e.açık} <@&${botr}>` // BOT ROL
if(!botr) otorolbr = `${e.kapalı} **Kapalı**` // BOT ROL
if(kullanıcık) otorolk = `${e.açık} <#${kullanıcık}>` // KULLANICI LOG KANAL
if(!kullanıcık) otorolk = `${e.kapalı} **Kapalı**` // KULLANICI LOG KANAL
if(botk) otorolb = `${e.açık} <#${botk}>`
if(!botk) otorolb = `${e.kapalı} **Kapalı**`
///////////////////////////////////////////

////////////////////////////////MESAJ LOG///////////////////////////////////////
let mesajlog;
let mesajlogkanal;
let veri = db.fetch(`mesajlog_${message.guild.id}`)
if(veri) mesajlog = `${e.açık} **Açık**`
if(!veri) mesajlog = `${e.kapalı} **Kapalı**`
if(veri) mesajlogkanal = `${e.açık} <#${veri}>`
if(!veri) mesajlogkanal = `${e.kapalı} **Kapalı**`
//////////////////////////////MESAJ LOG///////////////////////////////////////

//////////////////////////////////SA-AS/////////////////////////////////////////
let saas;
let veri2 = db.fetch(`saas_${message.guild.id}`)
if(veri2) saas = `${e.açık} **Açık**`
if(!veri2) saas = `${e.kapalı} **Kapalı**`// sayaçı yapar mısın bundan sonra//tek o kalıyo ztn // oto tag da var
//////////////////////////////////////SA-AS////////////////////////////////////


///////////////////////////SAYAÇ////////////////////////////////////
let sayaç;
let sayaçkanal;
let a = db.fetch(`sayaçkanal_${message.guild.id}`)
let ab = db.fetch(`sayaçsayı_${message.guild.id}`) 
if(a) sayaçkanal = `${e.açık} <#${a}>`
if(!a) sayaçkanal = `${e.kapalı} **Kapalı**`
if(ab) sayaç = `${e.açık} **${ab}**`
if(!ab) sayaç = `${e.kapalı} **Kapalı**` // kalan sayıyı da yapar mısın
let kalan;
if(!ab) kalan = `${e.kapalı} **Kapalı**`
if(ab) kalan = ab - message.guild.memberCount
////////////////////////////SAYAÇ///////////////////////////////////////
  
//////////////////////////////////////////////////////OTOTAG  
 let ototagkanal;
let ototag;
let tag = db.fetch(`ototagtag_${message.guild.id}`)
let kanal = db.fetch(`ototagkanal_${message.guild.id}`)
if(!tag) ototag =`${e.kapalı} **Kapalı**`
if(tag) ototag = `${e.açık} **${tag}**`
if(!kanal) ototagkanal = `${e.kapalı} **Kapalı**`
if(kanal) ototagkanal = `${e.açık} <#${kanal}>`
///////////////////////////////////////////OTOTAG


////////////////////////////KENGEL
let kengel;
let ananınki = db.fetch(`küfürengel_${message.guild.id}`)
if(ananınki) kengel = `${e.açık} **Açık**`
if(!ananınki) kengel = `${e.kapalı} **Kapalı**`
///////////////////////////K-ENGEL

///////////////////////////R-ENGEL
let rengel;
let babanki = db.fetch(`reklamengel_${message.guild.id}`)
if(babanki) rengel = `${e.açık} **Açık**`
if(!babanki) rengel = `${e.kapalı} **Kapalı**`
/////////////////////////R-ENGEL


let embed = new Discord.RichEmbed()
.setColor(v.embedrenk) 
.setThumbnail(client.user.avatarURL)
.setFooter('Bu veriler ' + message.guild.name + ' sunucusu için geçerlidir.')
.setTimestamp()
.setDescription(' Ayarlar sisteminde ' + e.açık + ' emojisi var ise sistem **açık**, ' + e.kapalı + ' emojisi var ise sistem **kapalı** demektir. \n\n ' + e.nitro + ' | __**Otorol Sistemi**__ \n\n Otorol Bot Rolü : ' + otorolbr + ' \n Otorol Bot Log Kanalı : ' + otorolb + ' \n Otorol Kullanıcı Rolü : ' + otorolkr + ' \n Otorol Kullanıcı Log Kanalı : ' + otorolk + ' \n\n ' + e.yildiz + ' | __**Sayaç Sistemi**__ \n\n Sayaç Log Kanalı : ' + sayaçkanal + ' \n Sayaç Hedefi : ' + sayaç + ' \n Sayaç Hedefine Kalan Sayı : ' + kalan +' \n\n ' + e.cekic + ' | __**Ototag Sistemi**__ \n\n Ototag Log Kanalı : ' + ototagkanal + ' \n Ototag Tagı ' + ototag + ' \n\n ' + e.trash + ' | __**Mesaj-log Sistemi**__ \n\n Mesaj-log Sistem Durumu : ' + mesajlog + ' \n Mesaj-log Kanalı : ' + mesajlogkanal + ' \n\n ' + e.sa + ' __**Oto-as Sistemi**__ \n\n Oto-as Sistem Durumu ' + saas + ' \n\n ' + e.vs + ' | __**Engelleme Sistemi**__ \n\n Küfür Engelleme Sistemi Durumu : ' + kengel + ' \n Reklam Engelleme Sistemi Durumu : ' + rengel )                                           
message.channel.send(embed)
  }

exports.conf = {
enabled: true, 
guildOnly: false, 
aliases: [], 
permLevel: 0 
};

exports.help = {
name: 'ayarlar',
description: 'sunucu ayarlarını görüntülersiniz!',
'usage': '++ayarlar'
}

