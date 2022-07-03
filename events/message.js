const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
const moment = require('moment')
const Discord = require('discord.js')
const v = require('../veriler.json')
require('moment-duration-format')
let talkedRecently = new Set();
module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
	setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {

    moment.locale("tr")
   let kl = db.fetch(`karaliste_${message.author.id}`)
   let zaman = db.fetch(`karalistezaman_${message.author.id}`)
   let bakım = db.fetch(`bakım`)
   let bakımz = db.fetch(`bakımzamanı`)
if(message.author.id !== ayarlar.sahip && message.author.id !== ayarlar.sahip2) {
   if(kl) {
  let embed = new Discord.RichEmbed()
  .setDescription('Hey ``' + message.author.tag + '`` ne yaptığını sanıyorsun? \n\n ``' + moment.add(3, "hours").format("LLLL")   + '`` tarihinde ``' + kl + '`` sebebi ile karalisteye **alınmışsın**. Beni **kullanamazsın**!')
  .setColor("RED")
  .setThumbnail(message.author.avatarURL)
  message.channel.send(embed)
return
}}
    if(bakım) {
    let embed = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription("Hey! dur bakalım, bot bakımda! kullanamazsın botu.\n\n__**✧ Veriler ✧**__\n• Bakıma girme zamanı: **"+moment(bakımz).add(3, "hour").format("LLLL")+"**\n» Tahmini bitme zamanı: **"+moment(bakımz).add(6, "hour").format("LLLL")+"**\n» Bakım sebebi **"+bakım+"**")                  
    if(message.author.id !== ayarlar.sahip && message.author.id !== ayarlar.sahip2) {
    return message.channel.send(embed)
    }}  /* SÜSLER
    », •,✧ 
      */
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

cmd.run(client, message, params, perms);
if(message.author.id !== ayarlar.sahip && message.author.id !== ayarlar.sahip2) { 
    if (perms < cmd.conf.permLevel) return;
let logg = client.channels.get(v.kmtlog)
logg.send("**"+message.author.tag+"** adlı kullanıcı **"+command+"** adlı komutu: **"+message.guild.name+"** sunucusunda kullandı.\n\nDetaylı kullanım: "+message.content) 
 }
  
  }

};
