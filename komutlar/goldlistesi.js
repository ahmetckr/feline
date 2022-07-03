const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')

exports.run = async(client, message, args) => {
const resp = db.all().filter(data => data.ID.startsWith(`gold`)).sort((a, b) => b.data - a.data); 

let i = 1;
let content = " "  
resp.forEach(resp => {content +=` <@${resp.ID.split("_")[1]}>  (${resp.ID.split("_")[1]})\n `})
message.channel.send(new Discord.RichEmbed().setColor("GREEN").setAuthor(`Feline │ Gold Listesi`, client.user.avatarURL).setDescription(content))};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'gl',
  description: 'Gold listesini görüntülersiniz',
  usage: '++gl'
};

