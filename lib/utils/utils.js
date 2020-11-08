const ejs = require('ejs');
const fs = require('fs')
const path = require('path')

const compileEjs = (template, data) => {
  // 渲染某个文件
  const templatePosition = `../templates/${template}`;
  const templatePath = path.resolve(__dirname, templatePosition)

  return new Promise((resolve,reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
       if(err) {
         console.log(err)
         reject(err)
         return
       }
       resolve(result)
    })
  })
  
}

const writeToFile = (filePath, data) => {
  dirPath = path.dirname(filePath)
  if(!fs.existsSync(dirPath)) mkdir(dirPath)
  fs.writeFileSync(filePath, data)
}
const mkdir = (dataPath) => {
  let dirArr = dataPath.split(path.sep)
  let dirCur = '/'+dirArr[1]
  for(let i=1; i<dirArr.length; i++) {
    if(!fs.existsSync(dirCur)) {
      fs.mkdirSync(dirCur)
    }
    if(i < (dirArr.length - 1)) dirCur = path.resolve(dirCur,dirArr[i + 1])
  }
}

module.exports = {
  compileEjs,
  writeToFile
}