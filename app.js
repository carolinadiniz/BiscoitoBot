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


client.on('raw', async dados => {
   //console.log(dados.d.embeds)

})


client.on('message', async message => {

   if (message.channel.guild.id == 688048480291127370) return

   function date() {
      let data = new Date()
      let hour = `${data.getHours()}`
      let minutes = `${data.getMinutes()}`
      let seconds = `${data.getSeconds()}`

      if (data.getHours() < 10) hour = `0${data.getHours()}`
      if (data.getMinutes() < 10) minutes = `0${data.getMinutes()}`
      if (data.getSeconds() < 10) seconds = `0${data.getSeconds()}`

      return `${hour}:${minutes}:${seconds}`
   }

   // Log de mensagens
   console.log(`[${date()}] canal: [#${message.channel.name}] <${message.author.username}#${message.author.discriminator}>: ${message.content}`)

   if (message.author.bot) return               // Ignora mensagens de Bot 
   if (message.channel.type === 'dm') return    // Igonra mensagens privadas

   gif(client, message, prefix)
   commands(client, message, prefix)
})

client.login(token)