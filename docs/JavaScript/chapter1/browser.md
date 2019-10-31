# 浏览器

## 1 Dom

### 1.1 什么是Dom
> DOM :Document Object Model（文档对象模型）, 是 W3C（万维网联盟）的标准,定义了访问 HTML 和 XML 文档的标准：

W3C 文档对象模型 （DOM） 是中立于平台和语言的接口，它允许程序和脚本动态地访问和更新文档的内容、结构和样式。
W3C DOM 标准被分为 3 个不同的部分：
+ 核心 DOM - 针对任何结构化文档的标准模型
+ XML DOM - 针对 XML 文档的标准模型
+ HTML DOM - 针对 HTML 文档的标准模型

### 1.2 什么是 HTML DOM？

HTML DOM 是：
+ HTML 的标准对象模型
+ HTML 的标准编程接口
+ W3C 标准
HTML DOM 定义了所有 HTML 元素的对象和属性，以及访问它们的方法。**换言之，HTML DOM 是关于如何获取、修改、添加或删除 HTML 元素的标准**。

## 2.浏览器渲染页面的过程
从耗时的角度，浏览器请求、加载、渲染一个页面，时间花在下面五件事情上：
  1. DNS 查询
  2. TCP 连接
  3. HTTP 请求即响应
  4. 服务器响应
  5. 客户端渲染

浏览器对内容的渲染（渲染树构建、布局及绘制），又可以分为下面五个步骤：

  1. 处理 HTML 标记并构建 DOM 树。
  2. 处理 CSS 标记并构建 CSSOM 树。
  3. 将 DOM 与 CSSOM 合并成一个渲染树。
  4. 根据渲染树来布局，以计算每个节点的几何信息。(layout)
  5. 将各个节点绘制到屏幕上。(Painting)
  6. 
需要明白，这五个步骤并不一定一次性顺序完成。如果 DOM 或 CSSOM 被修改，以上过程需要重复执行，这样才能计算出哪些像素需要在屏幕上进行重新渲染。实际页面中，CSS 与 JavaScript 往往会多次修改 DOM 和 CSSOM，下面就来看看它们的影响方式。

## 3.阻塞渲染：CSS 与 JavaScript
现代浏览器总是并行加载资源。例如，当 HTML 解析器（HTML Parser）被脚本阻塞时，解析器虽然会停止构建 DOM，但仍会识别该脚本后面的资源，并进行预加载。

同时，由于下面两点：

1. 默认情况下，CSS 被视为阻塞渲染的资源，这意味着浏览器将不会渲染任何已处理的内容，直至 CSSOM 构建完毕。
2. JavaScript 不仅可以读取和修改 DOM 属性，还可以读取和修改 CSSOM 属性。

   
存在阻塞的 CSS 资源时，浏览器会延迟 JavaScript 的执行和 DOM 构建。另外：

1. 当浏览器遇到一个 script 标记时，DOM 构建将暂停，直至脚本完成执行。
2. JavaScript 可以查询和修改 DOM 与 CSSOM。
3. CSSOM 构建时，JavaScript 执行将暂停，直至 CSSOM 就绪。
4. 
所以，script 标签的位置很重要。实际使用时，可以遵循下面两个原则：

1. CSS 优先：引入顺序上，CSS 资源先于 JavaScript 资源。
2. avaScript 应尽量少影响 DOM 的构建。

## 4.改变阻塞模式：defer 与 async
为什么要将 script 加载的 defer 与 async 方式放到后面呢？因为这两种方式是的出现，全是由于前面讲的那些阻塞条件的存在。换句话说，defer 与 async 方式可以改变之前的那些阻塞情形。

首先，注意 async 与 defer 属性对于 inline-script 都是无效的，所以下面这个示例中三个 script 标签的代码会从上到下依次执行。
```
<!-- 按照从上到下的顺序输出 1 2 3 -->
<script async>
  console.log("1");
</script>
<script defer>
  console.log("2");
</script>
<script>
  console.log("3");
</script>
```
### 4.1 defer
```
<script src="app1.js" defer></script>
<script src="app2.js" defer></script>
<script src="app3.js" defer></script>
```
defer 延迟执行引入js,就是js加载并未阻塞HTML的解析,两个过程是并行的,整个 document 解析完毕且 defer-script 也加载完成之后（这两件事情的顺序无关），会执行所有由 defer-script 加载的 JavaScript 代码，然后触发 DOMContentLoaded 事件。

defer 不会改变 script 中代码的执行顺序，示例代码会按照 1、2、3 的顺序执行。所以，defer 与相比普通 script，有两点区别：
 + 载入 JavaScript 文件时不阻塞 HTML 的解析，
 + 执行阶段被放到 HTML 标签解析完成之后。

### 4.2 async
```
<script src="app.js" async></script>
<script src="ad.js" async></script>
<script src="statistics.js" async></script>
```
async 属性表示异步执行引入的 JavaScript，与 defer 的区别在于，如果已经加载好，就会开始执行——无论此刻是 HTML 解析阶段还是 DOMContentLoaded 触发之后。需要注意的是，这种方式加载的 JavaScript 依然会阻塞 load 事件。换句话说，async-script 可能在 DOMContentLoaded 触发之前或之后执行，但一定在 load 触发之前执行。

从上一段也能推出，多个 async-script 的执行顺序是不确定的。值得注意的是，**向 document 动态添加 script 标签时，async 属性默认是 true**，下一节会继续这个话题


## 5.回流和重绘（reflow和repaint）
+ reflow（回流）:当浏览器发现某个部分发生了变化从而影响了布局,意味着元件的几何尺寸变了，我们需要重新验证并计算渲染树。是渲染树的一部分或全部发生了变化。这就是Reflow，或是Layout。
+ repaint（重绘）:repaint则是当我们改变某个元素的背景色、文字颜色、边框颜色等等不影响它周围或内部布局的属性时，屏幕的一部分要重画，但是元素的几何尺寸和位置没有发生改变。

display:none 会触发 reflow，
visibility: hidden属性并不算是不可见属性，它的语义是隐藏元素，但元素仍然占据着布局空间，它会被渲染成一个空框，所以visibility:hidden 只会触发 repaint，因为没有发生位置变化。

有些情况下，比如修改了元素的样式，浏览器并不会立刻 reflow 或 repaint 一次，而是会把这样的操作积攒一批，然后做一次 reflow，这又叫异步 reflow 或增量异步 reflow。有些情况下，比如 resize 窗口，改变了页面默认的字体等。对于这些操作，浏览器会马上进行 reflow。

## 6.优化渲染效率
1. 合法地去书写 HTML 和 CSS ，且不要忘了文档编码类型。
2. 样式文件应当在 head 标签中，而脚本文件在 body 结束前，这样可以防止阻塞的方式。
3. 简化并优化CSS选择器，尽量将嵌套层减少到最小。
4. 尽量减少在 JavaScript 中进行DOM操作。
5. 修改元素样式时，更改其class属性是性能最高的方法。
6. 尽量用 transform 来做形变和位移

https://www.cnblogs.com/slly/p/6640761.html
https://zhuanlan.zhihu.com/p/29418126
https://juejin.im/post/5a8e242c5188257a6b060000
