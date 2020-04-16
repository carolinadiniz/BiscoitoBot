module.exports = (message) => {
   const text = {
      "*biscoito @alguém" : "Manda uma mensagem fofa para alguém",
      "*gif <nome> <link.gif>" : "adiciona gif ao servidor",
      "*gifall" : "Mostra todos os gifs",
      "*ping" : "[manutenção]",
      "*avatar" : "[manutenção]"
   }
   const arraytext = Object.keys(text)
   let text_formatted = ''
   for (let keys of arraytext) {
      let text_space = ''
      for (let i = 0; i < (28 - keys.length); i++) {
         text_space = ' ' + text_space
      }
      text_formatted = text_formatted + "\n" + keys + text_space + text[keys]
      
   }

   message.channel.send("```md\n" + "#                        COMANDOS BISCOITO BOT \n" + text_formatted + "```")
}