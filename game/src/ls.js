const fs = require('fs')
const fileUsers = './game/json/users.json'
const fileClass = './game/json/class.json'


module.exports =  {
   load: (file) => {
      const fileBuffer = fs.readFileSync(file, 'utf-8')
      return JSON.parse(fileBuffer)
   },
   save: (content, file) => {
      const contentString = JSON.stringify(content)
      return fs.writeFileSync(file, contentString)
   },

   // USERS
   loadUsers: () => {
      const fileBuffer = fs.readFileSync(fileUsers, 'utf-8')
      return JSON.parse(fileBuffer)
   },
   saveUsers: (content) => {
      const contentString = JSON.stringify(content)
      return fs.writeFileSync(fileUsers, contentString)
   },

   // CLASS
   loadClass: () => {
      const fileBuffer = fs.readFileSync(fileClass, 'utf-8')
      return JSON.parse(fileBuffer)
   },
   saveClass: (content) => {
      const contentString = JSON.stringify(content)
      return fs.writeFileSync(fileClass, contentString)
   },

}