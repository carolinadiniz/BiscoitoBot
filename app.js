const Discord = require('discord.js')
const client = new Discord.Client()
const { prefix, token } = require('./config/config.json')
const Jimp = require('./jimp')

client.on('ready', () => {
   console.log(`Logged in as ${client.user.tag}!`)
   console.log(`Users: ${client.users.cache.size} | Channels: ${client.channels.cache.size} | Servers: ${client.guilds.cache.size}`)
   client.user.setActivity('biscoitos')
})


client.on('message', async message => {

   if (message.author.bot) return;
   if (message.channel.type === "dm") return;
   if (!message.content.startsWith(prefix)) return;

   const args = message.content.slice(prefix.length).trim().split(/ +/g)
   const command = args.shift().toLowerCase()

   console.log(message.content)

   // PING COMMAND
   if (command === 'ping') {
      message.reply('pong')
   }

   if (message.content.slice(prefix.length) === 'oi biscoito') {
      message.reply(`oioi!`)
   }

   if (message.content.slice(prefix.length) === 'estão me ignorando') {
      message.reply(`sempre fazem isso, mas já já eu compro só biscoito pra você ^^ <3`)
   }

   // AVATAR COMMAND
   if (command === 'avatar') {
      Jimp(client, message)
   }
   
})


client.login(token)