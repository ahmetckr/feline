const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[${moment().format('LLLL')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('LLLL')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("idle");
  client.user.setActivity(`++yardım | ${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} kullanıcı | ${client.guilds.size} sunucu | #FelineGeliyoruz`);
  console.log(`[${moment().format('LLLL')}] BOT: Oyun ismi ayarlandı!`);
  console.log(`[${moment().format('LLLL')}] BOT: Şu an ` + client.channels.size + ` adet kanala, ` + client.guilds.size + ` adet sunucuya ve ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);
};


