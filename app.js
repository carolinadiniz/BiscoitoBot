const Discord = require('discord.js')
const client = new Discord.Client()
const { prefix, token } = require('./config/config.json')
const commands = require('./commands/commands')
const gif = require('./commands/gif')


client.on('ready', () => {
   console.clear()
   console.log(`Logged in as ${client.user.tag}!\nUsers: ${client.users.cache.size} | Channels: ${client.channels.cache.size} | Servers: ${client.guilds.cache.size}`)
   client.user.setActivity('Biscoitos!')
})


client.on('message', async message => {
   // Log de mensagens
   console.log(`[time:] info: [#${message.channel.name}] <${message.author.username}#${message.author.discriminator}>: ${message.content}`)

   if (message.author.bot) return               // Ignora mensagens de Bot 
   if (message.channel.type === 'dm') return    // Igonra mensagens privadas

   gif(client, message, prefix)
   commands(client, message, prefix)
})

client.login(token)