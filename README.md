# 前言

[README in English](README-en.md)

这是一个练手的点餐项目，目的是为了熟练vue技术栈，锻炼组件化开发思维。


## 技术栈

vue2  + vue-router + webpack + ES6/7 + axios + stylus + flex + svg + mock


## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，node 需要 6.0 以上版本

```
https://github.com/zhanghaiyang121/sell.git

cd sell

npm install 或 yarn(推荐)

npm run dev

```
## 关于接口数据

数据获取运用了mock.js来模拟数据

# 说明

>  开发环境 windows10  Chrome 77  nodejs 10.15.3

# 目标功能
- [x] 查看商家公告 --完成
- [x] 选择商品 --完成
- [x] 查看对应商品的评论 -- 完成
- [x] 查看购物车商品列表 --完成
- [x] 清空购物车 --完成
- [x] 查看商家评论 -- 完成
- [x] 查看好评和差评 --完成
- [x] 查看商家详情信息 -- 完成




# 部分截图


### 商品首页
<img src="./static/01.png" width="414" height="736"/>


### 商家公告活动详情

<img src="./static/02.png" width="414" height="736"/>

### 商品详情页面

<img src="./static/03.png" width="414" height="736"/>

### 购物车商品列表

<img src="./static/04.png" width="414" height="736"/>


### 商家评论页

<img src="./static/05.png" width="414" height="736"/>

### 商家详情页

<img src="./static/05.png" width="414" height="736"/>



# 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── dist                                         // 上线项目文件，放在服务器即可正常访问
├── screenshots                                 // 项目截图
├── src                                         // 源码目录
|   |
│   ├── api                                     // 数据交互统一调配
│   │   ├── ajax.js                             // 封装axios请求
│   │   └── index.js                            // 获取数据的接口
|   |—— common                                  // 公共资源
│   │   ├── css                                 // 公用css
|   |   |── fonts                               // 字体图标
|   |   |── star                                // 星星评价组件
|   |   └── stylus                              // 公用stylus
│   ├── components                              // 非路由组件
│   │   ├── cartControl                         // 控制选购商品数量的组件
│   │   ├── shopCart                            // 购物车组件
|   |   |── shopCartDetail                      // 购物车商品列表组件
|   |   |── star                                // 星星评价组件
|   |   |── headerDetail                        // 商家公告活动详情组件
|   |   └── commonHeader                        // 商家头部组件
│   ├── config                                  // 基本配置
│   ├── mock                                    // 数据模拟
|   |   |── data.json                           // 模拟的json数据
|   |   └── mockServer                          // mock数据接口
│   ├── pages
│   │   ├── goodsPage
│   │   ├── ratingPage
│   │   └── sellerPage
│   ├── router
│   │   └── router.js                           // 路由配置
│   └── store                                   // vuex的状态管理
│   |   ├── action.js                           // 配置actions
│   |   ├── getters.js                          // 配置getters
│   |   ├── state.js                            // 配置state
│   |   ├── index.js                            // 引用vuex，创建store
│   |   ├── mutation-types.js                   // 定义常量muations名
│   |   └── mutations.js                        // 配置mutations
│   └── utils                                   // 工具函数
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件

```

