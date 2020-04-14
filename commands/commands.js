const Jimp = require('../jimp')
const cookies = require('./cookies.json')
const toApng = require('gif-to-apng')
const download = require('download-file')
const fs = require('fs')
const contentFilePath = './commands/gif.json'
const pngToJpeg = require('png-to-jpeg')

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

   // BISCOITO COMMAND
   if (command === 'biscoito') {
      randomCookies = cookies.cookies[Math.floor(Math.random() * cookies.cookies.length)]
      target = message.content.split(' ')[1]
      console.log(target)
      // manda mensagem ruim para o Haru
      if (!target == false && target.includes('<@!159461237023965194') || !target == false && target.includes('<@159461237023965194')) {
         message.channel.send(`${target}, ELE COMETEU SUICIDIO`)

      // manda mensagem fofa para outra pessoa
      } else if (!target == false && target.includes('<@') == true) {
         message.channel.send(`${target}, ${randomCookies}`)

      //manda mensagem fofa para a pessoa que pediu
      } else {
         message.reply(randomCookies)
      }
   }

   // GIF IMAGEM
   if (command === 'gif' || command === 'gif*') {
      // Variáveis nescessárias
      let [nome, emojilink] = args
      let options = {
         directory: "./img/gif",
         filename: `${nome}.gif`
      }
   
      // Mensagem de erro
      if (!args[0]) return message.reply("voce esqueceu de adicionar os argumentos \n !apng <nome> <link>")
      if (!args[1]) return message.reply("voce esqueceu de adicionar os argumentos \n !apng <nome> <link>")
      if (args[0].includes('-')) return message.reply("voce não pode usar - em nomes de emojis \n !apng <nome> <link>")
      

      // GIF
      if (command === 'gif' || command === 'gif*') {
         // Variáveis necessárias
         let [nome, emojilink] = args
         let options = {
            directory: "./img/gif",
            filename: `${nome}.gif`
         }

         // Mensagem de erro
         if (!args[0]) return message.reply("voce esqueceu de adicionar os argumentos \n !apng <nome> <link>")
         if (!args[1]) return message.reply("voce esqueceu de adicionar os argumentos \n !apng <nome> <link>")
         if (args[0].includes('-')) return message.reply("voce não pode usar - em nomes de emojis \n !apng <nome> <link>")

         message.channel.send("Aguarde alguns instantes...")
            .then((msg) => {
               // DOWNLOAD IMAGE
               download(emojilink, options, function(err){
                  if (!err) {
                     console.log('Imagem Baixada!')
                  } else {
                     console.log('ERROR!')
                  }
               })

               // messagem de confirmação
               msg.edit("O gif-emote foi adicionado ao banco de dados local, você poderá usa-lo usando *none* antes do nome do emote")
            })

         
         // Carregando JSON
         function load() {
            const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8')
            const contentJson = JSON.parse(fileBuffer)
            return contentJson
         }
         // Salvando JSON
         function save(content) {
            const contentString = JSON.stringify(content)
            console.log(`novo gif adicioando <${nome}>`)
            return fs.writeFileSync(contentFilePath, contentString)
         }


         // Adicionando Gif ao JSON
         let emojisJson = load()
         emojisJson[nome] = emojilink
         
         // Salvando Json
         save(emojisJson)
      }
   }

   // Todos os Gifs
   if (command === "gifall") {
      function load() {
         const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8')
         const contentJson = JSON.parse(fileBuffer)
         return contentJson
      }
      emojis_Load = Object.keys(load())
      for (let emoji of emojis_Load) {
         message.channel.send(`${emoji}`, { files: [load()[emoji]]})
      }
   }

   // HELP
   if (command === "help") {
      message.channel.send("```\
                              COMANDOS BISCOITO BOT \n\n\
*biscoito <@alguém> - - - - Manda uma mensagem fofa para alguém\n\
*gif <nome> <link.gif> - -  adiciona gif ao servidor\n\
*gifall - - - - - - - - - - Mostra todos os gifs\n\
*ping - - - - - - - - - - - [manutenção]\n\
*avatar - - - - - - - - - - [manutenção]\n\
                           ```")
   }
}