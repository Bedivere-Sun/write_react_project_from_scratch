# 关于`.babelrc`
这个是babel的一个配置文件。




### 选择你的用例
babel官方文档在配置babel章节中这样给出选择：
- 你想要以编程方式创建配置文件？
- 你想要编译 `node_modules？`
> `babel.config.js` 一定适合你！
- 你要为自己的简单的一个包应用静态的配置信息
> `.babelrc` 最符合要求！
- 盖伊·法利（什么鬼）是你心目中的英雄？
    那我们还是建议您使用`babel.config.js`格式。




### 文件结构
因为我不想以编程的方式创建配置文件，也没有什么编译`node_modules`的能力和野心。所以我选择的后者。
使用babel很像用一条功能很丰富的Linux终端命令。如果要正确的相对来说`.babelrc`则是配置一两个相对简单的参数。

对于`.babelrc`官方文档是这样介绍的：

在你的项目中创建一个名为`.babelrc`的文件并按以下格式填写配置内容：
```JSON
{
    "presets": [...],
    "plugins": [...]
}
```




### 采用顺序
`.babelrc`和`babel.config.js`文件必须放置在项目根目录下。如果`.babel`将一并处理这两个文件的配置内容。

示例：有如下目录结构
/
> package.json
> babel.config.js
> packages/
>> mod/
>>> package.json
>>> .babelrc
>>> index.js

这种情况下，编译`packages/mod/index.js`时babel将忽略`packages/mod/.babelrc`因为它不在根目录下。想要应用这个`.babelrc`文件的配置就要在`babel.config.js`文件中追加"babelrcRoots"的配置信息：
```javascript
babelrcRoots: [
    ".",
    "packages/*"
],
```
如此配置后packages/*下各包都将被应用`.babelrc`和`babel.config.js`的配置。



### 如何应用
官方文档也介绍了具体如何把Babel应用起来。如果是js内直接使用，则这么写：
```javascript
require("@babel/register")({
    rootMode: "upward"
});
```
如果是配置webpack的loader，则可以这么写：
```javascript
///...
module:{
    rules[{
        loader: "babel-loader",
        options: {
            rootMode: "upward",
        }
    }]
}
///..
```
__不过一般大家都会把options的部分省略……等回头项目写完了，我再找找这个原因，或者看看这个rootMode有什么意义。__
