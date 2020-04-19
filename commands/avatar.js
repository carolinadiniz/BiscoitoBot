module.exports = (message) => {

   let userid = message.mentions.users.first().id
   let username = message.mentions.users.first().username
   let avatar =  message.mentions.users.first().avatar


   let embed = {
      type: 'rich',
      title: `🖼 ${username}` ,
      image: {
         width: 600,
         url: `https://cdn.discordapp.com/avatars/${userid}/${avatar}.png?size=2048`,
         height: 600
      },
      description: `**Clique [aqui](https://cdn.discordapp.com/avatars/${userid}/${avatar}.png?size=2048) para baixar a imagem!**`,
      color: 7506394
   }
      
   message.channel.send({embed})

   //https://cdn.discordapp.com/avatars/+message.author.id+/+message.author.avatar+.png
}