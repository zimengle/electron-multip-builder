# electron-multip-builder

## 介绍

electron经过builder打包之后就不能使用electron命令再启一个服务了，这个工具修改了electron asar源码处理了一下


### 如何修改

1. 自己通过electron-download下载自己需要的版本和平台
2. 通过asar 解压 electron.asar文件，拷到electron下
3. 修改源码

```javascript

const searchPaths = ['app', 'app.asar','default_app.asar']
```
替换成
```javascript
let searchPaths
if(process.argv.length >= 2){
    searchPaths = ['default_app.asar','app', 'app.asar']
}else{
    searchPaths = ['app', 'app.asar','default_app.asar']
}
```

4. 执行命令

```
    npm run pack
```


5. 对应的源码会重新打包在script下对应版本平台下electron.asar

### 如何集成

1. 将script文件拷到自己的工程下
2. 在package.json里script追加一个postinstall后置脚本进行替换

```javascript
{
    "postinstall": "node script/replace.js"
}
```



