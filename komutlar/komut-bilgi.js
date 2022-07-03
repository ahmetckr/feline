const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const e = require('../emojiler.json')
const v = require('../veriler.json')

exports.run = async(client, message, args) => {

let command = args[0]
if(!command) return message.channel.send(e.çarpı+" Bir komut adı gir!")
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
    let veri = db.fetch(`komutbakım_${cmd.help.name}`)
if(message.author.id !== ayarlar.sahip && message.author.id !== ayarlar.sahip2) {
if(veri) {
let embed = new Discord.RichEmbed()
.setTitle("Feline | Komut Bakım")
.setColor("RED")
.setDescription(`**${cmd.help.name}** komutu bakımda. lütfen daha sonra tekrar kullanmayı deneyiniz. \n\n• Sebebi:\n\`\`\`${veri}\`\`\``)
return message.channel.send(embed)
} 
}
let embed = new Discord.RichEmbed()
.setColor("ORANGE")
.setTitle("Feline | Komut Bilgi | **" +cmd.help.name+ "**")
.setDescription(`• Komut: **${cmd.help.name}**\n\n» Komut açıklaması: **${cmd.help.description}**\n» Komut Yetkisi: **${cmd.conf.permLevel}**\n» Başka kullanımları: **${cmd.conf.aliases.join(" ") || "Yok"}**\n» Komut kullanımı: **${cmd.help.usage}**`)
message.channel.send(embed)
//süsleri alıp geliyom
//», •,✧ 
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kb", "komutbilgi"],
  permLevel: 0
};

exports.help = {
  name: 'komut-bilgi',
  description: 'komut bilgi komutu',
  usage: '++komut-bilgi'
};

