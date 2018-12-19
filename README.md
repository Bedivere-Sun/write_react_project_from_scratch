# 抽丝剥茧的学前端之React篇

| 项目 | 详细 |
| :-----: | :-----: |
| 起草时间 | 2018年12月10日 |
| 版本 | 第一版 |
| 关键字 | webpack基础、 babel简介、 基础环境搭建、 基础知识、　简单的react程序 |
| 起稿人 | @Bedivere-Sun |

## 目录结构
| 目录名 | 简介 |
| :------: | :------: |
| 根目录 | 本项目的根目录，最重要的文件有`.babelrc`、`package.json`和`webpack.config.js`。 |
| Notes | 一些未尽事项的补充说明，以及我对某一个模块比较系统的学习后的一些知识分享 |
| src | 源文件入口，`pages`用于存放各种页面，`templates`存放模板 |
| static | 存放各类静态资源 |
| archives | 存放变动较大的历史版本，以帮助和我一样刚接触此项目的同学理清头绪，否则未来项目堆积的越来越多，恐怕不利于新人查看了 |

    
## 关于本项目
React是一个我此前从来没接触过的概念。原先我总天真的以为学会写html5，会css3，会js（现在看应该是ES5）编写和应用各类API到自己的页面上就算有前端基础了。其实并非如此，我学到现在，我认为React其实是一个掌握了“真正的前端基础”之后，才能开始毫无疑虑地写出自己想要的组件并通过自己或团队的协助将内容重新统筹显示出来的神奇框架。

对于更多的和我一样一上来就有点半吊子，自我感觉良好却什么都不会写，还要赶工作快速适应的人来说，React项目乱写的确会出现更多的问题，修改起来成本更高。不如抽时间写一个最基础的最抽丝剥茧的React项目出来。一方面自己可以对React相关知识有进一步的掌握和认识，另一方面也方便和我一样善于刨根问底的程序员朋友们，从我这个基础上出发，去钻更有必要钻的牛角尖。

本项目和其它的搭建一个最基本的React框架几乎没有任何区别，我只是加入了更多我自己的见解、注释，一方面可以让人明白React框架是怎么来的，有哪些组成成分，另一方面就是提出更多疑问，不断将问题解决，完善项目，最后成为一个相对较为全面的react相关的知识库。

目前本项目是以webpack为基础搭建的，我基本上看到的所有教程包括脚手架(create-react-apps)好像都是通过webpack配置的，基本上webpack就是基础

## 优缺点
### 优点
1. 看明白这个项目，你基本上可以没有顾虑的写React项目了
1. 这就好比一个知识库，尽可能多的把疑问和解答都体现在项目中，随用随查
1. 基本上可以排除很多刚接触到React的新手遇到的”不会写“、”不知道怎么写“、”不明白这是怎么回事“的这些困难
1. 尽可能做到事无巨细，把所有我——也就是小白们遇到的问题都一一解决掉，如果没有解决我会标注出来，让（万一呢）感兴趣一撇的大佬看到指导一下，进而达成解决所有疑问的目的

### 缺点和不足
1. 我的基础相对也属于较差的，有一些非常不专业的地x
1. 我对外语的理解应该也有不符合各位预期的地方，可能会有误读或误解
1. 我更倾向于把能说清楚的地方尽可能表达好，所以很多地方会显得冗长且啰嗦
1. 我本来就是小白，刚入个门，所以有一些想法和各位可能有一些差距，并不能解决所有疑问
1. 项目很简单，也非常小，实现小的简单的容易，但是实现在大型工作场景方面没有任何经验，可能没有任何帮助


这么看……这项目似乎缺点比优点多啊……Orz……

## 使用到的包/模块

### 生产环境的包
暂时没有

### 开发环境的包
#### webpack相关
- `__webpack__`
    - 目前在这个项目中我使用的是webpack
- `__webpack-cli__`
    - 通过webpack打包基本通过webpack-cli完成，运行wepack-cli后，webpack会自行寻找项目根目录下的webpack.config.js。如果执行时设置了对应的指令参数，则webpack会先载入指令参数的配置，然后读取webpack.config.js文件中的配置内容，并将指令参数中已有的配置覆盖，最后再执行对应的打包或服务过程。这里要注意，如果你没有webpack.config.js，你至少要指定出入口文件的位置，否则webpack会一直不断的报错说”找不到webpack.config.js文件“
- `__webpack-dev-server__`
    - 这个模块应该仅用于开发环境下，通过webpack设置一个开发服务器，可以提供动态重载等丰富的功能

    - 我看官方还有一点提到它可以和webpack-dev-middleware结合使用以让webpck-dev-server在内存中处理数据（？好像是这样），具体等未来再回头看吧……

##### 我用到的loader
- `__url-loader__`
    - 这个loader可以把较小的文件直接序列化为url-data格式的信息，简化了读取文件的过程
- `__file-loader__`
    - 比较大的文件不适合转化的时候，直接通过它读出来更有效率
- `__babel-loader__`
    - babel系列的模块都是为了实现将ES6向下兼容的目的，这个loader就是处理es6代码的
- `__style-loader__`
    - 这个loader通常要与其它样式文件的loader一并使用，一般都是先通过`style-loader`处理后再交给其它样式loader继续处理
    - 我的理解是：`style-loader`主要作用就是在JS的DOM树中创建`style`节点
    - 示例：
    ```javascript
    //这里以处理CSS样式为例，列出两种通过style-loader配合css-loader处理样式文件的格式。
    //第一种格式：
    {
        //...
        module: {
            rules: [
                {
                    test: /\.css/,
                    use: [
                        { loader: "style-loader" },
                        { loader: "css-loader" }
                        //其它相关配置
                    ]
                }
            ]
        }
        //...
    }
    //第二种格式，这种格式我觉得相对括号比较少，算是避免了引用地狱吧……
    {
        //...
        module: {
            rules: [
                {
                    test: /\.css/,
                    loader: 'style-loader!css-loader'
                    //其它相关配置
                }
            ]
        }
        //...
    }
    ```
- `__css-loader__`
    - 结合`style-loader`使用，将css转置为CommonJS
- `__less-loader__`
    - 将less内容编译为CSS信息
    - loader的处理顺序是 style-loader → css-loader → less-loader
    - `less-loader`需要安装`less`作为依赖
- `__pug-loader__`
    - 我习惯使用pug作为模板引擎
    - `pug-loader`需要安装`pug`作为依赖

#### babel相关
最开始我选择的包是这些，这些都是网上一大抄文章中推荐的默认必装包：
- ...
- babel
- ...

但是我通过npm安装后发现npm反馈一个提示说自6.x版本开始babel就废弃了，所以其实这个可以省略掉。另外，我还发现虽然babel有独立模（命名型如 /^babel-\s+.$/ ）块，但是这些不能作为其它模块的依赖使用，只是独立使用的。最典型的例子就是我如果要使用`babel-loader`，就要安装`@babel/core`，你即便安装了`babel-core`模块也不起作用。我认为可以这样理解：形如`@babel/...`的都是babel的子模块，而形如`babel-...`的是可以直接拉出来独立使用的独立模块。

最终，我与babel相关的包有这几个：
- `__@babel/core__`
    - 这个是Babel的核心依赖模块，基本上所有babel的子模块都要用到它。
- `__@babel/polyfill__`
    - polyfill可以虚拟一个ES6（ES2015）标准的环境。有了它你就可以使用最新（仅限 < state4 环境下）的内建指令比如`Promise`和`WeakMap`，也可以使用一些静态或实例方法，如`Array.from`、`Object.assign`、`Array.prototype.includes`等。
- `__@babel/preset-env__`
    - 自动优化你的代码以减小bundle文件的体积。一般在`.babelrc`中配置：
    ```javascript
    {
        "preset": ["@babel-preset-env"]
    }
    ```
    或配置相应的参数，书写格式为：
    ```javascript
    {
        "presets": [
            "@babel/preset-env",
            {
                "useBuiltIns": "entry"
            }
        ]
    }
    ```
    preset-env参数很多，具体的需要通过查看官方文档的@babel/preset-env部分来按需取用。这里没啥需求，直接不写
- `__@babel/preset-react__`
    - 基本上preset都是实现自动优化方面的功能。这个模块就是专门优化React项目中的jsx文件、显示名称的统一和语法实现部分的。我觉得可以这样理解这个模块，它实现了JSX文件编译过程，如果只有`babel-loader`那么它只能处理文件中的ES6的内容，而有了这个模块，项目在编译打包过程中就可以处理JSX文件中的全部内容。它同样一般配置在`.babelrc`文件中：
    ```javascript
    {
        "presets": ["@babel/preset-react"]
    }
    ```
    或配置相应参数，格式为：
    ```javascript
    {
        "presets": [
            [
                "@babel/preset-react"",
                {
                    "pragma": "dom",            //默认值其实为React.createElement，替代默认JSX文件编译时使用的函数
                    "pragmaFrag": "DomFrag",    //默认值其实为React.Fragment，替代默认默认JSX问津编译时使用的分段方式
                    "throwIfNamespace": false   //默认值为true，表示如果XML命名空间有冲突是否抛出错误信息
                    //另外还有useBultIns, development参数，自行翻文档吧……
                }
            ]
        ]
    }
    ```


#### 真正的主角
- `__react__`
    - react的基础模块
- `__react-dom__`
    - 用于生成react的DOM树的模块

##　其它的一些声明
1. 项目中的理解概念可能有不对的地方，请各路前辈看到后不吝指正
1. 未来版本更新后，旧的阶段性版本我会保存在`archives`文件夹下，以便新人学习使用，避免内容太过复杂或混乱
1. 授权采用GPL-3.0-or-later，如需转发到自己空间下请尽量先fork到仓库，有需要改善的地方也方便咱们合并过来一同维护（真的会有人在乎这个项目么？……）
1. 目前释出的是第一版，和react还不太相关，主要都是webpack基础配置和简单入门页面的制作等相关的内容。我会在之后不断学习的过程中了解并学习更多react知识并更新出来
1. 我目前还是刚入门的小白，研究的还是很边缘的内容，其实我对react这个框架本身还是有很多不懂的地方。在项目撰写过程中我发现的不明白不清楚的地方我已经加了特别注释，应该会在后续版本更新中一点点啃下来

## 参考文献目录
- [babel7官方文档](https://babeljs.io/docs/en "解决了我对babel配置方面几乎所有的疑问")
- [webpack官方文档](https://webpack.js.org/concepts "解决了我几乎所有对webpack方面的疑问")
- [教程：从零开始使用webpack 4, Babel 7创建一个React项目（2018）](http://www.imweb.io/topic/5be0159bb5bbd42b053d0458 "腾讯imweb的一篇博文")

## 感谢
| 昵称/用户名 | 介绍 |
| :-----: |  |
| 正在读取中 | 正在读取中是一位很有经验的前辈，在我范各种新手错误的时候没有直接甩给我一句“你js基础不行”，而是告诉我我js哪个基础薄弱，什么知识没有，让我在学习的时候有方向 |
| lin | 腾讯Next认证课程的老师，指正了我很多不好的代码书写习惯和理解上的问题 |
| chiehyang | 腾讯Next认证课程的老师，解决了我无数疑问，有问必答，mark之后很快就会一一答疑。很厉害 |
| 小刘 | 已经在职的前端大拿，最开始我一筹莫展的时候他告诉我还有webpack这个模块，才有了后来这些知识的基础 |

感谢各位前辈和老师的帮助，没有你们，我不可能写出这个项目。

__Bedivere Sun__
__2018年12月19日__
