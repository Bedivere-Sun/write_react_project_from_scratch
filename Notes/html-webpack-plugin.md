# 关于`html-webpack-plugin`
这是一个在webpack下为你那一捆一捆(bundles)的文件生成HTML5页面的插件，这对于包含了文件名hash的bundle文件来说很有作用。你可以通过此插件与lodash或其它模板、loader配合生成对应的html页面。

## 安装

```bash
npm install --save-dev html-webpack-plugin
```

## webpack有很多插件
webpack有很多插件涉及面特别广，具体的我旧不一一说明了，请参考 https://www.npmjs.org/pakcage/html-webpack-plugin

## 使用方法

`__webpack.config.js__`
```javascript
//这是一个最简单的配置
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:'index.js'
    output: {
        path: __dirname + '/dist',
        filename: 'index_bundle.js'
    },
    plugins:[
        new HtmlWebpackPlugin()
    ]
}
```

- 如此配置之后运行webpack打包文件后会生成一个`dist/index.html`，对应的bundle文件就是`index_bundle.js`
- 如果有多个入口文件，它们就会在页内分别通过`<script>`标签引入
- 如果打包的文件中包含css等样式文件内容输出，webpack会将其通过`<link>`标签引入HTML文件的头部
- 如果在生成html的过程中有其它插件需要调用配合使用的，则前后顺序应该为先声明html-webpack-plugin，然后再声明其它插件。

## 配置选项
你可以在配置过程中向`html-webpack-plugin`传入一组hash信息。有以下选项可供使用：

| 选项 | 数据类型 | 默认值 | 说明 |
| :-----: | :-----: | :-----: | :-----: |
| title | 字串 | '' | 设置title字段 |
| filename | 字串 | 'index.html' | 通过这个选项指定输出的文件名，默认为`index.html` |
| template | 布尔值、对象或函数 | '' | 指定webpack打包时一并打包的模板。详细内容请参考[这篇文档](https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md "官方文档原文") |
| templateParameters | 布尔、对象或函数 | '' | 重写模板中对应的参数 |
| inject | 布尔值或字串 | true | 一共有`true`、`head`、`body`和`false`这四个选项。这个选项决定了默认将bundle文件注入到页面的哪个部分。如果为`true`或`body`则将所有资源放置在body内容的最低部，如果设置为`head`则将所有资源放置在head元素内 |
| favicon | 字串 | '' | 指定页面选用的favicon的位置 |
| meta | 对象 | {} | 允许向页面注入meta标签比如：```meta:{viewport: 'weidth=device-width, initial-scale=1,, shrink-to-fit=no'}``` |
| minify | 布尔值或对象 | true | 配置输出的html-minifier选项 |
| hash | 布尔值 | false | 如果设置为`true`则webpack在编译所有引用文件后增加一个唯一的hash。这对缓存计算很有用 |
| cache | 布尔值 | true | 只有文件内容被修改时发布 |
| showErrors | 布尔值 | true | 如果有错误信息，其错误内容将被写入html页面 |
| chunks | 任意(?) | 任意(?) | 此选项允许你增加一些区块（例如：unit-test块）|
| chunksSortMode | 字串或函数 | auto | 允许你控制各区块在HTML页面中如何排序。可选值分比为`none`、`auto`、`manual`或指定的排序函数 |
| excludeChunks | 数组<.字串> | '' | 允许你跳过指定的区块 |
| xhtml | 布尔值 | false | 如果为`true`则渲染时遵从xhml的规范，将link标签改为自关闭 |

## 用例示范
```javascript
{
    entry: 'index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'index_bundle.js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: '我的应用',
            filename: 'aassets/admin.html'
        })
    ]
}
```

## 生成多个HTML文件 
生成多个HTML文件就是一个多次声明插件的过程
```javascript
{
    entry: 'index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'index_bundle.js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: '首页',
            filename: 'aassets/index.html'
        }),
        new HtmlWebpackPlugin({
            title: '后台管理',
            filename: 'aassets/admin.html'
        })
        //, ...
    ]
}
```

## 制作你自己的模板
如果默认生成的HTML不能满足你的需求，你可以自行制作自己的模板。最简单的办法就是通过`template`选项传入一个HTML文件，之后html-webpack-plugin将会自动注入所需的JS、CSS以及其它所需内容。
```javascript
plugins: [
    new HtmlWebpackPlugin({
        title: '自定义模板',
        template: 'template.html'
    })
]
```
__template.html__
```html
<!DOCTYPE html>
<html>
    <head>
        <title><%= htmlWebpackPlugin.options.title %></title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```
如果你的模板有专门的loader处理，你可以直接用它处理模板内容。需要注意的是如果你要用.html文件做模板，那么你应该为它指定html-loader来处理
```javascript
//...
module: {
    loaders[
        {
            test: /\.hbs$/,
            loader: "handlebars"
        }
    ]
},
plugins: [
    new HtmlWebpackPlugin({
        title: '使用自定义的loader处理模板',
        template: 'index.hbs'
    })
]
//..
```
如果inject功能不能满足你的要求，你又想要通过html-webpack-template的[默认模板](https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md)全盘掌控所有细节，那么你可以尝试通过`lodash`语法解决。可修改的变量主要有如下这些：
- __htmlWepackPlugin__: 向webpack的stats对象推送`asetsByChunkName`属性。它包含了对从入口节点名到bundle文件名的映射。具体请参考以下示例：
```javascript
"htmlWebpackPlugin": {
    "files": {
        "css": ["main.css"],
        "js": ["aassets/head_bundle.js", "assets/main_bundle.js"],
        "chunks": {
            "head": {
                "entry": "asets/head_bundle.js",
                "css": [ "main.css" ]
            },
            "main": {
                "entry": "assets/main_bundle.js",
                "css": []
            },
        }
    }
}
```
如果你在webpack配置中设置了一个publicPath，那么这个publicPath也将被映射到这段配置数据中。
    - `htmlWebpackPlgin.options`:　这个选项是作为一组额外的数据传给插件使用的。你基本上可以传给模板任意数据。
- `webpack`: 这个webpack指的是webpack的stats对象。这个对象信息只是在HTML模板正在编译后为补充内容供后续工作使用，之前已经指定的配置信息不会变动
- `webpackConfig`: 通过这个变量可以获取到webpack的配置信息。比如要获取publicPath则可以这样取得：`webpackConfig.output.publicPath`。具体可以参考我写的`src/templates/index.pug`文件，里面有相应的注释和使用示例。
- `compilation`: 官方文档原文写的是wepack的Compilation对象。不过compilation这部分在这次大的版本升级后这个说明文件米有了，目测应该是改为[Compilation Hooks](https://webpack.js.org/api/compilation-hooks/ "选自webpack官方文档")了。通过它直接获取被处理的文件或内建数据。原先是通过compilation.assets[...].source()。我现在还没找到对应的位置，也没有可以实际使用的场景……

## 过滤区块
如果让插件只在特定区块工作，可以通过这种方式限制执行范围：
```
plugins: [
    new HtmlWebpackPlugin({
        chunks: ['app']
    })
]
```
你也可以通过`excludeChunks`选项直接跳过指定的区块：
```javascript
plugins: [
    new HtmlWebpackPlugin({
        excludeChunks: ['dev-helper']
    })
]
```

## 内置事件
这里的“事件”是指插件功能完成过程中允许其它插件对HTML内容进行修改的这一种情况，具体的“事件插件”有这些：

### 同步执行插件
- html-webpack-plugin-alter-chunks

### 异步执行插件
- html-webpack-plugin-before-html-generation
- html-webpack-plugin-before-html-processing
- html-webpack-plugin-after-asset-tags
- html-webpack-plugin-after-html-processing
- html-webpack-plugin-after-emit

具体实现内置事件的案例请参考官方的[html-webpack-harddisk-plugin](htps://github.com/jantimon/html-webpack-harddisk-plugin "这个插件可以实现在webpack-dev-server环境下对硬盘写入html文件")

## 自制一个webpack插件
这里奉上一个官方的自制插件示例，也许会有助于我们对插件的理解。
#### plugin.js
```javascript
function MyPlugin(options){
    //配置你的插件选项
}

MyPlugin.prototype.apply = function(compiler){
    compiler.plugin('compilation', (compilation)=>{
        console.log('the compiler is starting a new compilation...');

        compilation.plugin(
            'html-webpack-plugin-before-html-processing',
            (data, callBack)=>{
                data.html += 'The Magic Footer'

                callBack(null, data)
            }
        )
    })
}

module.exports = MyPlugin
```
#### 在webpack.config.js中使用自制插件
```javascript
//...
plugins: [
    new MyPlugin({options: ''})
]
//...
```
需要注意你的插件必须设置一个回调(我在定义里特别写成了`callBack`)函数以保证其它同样通过监听`html-webpack-plugin-before-html-processing`事件的插件得到处理后的数据。

