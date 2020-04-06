const Jimp = require('../jimp')

module.exports = (client, message, prefix) => {
   const args = message.content.slice(prefix.length).trim().split(/ +/g)
   const command = args.shift().toLowerCase()


   // PING COMMAND
   if (command === 'ping') {
      message.reply('pong')
   }

   // AVATAR COMMAND
   if (command === 'avatar') {
      Jimp(client, message)
   }
}