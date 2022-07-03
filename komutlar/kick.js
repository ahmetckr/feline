const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const emojiler = require('../emojiler.json')
const v = require('../veriler.json')

exports.run = async(client, message, args) => {
let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix

   if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send( emojiler.n  + ' | Bu işleme devam edebilmek için `kullanıcıları at` yetkisine sahip olmalısınız.')
  let kisi =  message.mentions.users.first()
  if(!kisi) return message.channel.send(` ${emojiler.n} | Bir kullanıcı etiketlemelisiniz. ` )
  
  let sebep = args.slice(1).join(" ")
  if(!sebep) return message.channel.send(` ${emojiler.n} | Bir sebep yazmalısınız. `)
  
  let banlandin = ` **${message.guild.name}** isimli sunucudan **${sebep}** sebebi ile ${message.author} [**${message.author.username}**] tarafından atıldın.`
  
message.guild.member(kisi).kick()
     message.channel.send(` ${emojiler.y} | ${kisi}, ${message.author} tarafından **${sebep}** sebebiyle atıldı. `)
  kisi.send(banlandin)
 
};

  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["at"],
  permLevel: 0
};

exports.help = {
  name: 'kick',
  description: 'birisini atarsınız',
  usage: '++at <@kişi> sebep'
};

 