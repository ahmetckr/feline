const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')

exports.run = async(client, message, args) => {
if(message.author.id !== ayarlar.sahip & message.author.id !== ayarlar.sahip2) return message.channel.send(`${e.çarpı} | Bu komut sahibime özel.`)
let ac = args[0]
if(!ac) return message.channel.send(e.çarpı+" Lütfen **al** yada **çıkar** yazar mısın?")
if(ac !== "al" && ac !== "çıkar") return message.channel.send(e.çarpı+" Lütfen **al** yada **çıkar** yazar mısın?")
let komut = args[1]
if(!komut) return message.channel.send(e.çarpı+" Bir komut adı gir!")
  let kmt;
  if (client.commands.has(komut)) {
    kmt = client.commands.get(komut);
  } else if (client.aliases.has(komut)) {
    kmt = client.commands.get(client.aliases.get(komut));
  }
  if(!kmt) return message.channel.send(e.çarpı+" Lütfen komut gir!")
  let veri = db.fetch(`komutbakım_${kmt.help.name}`)
  if(ac === "çıkar") {
  if(!veri) return message.channel.send(e.çarpı+" Bu komut bakımda değil!")
  db.delete(`komutbakım_${kmt.help.name}`)
  message.channel.send(e.tik+" **"+kmt.help.name+"** adlı komutu başarıyla bakımdan çıkardım!")
  }
  if(ac === "al"){
  if(veri) return message.channel.send(e.çarpı+" Bu komut zaten bakımda!")
  let sebep = args.slice(2).join(" ")
  if(!sebep) return message.channel.send(e.çarpı+" Lütfen bir sebep gir!")
  db.set(`komutbakım_${kmt.help.name}`, sebep)
  message.channel.send(e.tik+" **"+kmt.help.name+"** adlı komutu **"+sebep+"** sebebi yüzünden bakıma aldım!")
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'komut-bakım',
  description: 'komut bakım sistemi',
  usage: '++komut-bakım'
};

