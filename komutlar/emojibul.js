const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {

if(message.author.id !== '708827616584531998') {
if(message.author.id !== '369855905162067988') {
if(message.author.id !== '646345488244932628')
    return message.reply(':x: yetersiz yetki!')
}}
 // let emosji = client.emojis.random().toString() // bu da kalsın kullanıırz belki sonra <3
  let embed = new Discord.RichEmbed()
  .setFooter("Feline | Random Emoji") 
  .setColor("ORANGE")
.setAuthor(message.author.username +  " Tarafından istendi!" , message.author.avatarURL)
.setImage(client.emojis.random().url)
  var args0 = args[0]
  if(!args0) return message.channel.send(embed)
  var emoji = client.emojis.find(array => array.name === args0)
  if(!emoji) return message.channel.send('Aradığınız Emoji Bulunamadı')
  message.channel.send(emoji.toString())
  }


exports.conf = {
enabled: true, 
guildOnly: false, 
aliases: [], 
permLevel: 0 
};

exports.help = {
name: 'eb',
description: 'emoji bulur',
usage: '++eb / ++eb <emoji adı>' // kanka dc baksana
}


