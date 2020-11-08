### cli步骤
1.shebang #!
2. package.json 中添加bin 属性
bin 中配置执行文件 的命令与路径
3. npm link  或者sudo npm link  连接起来

4. commander 包
 解析 process.argv


查看版本号

帮助 选项

创建命令

#### create 命令
下载git 项目 
插件 download-git-repo

用回调函数

用node 的promisify  转化为peomise

const { promisify } = require('util')

