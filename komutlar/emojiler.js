const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const e = require('../emojiler.json')
exports.run = async(client, message, args) => {
let id = args[0]
if(message.guild.emojis.size === "0") return message.channnel.send(e.çarpı + " Sunucuda emoji bulunmuyor!")
if(message.guild.emojis.size > 50) return message.channel.send(e.çarpı+" Sunucunuzda ya emoji yok ya da çok fazla Discord fazla emoji olunca sizlere sunmama izin vermiyor.")  
let embed = new Discord.RichEmbed()
.setDescription(`\`\`\`${message.guild.name} sunucusunda (${message.guild.emojis.size}) tane emoji bulunuyor.\n\n${message.guild.emojis.map(a => a).join("\n")}\`\`\``)
.setColor("ORANGE")

let embeed = new Discord.RichEmbed()
.setDescription(`**${message.guild.name} sunucusunda (${message.guild.emojis.size}) tane emoji bulunuyor.**\n\n${message.guild.emojis.map(a => a).join(" `-` ")}\n\n**idleri ile görmek için**: \`++emojiler id\`\n**isimleri ile görmek için**: \`++emojiler isim\``)
.setColor("ORANGE")

if(!id) {
if(message.guild.emojis.size > 50) return message.channel.send(e.çarpı+" Sunucunuzda ya emoji yok ya da çok fazla Discord fazla emoji olunca sizlere sunmama izin vermiyor.")  
  return message.channel.send(embeed) 
         
        }
if(id === "id") return message.channel.send(embed)
let a = message.guild.emojis.map(a => a.name + ' | ' + a).join('\n')
  if(id === 'isim') {
let embed = new Discord.RichEmbed()
.setColor('ORANGE')
.setDescription(`**${message.guild.name} sunucusunda (${message.guild.emojis.size}) tane emoji bulunuyor.**\n\n **${a}**`)
message.channel.send(embed)
}
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  kategori: "kullanıcı",
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: "emojiler",
  description: "sunucudaki emojileri görürsünüz.",
  usage: "++emojiler"
}