const program = require('commander')

const helpOption = () => {
   program.option('-f, --file','create file')
          .option('-d, --dest <dest>', 'add a destination router')

   //自定义help
}

module.exports = {
  helpOption
}
