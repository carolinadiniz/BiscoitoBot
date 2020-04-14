const Discord = require('discord.js')
const client = new Discord.Client()
const { prefix, token } = require('./config/config.json')
const Jimp = require('./jimp')
const commands = require('./commands/commands')
const gif = require('./commands/gif')

client.on('ready', () => {
   console.log(`Logged in as ${client.user.tag}!`)
   console.log(`Users: ${client.users.cache.size} | Channels: ${client.channels.cache.size} | Servers: ${client.guilds.cache.size}`)
   client.user.setActivity('biscoitos')
})


client.on('message', async message => {
   console.log(`[time:] info: [#${message.channel.name}] <${message.author.username}#${message.author.discriminator}>: ${message.content}`)

   if (message.author.bot) return;
   if (message.channel.type === "dm") return;

   gif(client, message, prefix)

   // Se não for um comando então retorna
   if (!message.content.startsWith(prefix)) return;

   commands(client, message, prefix)
})


client.login(token)