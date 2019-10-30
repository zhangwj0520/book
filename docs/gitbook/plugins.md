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
## 4.copy-code-button 代码复制按钮
为代码块添加复制的按钮。
```
{
    "plugins": ["copy-code-button"]
}
```
## 5. todo
```
{
    "plugins": ["todo"]
}
```
使用示例
```
*   [ ]  code-review
*   [x]  drink a cup of tea
```
*   [ ]  code-review
*   [x]  drink a cup of tea

## 6. insert-logo 插入logo
将logo插入到导航栏上方中
```
{
    "plugins": [ "insert-logo" ]
    "pluginsConfig": {
      "insert-logo": {
        "url": "images/logo.png",
        "style": "background: none; max-height: 30px; min-height: 30px"
      }
    }
}
```

## 7. search-pro 高级搜索（支持中文）
支持中文搜索, 在使用此插件之前，需要将默认的search和lunr 插件去掉。

```
{
    "plugins": [
          "-lunr", 
          "-search", 
          "search-pro"
    ]
}
```
## 8.advanced-emoji - 支持emoji表情
[表情地址](https://www.webfx.com/tools/emoji-cheat-sheet/)

:bowtie:  :smile:  :laughing: :blush: :smiley:


```
{
    "plugins": [
        "advanced-emoji"
    ]
}
```

## 9.github 在右上角添加github图标
```
{
    "plugins": [ 
        "github" 
    ],
    "pluginsConfig": {
        "github": {
            "url": "https://github.com/zhangjikai"
        }
    }
}
```

## 10.emphasize 为文字加上底色

```
{
    "plugins": [
        "emphasize"
    ]
}
```
然后在markdown / asciidoc内容中，使用以下内容突出显示一些文本：
```
  This text is {% em %}highlighted !{% endem %}
  This text is {% em %}highlighted with **markdown**!{% endem %}
  This text is {% em type="green" %}highlighted in green!{% endem %}
  This text is {% em type="red" %}highlighted in red!{% endem %}
  This text is {% em color="#ff0000" %}highlighted with a custom color!{% endem %} 
```
This text is {% em %}highlighted !{% endem %}
This text is {% em %}highlighted with **markdown**!{% endem %}
This text is {% em type="green" %}highlighted in green!{% endem %}
This text is {% em type="red" %}highlighted in red!{% endem %}
This text is {% em color="#ff0000" %}highlighted with a custom color!{% endem %} 


## 11.splitter 侧边栏宽度可调节
```
{
    "plugins": [
        "splitter"
    ]
}
```

## 12.sharing-plus
为true的代表直接显示在页面顶端，为false的不显示，不写默认为false
"all"中代表点击分享符号显示出来的
```
{
    "plugins": ["-sharing", "sharing-plus"],
    "pluginsConfig": {
        "sharing": {
            "douban": false,
            "facebook": false,
            "google": true,
            "pocket": false,
            "qq": false,
            "qzone": true,
            "twitter": false,
            "weibo": true,
            "all": [
                "douban", "facebook", "google", "instapaper", "linkedin","twitter", "weibo", 
                "messenger","qq", "qzone","viber","whatsapp"
            ]
       }
    }
}
```

## 13.页面添加页脚、版权信息
```
{
    "plugins": [
       "tbfed-pagefooter"
    ],
    "pluginsConfig": {
        "tbfed-pagefooter": {
            "copyright":"Copyright &copy xxxx.com 2017",
            "modify_label": "该文件修订时间：",
            "modify_format": "YYYY-MM-DD HH:mm:ss"
        }
    }
}
```
## 14.page-copyright 页面页脚版权
```
{
    "plugins" : ["page-copyright"],
    "pluginsConfig" : {
        "page-copyright": {
          "description": "modified at",
          "signature": "你的签名",
          "wisdom": "Designer, Frontend Developer & overall web enthusiast",
          "format": "YYYY-MM-dd hh:mm:ss",
          "copyright": "Copyright &#169; 你的名字",
          "timeColor": "#666",
          "copyrightColor": "#666",
          "utcOffset": "8",
          "style": "normal",
          "noPowered": false,
        }
    }
}
```
## 15.sectionx 将页面分块显示
```
{
    "plugins": [
           "sectionx"
    ]
}
```
|  参数   | 说明  |
|  ----  | ----  |
|  data-title  | 该部分的标题，它将显示为bootstrap面板的标题（大小为h2）。请注意，您不能使用"标题中的字符，请&quot;改用。  |
|  data-id	  | 章节的id，对按钮控制很有用（在下一节中讨论）。 |
|  data-show	  | 默认表示面板内容是否可见的布尔值。true：默认情况下，面板内容对用户可见，面板标题可以单击。false：默认情况下，面板内容对用户隐藏，面板标题不可点击，只能通过添加自定义按钮查看（在下一节中讨论）。  |
|  data-nopdf	  | 一个布尔值，表示该部分是否将隐藏在pdf导出中。  |
|  data-collapse	  | 一个布尔值，表示默认情况下是否打开（但仍然可见）该部分。true：默认情况下，面板内容对用户可见，但已关闭。false：默认情况下，面板内容对用户可见，但已打开（默认设置）。  |
	




<button class="section" target="section2" show="显示模块1" hide="隐藏模块1"></button>
<!--sec data-title="模块2" data-id="section2" data-show=true data-collapse=true ces-->
内容部分1
<!--endsec-->

<!--sec data-title="标题2" data-id="section0" data-show=true data-collapse=true ces-->
内容部分2；
<!--endsec-->
## 16 page-treeview 生成页内目录
```
{
    "plugins": [
        "page-treeview"
    ],
    "pluginsConfig": {
        "page-treeview": {
            "copyright": "Copyright &#169; aleen42",
            "minHeaderCount": "2",
            "minHeaderDeep": "2"
        }
    }
}
```
这个插件生成目录以后，下面有一行关于版权的文字。如果想去掉的话，找到插件目录下的index.js文件：***/node_modules/gitbook-plugin-page-treeview/lib/index.js
找到大约111行，删除这一行关于var copyRight的定义
下面113行的var insertTreeview中，删除+ copyRight，目前就不显示了
142行中的'copyright': 'Copyright &#169; aleen42',也可以删除

## 16. donate 打赏插件
```
{
    "plugins": [
        "donate"
    ],
    "pluginsConfig": {
        "donate": {
            "wechat": "微信收款的二维码URL",
            "alipay": "支付宝收款的二维码URL",
            "title": "",
            "button": "赏",
            "alipayText": "支付宝打赏",
            "wechatText": "微信打赏"
        }
    }
}
```

## 17.alerts 警报

```
{
    "plugins": ["alerts"]
}
```

添加不同 alerts 样式的 blockquotes，目前包含 info, warning, danger 和 success 四种样式。



Info styling
> **[info] For info**
>
> Use this for infomation messages.

Warning styling
> **[warning] For warning**
>
> Use this for warning messages.

Danger styling
> **[danger] For danger**
>
> Use this for danger messages.

Success styling
> **[success] For info**
>
> Use this for success messages.

## 18.lightbox 单击查看图片
```
{
  "plugins": ["lightbox"]
}
```
## 19.custom-favicon 修改标题栏图标
```
{
    "plugins" : ["custom-favicon"],
    "pluginsConfig" : {
        "favicon": "path/to/favicon.ico"
    }
}
```
## 20. Include-csv

{% includeCsv  src="test.csv", useHeader="true" %} {% endincludeCsv %}




       


