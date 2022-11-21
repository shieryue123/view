## cookie
存储在客户端小数据字段，单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie

cookie 是存储于访问者的计算机中的变量。每当同一台计算机通过浏览器请求某个页面时，就会发送这个 cookie。你可以使用 JavaScript 来创建和取回 cookie 的值。

cookie 是客户端和服务端都可以控制存储方案


## session
session是存储在服务的数据，是基于cookie实现，数据存储存在服务，通过cookie 在客户端保存了一个sessionId，客户端每次发送请求的时候，都会通过请求头将cookie中存储所有数据包括sessionId携带到服务器，服务通过sessionId去获取对应用户的数据


## localStorage sessionStorage

localStorage 是永久存储，除非手动删除
sessionStorage有效范围是存储时到当前标签页关闭，并且无法跨标签页进行访问
localStorage 和 sessionStorage Api一致，唯一区别就是有效范围以及有效日期

