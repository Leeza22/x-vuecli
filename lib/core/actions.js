const { NOTIMP } = require('dns')
const { promisify } = require('util')
const path = require('path')

const download = promisify(require('download-git-repo'))
const open = require('open')

const { vueWebpack,vueTemp } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')

 /* 创建项目demo 拉去文件*/
const createProjectAction = async (project) => {
  console.log("start our clone")
  // 1.克隆项目
  await download(`direct:${vueTemp}`, project, {clone: true}); //下载成功无返回值
  console.log("拉取完成，开始安装依赖包")
  // 2.执行npm install 

  //windows 实际执行npm.cmd
  const command = process.platform === 'win32'? 'npm.cmd' : 'npm';
  await commandSpawn(command, ['install'], {cwd: `./${project}`})
  console.log("依赖包安装完毕")

  // 3.运行项目 npm run serve
  commandSpawn('npm', ['run','serve'], {cwd: `./${project}`}) // 这个进程打开 不会被监听到结束 不加await 先执行打开浏览器

  // 4.打开浏览器  第三方库open npm install open
  open('http://localhost:8080')
  
}

const { 
  compileEjs,
  writeToFile
 } = require('../utils/utils')

/** 创建vue组件action */
const addVueCpnAction = async (name, dest) => {
 /**
  * 创建ejs 模版 编译ejs 模版
  */
  const result = await compileEjs('vue-component.ejs', { name, lowerName: name.toLowerCase() })

  // 2. 写入.vue文件
  const targetPath = path.resolve(dest, `${name}.vue`)
  writeToFile(targetPath, result)
  console.log('添加组件成功')
}

/** 创建页面 页面与页面组件 页面路由 */
const addVuePageAction = async (name, dest) => {
  const component = await compileEjs('vue-component.ejs', { name, lowerName: name.toLowerCase() })
  const router = await compileEjs('vue-router.ejs', { name, lowerName: name.toLowerCase() })
  // 写入文件
  const cpnPath = path.resolve(dest, `${name}/${name}.vue`)
  const routerPath = path.resolve(dest, `${name}/router.js`)
  writeToFile(cpnPath, component)
  writeToFile(routerPath, router)
  console.log('添加页面成功')
}
module.exports = {
  createProjectAction,
  addVueCpnAction,
  addVuePageAction
}

