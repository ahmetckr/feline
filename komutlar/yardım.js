const Discord = require('discord.js')
const matessa = require('../ayarlar.json')
const db = require('quick.db')
const emojiler = require('../emojiler.json')
const v = require('../veriler.json')

exports.run = async(client, message, args) => {
let embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setThumbnail(client.user.avatarURL)
.setFooter(client.user.username + ' tüm hakları sakldır.' , message.guild.iconURL)
.setAuthor(message.author.username + ' | Yardım ', message.author.avatarURL)
.setDescription(emojiler.tada + ' Yardım menüsüne hoş geldin `' + message.author.tag + '` \n ' + emojiler.yuv + ' Ping değerim **' + client.ping.toFixed(2) + 'ms** olarak ölçüldü. \n\n ' + emojiler.hyper2 + ' **Yetkili Komutları** \n\n `++otorol` - Sunucunuza yeni biri gelirse otomotik verilecek rolü ayarlarsınız! \n `++sayaç` - Sunucunuz için bir üye sayısı hedefi koyarsınız! \n `++ototag` - Sunucunuza yeni biri gelirse ismine otomotik eklenecek tagı ayarlarsınız! \n `++mesaj-log` - Sohbeti daha iyi modere edebilmek için bir mesaj-log kanalı ayarlarsınız! \n `++sil` - Sohbet çok mu kirlendi? Hadi birkaç mesaj silelim! \n `++oto-as` - Selam vermek sünnet, almak farzdır. Botu günaha sokmayın ve bunu aktif edin! \n `++ban` - Birileri yaramazlık mı yaptı? Sunucudan banla! \n `++kick` - Birileri yaramazlık mı yaptı? Sunucudan kickle! \n `++kelime-yasakla` - Sunucunda bir kelimenin/cümlenin kullanılmamasını mı istiyorsun? Hadi yasaklayalım! \n `++küfürengel` - Biri küfür mü ediyor? onu engelleyebilirsin.\n`++reklamengel` - Biri reklam mı yapıyor? onu engelleyebilirsin. \n\n ' + emojiler.unitro + ' **Kullanıcı Komutları** \n\n `++not` - Her şey çok mu karıştı? Not sistemini kullanarak düzenleyebilirsin! \n `++profil` - Birinin ya da kendin hakkında senin bile bilmediğin bilgileri sizinle paylaşıyoruz! \n `++ayarlar` - Sunucunun ayarlarını görmek kurallara uymanı kolaylaştırabilir! \n `++avatar` - Birinin ya da kendinin profil resmine mi erişmeye çalışıyorsun? Hadi erişelim! \n `++banner` - Yazdığın şeyi bannere çevirmek istemez miydin? \n `++istatistik` - Bot/Sunucu/Kullanıcı istatistiğini görmek istersen burası sana göre. \n `++kelime-liste` - Sunucudaki yasaklı kelimeleri görerek kullanmamaya özen göster! \n `++gold-sorgu` - Gold üyeliğin olup olmadığını merak mı ediyorsun? İşte bu komut tam sana göre.  \n\n ' + emojiler.tik + ' | Bağlantılar \n [Davet Linki](https://discord.com/oauth2/authorize?client_id=735875810560573460&scope=bot&permissions=1543842999) - [Destek Sunucusu](https://discord.gg/Kz3b2u3)')
message.channel.send(embed)
} /// olm kullanıcı yerine yazıyon
;
  /* SÜSLER
    », •,✧
  
  */

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'yardım menüsünü gösterir',
  usage: '++yardım'
};

