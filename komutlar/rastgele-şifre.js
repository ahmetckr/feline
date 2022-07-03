const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')
const s = require('generate-password')
exports.run = async(client, message, args) => {
var şifre = s.generate({
    length: 15,
    numbers: true
})
message.channel.send(şifre)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'rs',
  description: '',
  usage: 'm!'
};

