# AMD、CMD、CommonJS、ES6 Module的区别

## 1. AMD（Asynchronous Module Definition)
> 1.1 诞生背景
基于commonJS规范的nodeJS出来以后，服务端的模块概念已经形成，很自然地，大家就想要客户端模块。而且最好两者能够兼容，一个模块不用修改，在服务器和浏览器都可以运行。但是，由于一个重大的局限，使得CommonJS规范不适用于浏览器环境。因为会有一个很大的问题：
```
var math = require('math');
math.add(2, 3);
```
第二行math.add(2, 3)，在第一行require(‘math’)之后运行，因此必须等math.js加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。您会注意到 require 是同步的。

这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于”假死”状态。

因此，浏览器端的模块，不能采用”同步加载”（synchronous），只能采用”异步加载”（asynchronous）。这就是AMD规范诞生的背景。

CommonJS是主要为了JS在后端的表现制定的，他是不适合前端的，AMD(异步模块定义)出现了，它就主要为前端JS的表现制定规范。
> 2.2 AMD (异步模块定义Asynchronous Module Definition) :是require.js在推广过程中对模块定义的规范化产出
是一个依赖前置、异步定义的AMD框架（在参数里面引入js文件），在定义的同时如果需要用到别的模块，在最前面定义好即在参数数组里面进行引入，在回调里面加载
+ AMD：
    1. 模块本身和模块之间的引用可以被异步的加载，是一个概念
    2. 先引入的模块，后使用的引用模块的方法，所以我们称之为依赖前置
+ AMD优点：
    1. 包括异步的调用和本身的高扩展性，
    2. 它实现了解耦，模块在代码中也可通过识别号进行查找。
+ require.js
    1. 是对AMD这个概念的实现，
+ require.js的诞生，就是为了解决这两个问题：
    1. 实现js文件的异步加载，避免网页失去响应；
    2. 管理模块之间的依赖性，便于代码的编写和维护。
+ 语法：
    1. define(<模块名称>, [依赖数组], 回调函数),通过变量来引用模块里面的方法，最后通过return来输出。


+ 例子

```
<!--index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    success
    <script data-main="./main.js" src="https://cdn.bootcss.com/require.js/2.3.6/require.min.js"></script>
</body>
</html>
```

```
//main.js
require.config({
    "jquery": {
        path: 'https://cdn.bootcss.com/require.js/2.3.5/require.min.js'
    },
    "a": {
        path: './a.js'
    }   
})

define('main', ['jquery', 'a'], function(jQuery, a) {
    console.log(jQuery);
    console.log(a)
})
```

```
//a.js
define('a', [], function() {
    return {
        msg: 'i am a!'
    }
})
```
<div style="text-align:center; padding-bottom:30px"><img style="height:250px;box-shadow: #aaa 5px 5px 10px;" src="https://upload-images.jianshu.io/upload_images/10754968-e3e45c9f7fbe2d38.png"/></div>

## 2.CMD(Common Module Definitio)
CMD 通过 sea.js实现  依赖就近
> 模块化前端技术栈，偏浏览器端。没有依赖前置，在什么地方使用到插件就在什么地方require该插件，即用即返。
遍历所有的require关键字，找出后面的依赖，将function toString后，用正则匹配出require关键字后面的依赖。
+ 特点:CMD推崇依赖就近，延迟执行。也就是说，只有到require时依赖模块才执行。
+ 实践:seajs
+ 例子

```
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.bootcss.com/seajs/3.0.3/sea.js"></script>
    <script src="./sea.js"></script>
</head>
<body>
</body>
</html>

//jquery.js
define(function (require, exports, module) {
  jquery源码
}

//main.js
define(function(require, exports, modules) {
    var $ = require('jquery');
    var changeText = require('./a.js')
    console.log(changeText.text)
    console.log('$', $)
})

//sea.js
seajs.config({
    alias: {
        'jquery': './jquery.js'
    }
})
console.log(seajs)
seajs.use('./main.js')

//a.js
define(function (require, exports, module) {
    var textContent = 'yes it works';
    exports.text = textContent;
    //or
    //module.exports = {
        //text: textContent
    //}
})
```
<div style="text-align:center; padding-bottom:30px"><img style="height:250px;box-shadow: #aaa 5px 5px 10px;" src="https://upload-images.jianshu.io/upload_images/10754968-a8f4c4d4e0410c39.png"/></div>

## 3.commonJS
> CommonJS规范为CommonJS小组所提出，目的是弥补JavaScript在服务器端缺少模块化机制，NodeJS、webpack都是基于该规范来实现的。
+ 特点: 
    1. 通过require来加载模块；通过exports和modul.exports来暴露模块中的内容；
    2. 一个文件就是一个模块，所有代码都运行在模块作用域，不会污染全局作用域；
    3. 同步加载模块，当所有模块加载完毕才执行下一步（不适合浏览器端，因为node的性能较好取决于磁盘，而前端浏览器还受制于网络）
    4. 模块在首次执行后就会缓存，再次加载只返回缓存结果，如果想要再次执行，可清除缓存；
    5. require返回的值是被输出的值的拷贝，模块内部的变化也不会影响这个值。
    6. 对于复杂数据类型，属于浅拷贝。由于两个模块引用的对象指向同一个内存空间，因此对该模块的值做修改时会影响另一个模块。
+ 输出方式: 输出方式有2种：默认输出---module export 和带有名字的输出---exports.area

```
//a.js
module.exports = function () {
  console.log("hello world")
}

//b.js
var a = require('./a');

a();//"hello world"

//或者

//a2.js
exports.num = 1;
exports.obj = {xx: 2};

//b2.js
var a2 = require('./a2');

console.log(a2);//{ num: 1, obj: { xx: 2 } }
```

> 1. 内存情况
对于基本数据类型，属于复制。即会被模块缓存。同时，在另一个模块可以对该模块输出的变量重新赋值。
对于复杂数据类型，属于浅拷贝。由于两个模块引用的对象指向同一个内存空间，因此对该模块的值做修改时会影响另一个模块。 如下例子 b.js内,对象里的值被修改了,

```
// b.js
let num = 1;
let obj = {
    name: 'hcd'
};
setTimeout(() => {
  console.log('b.js-num:', num);
  console.log('b.js-name:', obj.name);
}, 1000)
module.exports = {
  num,
  obj
}

// a.js
let mod = require('./b.js')
mod.num = 2;
mod.obj.name = 'newName'
console.log('a.js-num:', mod.num);
console.log('a.js-name:', mod.obj.name);

//运行node
node a.js
a.js-num:  2
a.js-name: newName
b.js-num:  1         // 1秒后
b.js-name: newName  // 1秒后
```

> 2. 执行情况
当使用require命令加载某个模块时，就会运行整个模块的代码。

当使用require命令加载同一个模块时，不会再执行该模块，而是取到缓存之中的值。也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。

循环加载时，属于加载时执行。即脚本代码在require的时候，就会全部执行。一旦出现某个模块被”循环加载”，就只输出已经执行的部分，还未执行的部分不会输出。

```
//a.js
exports.done = "aaa-1"
let b = require('./b.js')
console.log('a.js-1', b.done)
exports.done = "aaa-2"
console.log('a.js-2', '执行完毕')

// b.js
exports.done = "bbb-1"
let a = require('./a.js')
console.log('b.js-1', a.done)
exports.done = "bbb-2"
console.log('b.js-2', '执行完毕')

// c.js
let a = require('./a.js')
let b = require('./b.js')

console.log('c.js-1', '执行完毕', a.done, b.done)

//输出
b.js-1 aaa-1
b.js-2 执行完毕
a.js-1 bbb-2
a.js-2 执行完毕
c.js-1 执行完毕 aaa-2 bbb-2
```





## 4.ES6 Module
+ 特点:
    1. CommonJS模块是运行时加载，ES6 Module是按需加载（编译时加载）；
    2. CommonJS加载的是整个模块，将所有的接口全部加载进来，ES6 Module可以单独加载其中的某个接口；
    3. CommonJS输出是值的拷贝，ES6 Module输出的是值的引用，被输出模块的内部的改变会影响引用的改变；
    4. CommonJS this指向当前模块，ES6 Module this指向undefined;
目前浏览器对ES6 Module兼容还不太好，我们平时在webpack中使用的export/import，会经过babel转换为CommonJS规范。
+ 注意：export只支持对象形式导出，不支持值的导出，export default命令用于指定模块的默认输出，只支持值导出，但是只能指定一个，本质上它就是输出一个叫做default的变量或方法

```
/*错误的写法*/
// 写法一
export 1;

// 写法二
var m = 1;
export m;

// 写法三
if (x === 2) {
  import MyModual from './myModual';
}

/*正确的三种写法*/
// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};

// 写法四
var n = 1;
export default n;

// 写法五
if (true) {
    import('./myModule.js')
    .then(({export1, export2}) => {
      // ...·
    });
}

// 写法六
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   ···
});
```

+ 加载了两次lodash，但是只会执行一次
```
import { foo } from 'my_module';
import { bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';
```
+ 模块的整体加载



