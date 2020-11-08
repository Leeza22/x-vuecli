const program = require('commander')

const {
  createProjectAction,
  addVueCpnAction,
  addVuePageAction
} = require('./actions')
const createCommands = () => {
    program.command('create <project> [other...]')
           .description('clone a repository into a folder')
           .action(createProjectAction)
    program.command('addCpn <name>')
           .description('add a vue component, eg: why addCpn Hello [-d src/components/name]')
           .action((name) => addVueCpnAction(name, program.dest? program.dest : 'src/components'))
    program.command('addPage <name>')
           .description('add a vue page, eg: why addPage Hello [-d src/page/name]')
           .action((name) => addVuePageAction(name, program.dest? program.dest : 'src/pages'))
}

module.exports = {
  createCommands
}