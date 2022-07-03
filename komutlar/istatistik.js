const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')
const moment = require('moment')
require('moment-duration-format')
exports.run = async(client, message, args) => {
moment.locale("tr")
let sukişi = message.guild.memberCount
let skanal = message.guild.channels.size//:Fp:
let tkişi = client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()
let tkanal = client.channels.size
let komuts = client.commands.size
let bots = message.guild.members.filter(a => a.user.bot).size
let üye = message.guild.memberCount-bots
let sunucuadı = message.guild.name
let sunucus = message.guild.owner.user.tag
let sahip = '<@!'+ayarlar.sahip+'> | <@!'+ayarlar.sahip2+'>'
let ping = client.ping.toFixed(2)
let ss = client.guilds.size
let kisi = message.author
let embed = new Discord.RichEmbed()//
.setColor('RANDOM')
.setTimestamp()
.setAuthor(message.author.username, message.guild.iconURL)
.setFooter(message.author.username + ' tarafından istendi.' , message.guild.iconURL)//elleme yaça l biçapraz yapcaktm
.setDescription('**Bot İstatistiği** \n\n  `Toplam kişi sayısı` → **' + tkişi + '**\n `Toplam sunucu sayısı` → **'+ss+'** \n  `Toplam kanal sayısı` → **' + tkanal + '** \n  `Bot sahipleri` → **' + sahip + '** \n `Bot pingi` → **' + ping + '**\n`Komut Sayısı` → **'+komuts+'**\n\n **Sunucu  İstatistiği** \n\n `Sunucu sahibi` → **' + message.guild.owner + '** | **' + sunucus + '** \n `Sunucu ismi` → **' + sunucuadı + '** \n `Sunucudaki üye sayısı` → **' + üye + '** \n `Sunucudaki bot sayısı` → **' + bots + '** \n `Sunucudaki toplam üye sayısı` → **' + sukişi + '** \n `Sunucudaki kanal sayısı` → **' + skanal + '** \n\n **Kişi İstatistiği** \n\n `Kişi profili` → **' + message.author + '** \n `Kişi ismi` → **' + message.author.username + '** \n `Kişi tagı `→ **' + message.author.discriminator + '** \n `Kişi discorda katılım tarihi` → **' + moment(kisi.createdAt).format('LLLL') + '** \n `Kişi sunucuya katılım tarihi` → **' + moment(kisi.joinedAt).format('LLLL')  + '** \n\n İstatistik bilgileri `bot/sunucu/üye` olarak sıralandırılmıştır. Lütfen bir hata bulursanız [bize ulaşın](https://discord.gg/xKDqtMN).')
 message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i", "stats"],
  permLevel: 0
};

exports.help = {
  name: 'istatistik',
  description: 'Bot/Sunucu/Üye istatistiklerini görürsünüz.',
  usage: '++istatistik'
};

