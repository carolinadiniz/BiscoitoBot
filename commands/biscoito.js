const biscoito = require('../json/biscoito.json')

module.exports = (message) => {
   let randomBiscoito = biscoito.biscoito[Math.floor(Math.random() * biscoito.biscoito.length)]
   let target = message.content.split(' ')[1]

   if (!target == false && target.includes('<@')) {
      message.channel.send(`${target}, ${randomBiscoito}`)
   } else {
      message.reply(randomBiscoito)
   }
}