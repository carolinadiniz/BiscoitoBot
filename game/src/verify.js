const ls = require('./ls')

module.exports = (message) => {
   const userID = message.author.id
   let usersID = Object.keys(ls.loadUsers())

   // CRIAR PERSONAGEM
   if (message.content.toLowerCase().startsWith('create char') && !usersID.includes(usersID) && Object.keys(ls.loadClass()).includes(message.content.split(/ +/g)[2])) {
      let users = ls.loadUsers()
      users[message.guild.id][userID] = {
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
      ls.saveUsers(users)

      console.dir(users, {depth: null})
   }
}