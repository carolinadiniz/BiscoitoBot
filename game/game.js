const ls = require('./src/ls')
const verify = require('./src/verify')





module.exports = (client, message) => {
   

   // VERIFICA SE O JOGO ESTÁ NA GUILD
   if (!Object.keys(ls.loadUsers()).includes(message.guild.id)) return
   
   
   verify(message)



}