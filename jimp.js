const jimp = require('jimp')

// Background
const cookies = ['./img/cookies/cookies1.jpg', './img/cookies/cookies2.jpg', './img/cookies/cookies3.jpg', './img/cookies/cookies4.jpg', './img/cookies/cookies5.jpg']

module.exports = (client, message) => {
   async function main() {
      
      let randomCookies = cookies[Math.floor(Math.random() * cookies.length)]

      let canal = client.channels.cache.get("696313293337526274")
      let url_avatar = `${message.member.user.displayAvatarURL().replace('.webp', '.png?size=2048')}`
      let font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
      let mask = await jimp.read('./img/mask.png')
      let background = await jimp.read(randomCookies)
      
      jimp.read(url_avatar).then((avatar) => {
         
         avatar.resize(150, 150)
         mask.resize(150, 150)
         avatar.mask(mask)
         background.resize(600, 266)
         background.print(font, 169, 173, message.member.user.username)
         background.composite(avatar, 22, 42).write('./img/welcome.png')

         
         canal.send(``, { files: ["./img/welcome.png"] })
      }).catch(() => {

      })
   }
   
   main()
   
}