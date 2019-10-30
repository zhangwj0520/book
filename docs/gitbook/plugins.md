# Plugin

一些实用的插件
 1. 用法：在book.json中添加"plugins"和"pluginConfig"字段。
 2. 然后执行gitbook install，或者使用NPM安装npm install gitbook-plugin-插件名，也可以从源码GitHub地址中下载，放到node_modules文件夹里（GitHub地址在进入插件地址右侧的GitHub链接）

## 1.back-to-top-button 回到顶部

```
{
    "plugins": [
        "back-to-top-button"
    ]
}
```
## 2.导航目录扩展
chapter-fold 导航目录折叠
```
{
    "plugins": ["chapter-fold"]
}
```

## 3.代码复制，行号
code 代码添加行号&复制按钮（可选）
为代码块添加行号和复制按钮，复制按钮可关闭
单行代码无行号。
```
{
    "plugins" : [ 
            "code" 
    ],
    "pluginsConfig": {
    "code": {
        "copyButtons": false
    }
    }
}
```
## copy-code-button 代码复制按钮
为代码块添加复制的按钮。
```
{
    "plugins": ["copy-code-button"]
}
```

