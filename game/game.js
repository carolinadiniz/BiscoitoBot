const fs = require('fs')
const fileUsers = './game/json/users.json'
const fileClass = './game/json/class.json'
let eventboss = true

module.exports = (client, message) => {
   if (message.channel.id !== '705255024808296519') return


   // DIF
   function load(file) {
      const fileBuffer = fs.readFileSync(file, 'utf-8')
      return JSON.parse(fileBuffer)   
   }
   function save(content, file) {
      const contentString = JSON.stringify(content)
      return fs.writeFileSync(file, contentString)
   }

   // STARTS
   if (message.content == 'event start') {
      message.channel.send("```" + "O BOSS {boss.name} NASCERÁ EM BREVE!" + "```")
      console.log(`EVENTO BOSS {boss.name} COMEÇOU`)
      eventboss = true
   }
   if (message.content == 'event end') {
      message.channel.send("```" + "FIM DO EVENTO!" + "```")
      console.log(`FIM DO EVENTO BOSS {boss.name}`)
      eventboss = false
   }


   // CRIAR PERSONAGEM
   if (message.content.toLowerCase().startsWith('create char') && !Object.keys(load(fileUsers)).includes(message.author.id) && Object.keys(load(fileClass)).includes(message.content.split(/ +/g)[2])) {
      let users = load(fileUsers)
      users[message.author.id] = {
         username: message.author.username,
         discriminator: message.author.discriminator,
         class: message.content.split(/ +/g)[2],
         level: 1,
         xp: 0,
         hp: 1000,
         itens: {
            equipped: {},
            inventory: {}
         },
         joined: false
      }
      save(users, fileUsers)
      if (['barda'].includes(users[message.author.id].class)) { 
         message.reply("```" + `Uma nova ${users[message.author.id].class} entrou no mundo!` + "```")
      } else {
         message.reply("```" + `Um novo ${users[message.author.id].class} entrou no mundo!` + "```")
      }
      return
   }

   // SE NÃO TEM PERSONAGEM
   if (!Object.keys(load(fileUsers)).includes(message.author.id)) {
      message.reply({ embed : {
         type: 'rich',
         description: 'Você ainda não está neste mundo, crie um personagem.\nEscolha sua classe: ```Bardo             Ninja\nFeiticeiro        Arqueiro\
         ```\nDigite: _create char **"nome-da-classe"**_',
      }})
      return
   }

   // EVENTO
   if (eventboss == true) {
      let users = load(fileUsers)

      // JOIN
      if (message.content == 'join' && users[message.author.id].joined == false) {  
         users[message.author.id].joined = true
         message.channel.send("```" + `${message.author.username} entrou na dungeon!` + "```")
      }
      // LEAVE
      if (message.content == 'leave' && users[message.author.id].joined == true) {  
         users[message.author.id].joined = false
         message.channel.send("```" + `${message.author.username} saiu da dungeon!` + "```")
         save(users, fileUsers)
      }

      if (!users[message.author.id].joined) return

      console.log(users)
      
      save(users, fileUsers)
   }
}
/**/