const biscoito = require('./biscoito')
const help = require('./help')

module.exports = (client, message, prefix) => {
   if (!message.content.startsWith(prefix)) return

   const args = message.content.slice(prefix.length).trim().split(/ +/g)
   const command  = args.shift().toLowerCase()

   if (command === 'biscoito') {
      biscoito(message)
   }

   if (command === 'help') {
      help(message)
   }
}