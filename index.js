#!/usr/bin/env node

const program = require("commander")
const { helpOption } = require('./lib/core/helpOptions')
const { 
  createCommands 
} = require('./lib/core/commanders')


// 查看版本号
program.version(require('./package.json').version)

// 帮助与可选信息
helpOption()
// program.option('-d --dest <dest>', 'a destination forder, 例如 src/')

// 设置命令  创建项目demo
createCommands()

program.parse(process.argv)

