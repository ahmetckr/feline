const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')
const moment = require('moment')
require('moment-duration-format')
exports.run = async(client, message, args) => {
let kişi = message.mentions.users.first() || message.author
let gs = db.fetch(`gold_${kişi.id}`)
let goldv;
let gold;
if(gs) goldv = `${e.açık}`
if(gs) gold = moment(gs).add(3, "hour").format('LLLL')
if(!gs) goldv = `${e.kapalı}`
if(!gs) gold = `Gold olmadığı için tarih yok.`

let embed = new Discord.RichEmbed()
.setColor("GREEN")
.setDescription(`Gold Sorgu | **${kişi.username}**\n\nGold Üyeliği: **${goldv}**\nGold Olma Zamanı: **${gold}**`)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["gold-sorgu"],
  permLevel: 0
};

exports.help = {
  name: 'goldsorgu',
  description: 'etiketlediğiniz kişinin veya kendinizin goldluğunu sorgularsınız!',
  usage: '++gold-sorgu / ++gold-sorgu <@kişi>'
};

