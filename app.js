const Discord = require('discord.js')
const client = new Discord.Client()
const { prefix, token } = require('./config/config.json')
const commands = require('./commands/commands')

client.on('ready', () => {
   console.log(`Logged in as ${client.user.tag}!`)
   console.log(`Users: ${client.users.cache.size} | Channels: ${client.channels.cache.size} | Servers: ${client.guilds.cache.size}`)
   client.user.setActivity('biscoitos')
})


client.on('message', async message => {

   if (message.author.bot) return;
   if (message.channel.type === "dm") return;
   if (!message.content.startsWith(prefix)) return;


   commands(client, message, prefix)
   
})


client.login(token)