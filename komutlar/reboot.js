const Discord = require('discord.js');
const moment = require('moment');
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')

exports.run = (client, message, args) => {
if(message.author.id !== ayarlar.sahip && message.author.id !== ayarlar.sahip2) return message.channel.send(e.tik+" Bu komut sahiplerime özel!")
message.channel.send(`Bot yeniden başlatılıyor...`).then(a => process.exit(1))
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yenile','yb', "r"],
  permLevel: 0
};

exports.help = {
  name: 'reboot',
  description: 'botu yeniden başlatır!',
  usage: '++r'
};