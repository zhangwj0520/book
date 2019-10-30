# 配置概况
## 1.全局配置

###  1.1 title
设置书本的标题
```
"title" : "Gitbook Use"
```
### 1.2 author
作者的相关信息
```
"author" : "zhangweijie"
```
### 1.3 description
本书的简单描述
```
"description" : "记录Gitbook的配置和一些插件的使用"
```

### 1.4 language
Gitbook使用的语言, 版本2.6.4中可选的语言如下：
en, ar, bn, cs, de, en, es, fa, fi, fr, he, it, ja, ko, no, pl, pt, ro, ru, sv, uk, vi, zh-hans, zh-tw

例如，配置使用简体中文
```
"language" : "zh-hans"
```
### 1.5 links
在左侧导航栏添加链接信息
```
"links" : {
    "sidebar" : {
        "Home" : "https://www.baidu.com"
    }
}
```
### 1.6 styles
自定义页面样式， 默认情况下各generator对应的css文件
```
"styles": {
    "website": "styles/website.css",
    "ebook": "styles/ebook.css",
    "pdf": "styles/pdf.css",
    "mobi": "styles/mobi.css",
    "epub": "styles/epub.css"
}
```
## 2. 插件列表 plugins

配置使用的插件
```
    "plugins": [
        "-search",
        "back-to-top-button",
        "expandable-chapters-small",
        "insert-logo"
    ]
```
其中"-search"中的 - 符号代表去除默认自带的插件
Gitbook默认自带有5个插件：

- highlight： 代码高亮
- search： 导航栏查询功能（不支持中文）
- sharing：右上角分享功能
- font-settings：字体设置（最上方的"A"符号）
- livereload：为GitBook实时重新加载

## 3. 插件属性配置pluginsConfig

```
  "pluginsConfig": {
    "insert-logo": {
      "url": "images/logo.png",
      "style": "background: none; max-height: 30px; min-height: 30px"
    }
  }
```