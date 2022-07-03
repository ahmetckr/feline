  const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000)


const Discord = require('discord.js');
const client = new Discord.Client({
  fetchAllMembers: true,
});
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const Canvas = require('canvas')
    , Image = Canvas.Image
    , Font = Canvas.Font
    , path = require('path');
const snekfetch = require('snekfetch');
const fs = require('fs');
const DBL = require('dblapi.js');
const YouTube = require('simple-youtube-api');
const queue = new Map();  
const ytdl = require('ytdl-core');
const generator = require('generate-password');
const math = require('math-expression-evaluator')
const db = require('quick.db')
const moment = require('moment');
const ms = require('parse-ms');
const GIFEncoder = require('gifencoder');
require('moment-duration-format')
require('./util/eventLoader')(client);
const v = require('./veriler.json')
var prefix = ayarlar.prefix;
const emojiler = require('./emojiler.json')

moment.locale("TR")
const log = message => {
  console.log(`[${moment().add(3, "hour").format('LLLL')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

////////KOMUTLAR BURDAN SONRA

////////////////////////
client.on('guildMemberAdd', async member =>{
let kullanıcır = db.fetch(`otorolkullanıcırol_${member.guild.id}`) 
let kullanıcık = db.fetch(`otorolkullanıcıkanal_${member.guild.id}`)
let botr = db.fetch(`otorolbotrol_${member.guild.id}`)
let botk = db.fetch(`otorolbotkanal_${member.guild.id}`)


if(member.user.bot === true) {
if(!botr) return
if(!botk) return
member.addRole(botr)
let embed = new Discord.RichEmbed()
.setColor('GREEN')
.setFooter(member.guild.name, member.guild.iconURL)
.setThumbnail(member.user.avatarURL)
.setDescription(emojiler.parti + '``' + member.user.username + '`` isimli **bot** sunucumuza **katıldı**\n\n Sunucumuz ' + member + ' ile birlikte **' + member.guild.memberCount + '** kişi oldu! Hoş geldin ' + member + ', sana daha önceden ayarlanmış olan <@&'+botr+'> rolünü verdim!')
client.channels.get(botk).send(embed)
return
} else {
if(!kullanıcır) return
if(!kullanıcık) return
 member.addRole(kullanıcır)
let embed = new Discord.RichEmbed()
.setColor('GREEN')
.setFooter(member.guild.name, member.guild.iconURL)
.setThumbnail(member.user.avatarURL)
.setDescription(emojiler.parti + '``' + member.user.username + '`` isimli **kullanıcı** sunucumuza **katıldı**\n\n Sunucumuz ' + member + ' ile birlikte **' + member.guild.memberCount + '** kişi oldu! Hoş geldin ' + member + ', sana daha önceden ayarlanmış olan <@&'+kullanıcır+'> rolünü verdim!')
client.channels.get(kullanıcık).send(embed)
return
  
}
  
})

client.on('guildMemberAdd', async member => {
moment.locale("TR")
let k = db.fetch(`sayaçkanal_${member.guild.id}`)
if(!k) return
let s = db.fetch(`sayaçsayı_${member.guild.id}`)
if(!s) return
let kalan = s-member.guild.memberCount
// sen şey yapabiliyor musun, sunucudaki bot sayısı ve kullanıcı sayısı yes
let bs = member.guild.members.filter(a => a.user.bot).size //oha bu kadar basit mi evet bundan sunucu üye sayısını çıkart bot olmayanların sayısını al
let ks = member.guild.memberCount-bs // ahanda böle//- olursa yerlerini değişirsin aynen
  if(member.guild.memberCount >= s) {
let embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setFooter(member.guild.name, member.guild.iconURL)
.setThumbnail(member.user.avatarURL)
.setDescription(` ${emojiler.tada} Tebrikler! **${member.user.username}** isimli kişinin katılması ile **${s}** kişiye yani **hedefimize** ulaştık! \n\n Sayaç ayarlarını **hedefimize ulaştığımız** için sıfırladım! Tekrar ayarlamak istersen: \`++sayaç\``) 
// tşk gel deneyek ok
client.channels.get(k).send(embed)
db.delete(`sayaçkanal_${member.guild.id}`)
db.delete(`sayaçsayı_${member.guild.id}`)
    return
}

let embed = new Discord.RichEmbed()
.setColor('GREEN')
.setFooter(member.guild.name, member.guild.iconURL)
.setThumbnail(member.user.avatarURL)
.setDescription(emojiler.parti + '``' + member.user.username + '`` isimli **kullanıcı** sunucumuza **katıldı**! Sunucumuz ' + member + ' ile birlikte __' + member.guild.memberCount + '__ kişi oldu! \n\n **Sunucu İstatistiği** \n\n Sunucudaki Bot Sayısı : ``' + bs + '`` \n Sunucudaki Kullanıcı Sayısı : ``' + ks + '`` \n Sunucudaki Toplam Kişi Sayısı : ``' + member.guild.memberCount + '``')
.setTitle("```"+moment().add(3, "hours").format('LLLL')+"```")//üstte tarih saat yazcak ve şık olur bence olmazsa sileriz zaten. yoo bence çok hoş olur kalsın sen bilirsin ama bence de çok şık durur
client.channels.get(k).send(embed)
})

client.on('guildMemberRemove', async member => {
moment.locale("TR")
let k = db.fetch(`sayaçkanal_${member.guild.id}`)
let s = db.fetch(`sayaçsayı_${member.guild.id}`)
if(!k) return
if(!s) return
let kalan = s-member.guild.memberCount
// sen şey yapabiliyor musun, sunucudaki bot sayısı ve kullanıcı sayısı yes
let bs = member.guild.members.filter(a => a.user.bot).size //oha bu kadar basit mi evet bundan sunucu üye sayısını çıkart bot olmayanların sayısını al
let ks = member.guild.memberCount-bs // ahanda böle//- olursa yerlerini değişirsin aynen
let embed = new Discord.RichEmbed()
.setColor('RED')
.setFooter(member.guild.name, member.guild.iconURL)
.setThumbnail(member.user.avatarURL)
.setDescription(emojiler.isikli + '``' + member.user.username + '`` isimli **kullanıcı** sunucumuzdan **ayrıldı**! Sunucumuz ' + member + '  kişisinin gidişi ile birlikte __' + member.guild.memberCount + '__ kişi oldu! \n\n **Sunucu İstatistiği** \n\n Sunucudaki Bot Sayısı : ``' + bs + '`` \n Sunucudaki Kullanıcı Sayısı : ``' + ks + '`` \n Sunucudaki Toplam Kişi Sayısı : ``' + member.guild.memberCount + '``')
.setTitle("```"+moment().add(3, "hours").format('LLLL')+"```")//üstte tarih saat yazcak ve şık olur bence olmazsa sileriz zaten. yoo bence çok hoş olur kalsın sen bilirsin ama bence de çok şık durur
client.channels.get(k).send(embed)

})
// 


 
  
client.on('guildMemberAdd' , async member => {
moment.locale('tr')
let ototagt = db.fetch(`ototagtag_${member.guild.id}`)
let ototagk = db.fetch(`ototagkanal_${member.guild.id}`)
if(!ototagk) return
if(!ototagt) return
member.setNickname(`${ototagt} | ${member.user.username}`)
let embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setFooter(client.user.username, member.guild.iconURL)
.setThumbnail(member.user.avatarURL)
.setDescription(emojiler.tada + '``' + member.user.username + '`` sunucumuza katıldı ve ona **daha önceden ayarlanmış** ``' + ototagt + '`` tagını verdim!\n\n  Tarih: **'+moment().add(3, "hours").format('LLL')+'** ')
client.channels.get(ototagk).send(embed) 
})

client.on('messageDelete', async message => {
if(message.author.bot) return
let log = db.fetch(`mesajlog_${message.guild.id}`)
if(!log) return 
let mete = new Discord.RichEmbed()
.setColor("RED")
 .setAuthor( client.user.username , client.user.avatarURL )
.setFooter( message.author.username , message.author.avatarURL )
.setThumbnail( client.user.avatarURL )
.setTimestamp()
.setDescription(` ${emojiler.n} | ** Mesaj Silindi ** \n\n ${emojiler.yildiz} | Kullanıcı : ${message.author} | **${message.author.username}** \n ${emojiler.yildiz} | Kullanıcı ID : **${message.author.id}** \n ${emojiler.yildiz} | Mesaj Kanalı : ${message.channel} | **${message.channel.name}** \n\n ${emojiler.tada} | Mesaj : **${message.content}**`)
client.channels.get(log).send(mete)

})
////
client.on('messageUpdate', async(oldMessage , newMessage) => {
if(oldMessage.author.bot) return
if( oldMessage.content == newMessage.content ) return
let log = db.fetch(`mesajlog_${oldMessage.guild.id}`)
if(!log) return 
let mete = new Discord.RichEmbed()
.setColor("GREEN")
 .setAuthor( client.user.username , client.user.avatarURL )
.setFooter( newMessage.author.username , newMessage.author.avatarURL )
.setThumbnail( client.user.avatarURL )
.setTimestamp()
.setDescription(` ${emojiler.y} | ** Mesaj Güncellendi ** \n\n ${emojiler.yildiz} | Kullanıcı : ${oldMessage.author} | **${oldMessage.author.username}** \n ${emojiler.yildiz} | Kullanıcı ID : **${oldMessage.author.id}** \n ${emojiler.yildiz} | Mesaj Kanalı : ${oldMessage.channel} | **${oldMessage.channel.name}** \n\n ${emojiler.tada} | Eski Mesaj : **${oldMessage.content}** \n\n ${emojiler.tada} | Yeni Mesaj : **${newMessage.content}**`)
client.channels.get(log).send(mete)
 /// bu kadar basit lol
})//bu ayarlamasız//nese editleriz ayarlamalı olm dur onu da eklicem :Dbaya // editlemeye gerek yok bu arada çok çok hoş duruyo deneriz // ayarlaması da tamam ama onu biraz editlemek gerek
/////////////////////////SA-AS//////////////////////////////////////
client.on('message', async m => {
let veri = db.fetch(`saas_${m.guild.id}`)
if(!veri) return

  if (m.content.toLowerCase() === 'sa' || m.content.toLowerCase() === 'selamun aleyküm' || m.content.toLowerCase() === 'slm' || m.content.toLowerCase() === 'selam canım') {
let gold = db.fetch(`gold_${m.author.id}`)
if(gold) return m.channel.send(` ${emojiler.sa} ${m.author} Aleyküm selam dostum hoş geldin! Görüyorum ki sen bir **GOLD ÜYESİN**.`).then(msg => msg.delete(10000))
return m.channel.send(` ${emojiler.sa} ${m.author} Aleyküm selam dostum hoş geldin.`).then(a => a.delete(10000)) 
}
})



//ben ping düşürücü kodumu yazayım bari u.u öyle bir kod yok ki//ben yazmıştım matessa 4k pingten 18 e düştü yaz bakam kodu
//////////////////////////////SA-AS///////////////////////////////////////



client.on('message', msg => {
   let küfür = db.fetch(`küfürengel_${msg.guild.id}`)
    if (küfür) {
        const küfür2 = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq", 'yarak', 'amk'];
        if (küfür2.some(word => msg.content.includes(word))) {
            if (!msg.member.hasPermission("ADMINISTRATOR")) {
                  msg.delete();
                var embed = new Discord.RichEmbed()
               .setColor("RANDOM")
               .setDescription("**Küfür Engel**\nDostum, burada küfür etmen yasaklandı, ve küfür etmene izin vermeyeceğim.")
               .setFooter("Biri Küfür etti.", client.user.avatarURL)
               msg.channel.send(embed).then(msg => msg.delete(3000));
            }

            }}
          })
client.on('messageUpdate' , async(oldMsg , newMsg) => {
 let küfür = db.fetch(`küfürengel_${oldMsg.guild.id}`)
    if (küfür) {
        const küfür2 = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq", 'yarak'];
        if (küfür2.some(word => newMsg.content.includes(word))) {
            if (!oldMsg.member.hasPermission("ADMINISTRATOR")) {
                  newMsg.delete();
                var embed = new Discord.RichEmbed()
               .setColor("RANDOM")
               .setDescription("**Küfür Engel**\nDostum, burada küfür etmen yasaklandı, ve küfür etmene izin vermeyeceğim." )
               .setFooter("Biri Küfür etti.", client.user.avatarURL)
               oldMsg.channel.send(embed).then(msg => msg.delete(3000));
            }

            }}
          
}) 
client.on('message', msg => {
   let küfür = db.fetch(`reklamengel_${msg.guild.id}`)
    if (küfür) {
        const küfür2 = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".net", ".rf.gd", ".az", ".party" , ".biz"];
        if (küfür2.some(word => msg.content.includes(word))) {
            if (!msg.member.hasPermission("ADMINISTRATOR")) {
                  msg.delete();
                var embed = new Discord.RichEmbed()
               .setColor("RANDOM")
               .setDescription("**Reklam Engel**\nDostum, burada reklam yapman yasaklandı, ve reklam yapmana izin vermeyeceğim.")
               .setFooter("Biri reklam yaptı.", client.user.avatarURL)
               msg.channel.send(embed).then(msg => msg.delete(3000));
            }

            }}
          })
client.on('messageUpdate' , async(oldMsg , newMsg) => {
 let küfür = db.fetch(`reklamengel_${oldMsg.guild.id}`)
    if (küfür) {
        const küfür2 = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".net", ".rf.gd", ".az", ".party" , ".biz"];
        if (küfür2.some(word => newMsg.content.includes(word))) {
            if (!oldMsg.member.hasPermission("ADMINISTRATOR")) {
                  newMsg.delete();
                var embed = new Discord.RichEmbed()
               .setColor("RANDOM")
                   .setDescription("**Reklam Engel**\nDostum, burada reklam yapman yasaklandı, ve reklam yapmana izin vermeyeceğim.")
               .setFooter("Biri reklam yaptı.", client.user.avatarURL)
               oldMsg.channel.send(embed).then(msg => msg.delete(3000));
            }

            }}
          
}) 
client.on('message', async message => {

let goldveri = await db.fetch(`gold_${message.author.id}`)
if(!goldveri) return
  
let timeOut = 1800000  
 
let zamanverisi = db.fetch(`goldmsg_${message.author.id}`)

  if (timeOut !== null && timeOut - (Date.now() - zamanverisi) > 0) { 
return   
  // okuyamadm adami etiketletemedim
  } else {//bura ne alaka gözüme çarptı neyse ben kayıt komuduna gider

  message.channel.send(emojiler.sa + " | " + message.author + " Aman Allahım bir **gold üye!**").then(i =>i.delete("5000"))
 
  db.set(`goldmsg_${message.author.id}`, Date.now())
  }
});

client.on('guildDelete', guild => {

let rrrsembed = new Discord.RichEmbed()
.setDescription(`${emojiler.n} | Sunucu adı: **${guild.name}** \n${emojiler.n} | Sunucu sahibi: **${guild.owner}** \n${emojiler.n} | Sunucu sahibi ID: **${guild.ownerID}** \n${emojiler.n} | Sunucunun kurulu olduğu bölge: **${guild.region}** \n${emojiler.n} | Sunucudaki kişi sayısı: **${guild.memberCount}**
\n\n\n${emojiler.n} | **${guild.name}** sunucusundan **atıldım**. Artık **${client.guilds.size}** sunucuya ve **${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}** kullanıcıya hizmet **veriyorum**.`)
.setColor("RED")
.setTitle("**Feline Atıldı**")

   client.channels.get(v.eklendimatıldım).send(rrrsembed);
  
});

client.on('guildCreate', guild => {
  
client.guilds.get(guild.id).channels.filter(c => c.type == "text").random().createInvite({maxAge: 0, maxUses: 0}).then(invite => {
let rrrsembed = new Discord.RichEmbed()
.setDescription(`${emojiler.y} | Sunucu adı: **${guild.name}** \n${emojiler.y} | Sunucu sahibi: **${guild.owner}** \n${emojiler.y} | Sunucu sahibi ID: **${guild.ownerID}** \n${emojiler.y} | Sunucunun kurulu olduğu bölge: **${guild.region}** \n${emojiler.y} | Sunucu üye sayısı: **${guild.memberCount}**
\n\n\n${emojiler.y} | **${guild.name}** **eklendim!** Artık **${client.guilds.size}** sunucuya ve **${client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}** kullanıcıya hizmet **veriyorum**. Sunucunun davet linki **${invite}**`)
.setColor("GREEN")
.setTitle("**Feline Eklendi**")
.setColor("GREEN")

   client.channels.get(v.eklendimatıldım).send(rrrsembed);
  })
})


client.login(ayarlar.token)