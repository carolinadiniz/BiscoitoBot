const download = require('download-file')
const fs = require('fs')
const contentFilePath = './json/gif.json'


// GIF IMAGE
module.exports = (client, message, prefix) => {

   // LENDO MENSAGENS COM GIFS
   let gifs = Object.keys(load())

   for (let gif of gifs) {
      if (message.content.toLowerCase().includes(`:${gif}`)) {
         let messageContent = ''
         for (let messageContentSplit of message.content.split(' ')) {
            if (!messageContentSplit.toLowerCase().includes(`:${gif}`)) {
               messageContent = messageContent + " " + messageContentSplit
            }
         }
         message.channel.send(``, { files: [load()[gif][0]] })
            .catch(() => {
               message.channel.send(``, { files: [load()[gif][1]] })
            })
      }
   }


   // LENDO CANAL DE GIFS
   /*if (message.channel == '698716007606255778') {
      console.log(load()['rich'])
      message.channel.send(``, { files: [load()['rich']] })
   }*/
   



   // COMANDOS
   if (!message.content.startsWith(prefix)) return
   const args = message.content.slice(prefix.length).trim().split(/ +/g)
   const command = args.shift().toLowerCase()

   // DIF
   function load() {
      const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8')
      const contentJson = JSON.parse(fileBuffer)
      return contentJson      
   }
   function save(content) {
      const contentString = JSON.stringify(content)
      return fs.writeFileSync(contentFilePath, contentString)
   }
   function code_form() {
      let code_text = ''
      let code_time = 1
      for (let emoji of emojiLoad) {
         let code_space = ''
         for (let i = 0; i < (25 - emoji.length); i++) {
            code_space = ' ' + code_space
         }
         if (code_time == 1) {
            code_text =  code_text + ` :${emoji}${code_space}`
            code_time = 2
         } else if (code_time == 2) {
            code_text = code_text + ` :${emoji}\n`
            code_time = 1
         }
      }

      
      return "```md\n# GIF\n\n" + code_text + "\n```"
   }


   let [nome, emojilink] = args
   let options = {
      directory: './img/gif',
      filename: `${nome}.gif`
   }
   let emojiJson = load()
   let emojiLoad = Object.keys(load())


   // ADICIONANDO NOVO GIF
   if (command === 'gif') {
      if (!args[0]) return message.reply("voce esqueceu de adicionar os argumentos \n *gif <nome> <link>")
      if (!args[1]) return message.reply("voce esqueceu de adicionar os argumentos \n *gif <nome> <link>")
      if (!args[1].includes('.gif')) return message.reply("o link precisa terminar com .gif \n *gif <nome> <link.gif>")
      if (args[0].includes('-')) return message.reply("voce não pode usar - em nomes de emojis \n *gif <nome> <link>")
      if (emojiLoad.includes(nome.toLowerCase()) == true) return message.reply("já existe um gif com este nome")
      
      message.channel.send('Aguarde alguns instantes...')
         .then( msg => {
            download(emojilink, options, function(err) {
               if (!err) {
                  console.log('GIF BAIXADO!')
                  msg.edit(`O gif-emote foi adicionado ao servidor, você poderá usa-lo usando *:${nome}* `)
                  emojiJson[nome.toLowerCase()] = [`./img/gif/${nome}.gif`, emojilink]
                  save(emojiJson)

               } else {
                  console.log('ERROR AO BAIXAR GIF!')
                  msg.edit("Houve um erro ao adicionar gif :c")
               }
            })
         })
   }


   // TODOS OS GIFS
   if (command === 'gifall') {
      message.channel.send(code_form())
   }
}