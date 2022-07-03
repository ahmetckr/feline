const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const emojiler = require('../emojiler.json')
const v = require('../veriler.json')

exports.run = async(client, message, args) => {
if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send( emojiler.n +  ' | Bu işleme devam edebilmek için `kullanıcılar yasakla` yetkisine sahip olmalısınız.')
  let kisi =  message.mentions.users.first()
  if(!kisi) return message.channel.send(` ${emojiler.n} | Bir kullanıcı etiketlemelisin. ` )
  
  let sebep = args.slice(1).join(" ")
  if(!sebep) return message.channel.send(` ${emojiler.n} | Bir sebep yazmalısın. `)

  let banlandin = ` **${message.guild.name}** isimli sunucudan **${sebep}** sebebi ile ${message.author} [**${message.author.username}**] tarafından yasaklandın. `
//ok
message.guild.ban(kisi, sebep);
     message.channel.send(` ${emojiler.y} | ${kisi}, ${message.author} tarafından **${sebep}** sebebiyle yasaklandı. `)
  kisi.send(banlandin)
};

  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yasakla"],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi yasaklarsınız!',
  usage: '++yasakla <kişi> <sebep>'
};

 