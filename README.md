在豆瓣应用我们可以获取（或者搜索获取）到豆瓣的图书，电影，音乐列表以及相关的详情信息，具体效果图如下：

![](http://coding.imweb.io/img/p7/douban-demo.gif)

## 具体要求

1. 有下面的功能：
    - 列表页展示
    - 底部 Tab 切换类别
    - 顶部搜索框功能
    - 点击 item 展示详情页
    - 返回列表页等功能。

2. 拉取豆瓣上的数据
3. 管理代码规范：[standard](https://standardjs.com/)

## 1. 具体功能介绍
### 1.1 列表展示
共有三种不同类型的列表（图示-电影-音乐），每一个列表需要展示至少一页的内容。


图书列表：

![](http://coding.imweb.io/img/p7/book-list.png)

电影列表：

![](http://coding.imweb.io/img/p7/movie-list.png)

音乐列表：

![](http://coding.imweb.io/img/p7/music-list.png)

### 1.2 底部导航
底部常驻导航栏，点击可切换不同类型，控制列表展示相应的内容。

![](http://coding.imweb.io/img/p7/navbar.png)

### 1.3 顶部搜索
顶部搜索框，输入内容点击搜索后，会在当前类别进行搜索出相关内容

![](http://coding.imweb.io/img/p7/search.png)

### 1.4 内容详情
点击列表中的每一项可以进入内容详情，点击左上角可返回

图书详情：

![](http://coding.imweb.io/img/p7/book-detail.png)

电影详情：

![](http://coding.imweb.io/img/p7/movie-detail.png)

音乐详情：

![](http://coding.imweb.io/img/p7/music-detail.png)

