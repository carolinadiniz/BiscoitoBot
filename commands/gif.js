const fs = require('fs')
const contentFilePath = './commands/gif.json'

module.exports = (client, message, prefix) => {
   function load() {
      const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8')
      const contentJson = JSON.parse(fileBuffer)
      return contentJson
   }
   let emojis = Object.keys(load())

   console.log(emojis)

   // Se mensagem contem emoji
   for (let single_emoji of emojis) {
      // procurando na se na frase possui emoji 
      if (message.content.toLowerCase().includes(`<:${single_emoji}:`)) {
         message.channel.send(``, { files: [load()[single_emoji]]})
         console.log(`enviando gif ${single_emoji}`)
      }
   }
}
