/**
 * 执行终端命令 相关的代码
 */
const { spawn } = require('child_process')


const commandSpawn = (...rest) => {
  return new Promise((resolve,reject) => {
    const childProcess = spawn(...rest) // 开启子进程
    // 打印进程执行过程中的打印信息 放入主进程的输出流
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', () => { // 监听进程关闭 
      //callback promise
      resolve()
    })
  })
}
module.exports = {
  commandSpawn
}