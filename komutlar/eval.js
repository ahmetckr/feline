const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
const e = require('../emojiler.json')
exports.run = (client, message, args) => {
      if(message.author.id !== ayarlar.sahip & message.author.id !== ayarlar.sahip2) return message.channel.send(`${e.çarpı} | Bu komut sahibime özel.`)
    try {
      var code = args.join(" ");
      if(!code) return message.channel.send(`${e.çarpı} | Kod gir`)
      var evaled = eval(code);
  if(!args[0] || args[0].includes("token")) return message.channel.send("```Tokenimi mi istiyorsun, al senin olsun. Geldi mi?```")

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.sendCode("xl", clean(evaled));
    } catch (err) {
      message.channel.sendMessage(`\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'eval',
  description: 'Kod denersiniz.',
  usage: '++eval <kod>'
};