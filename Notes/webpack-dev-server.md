# webpack-dev-server

原文出自我博客项目的博客文档翻译：

https://github.com/Bedivere-Sun/blog/blob/master/Documents/webpack/webpack-dev-server.md

```text
- 布尔值默认为null是什么鬼？!……还有--lazy Lazy是啥？！
- 可能，这就是javascript吧……

　　　　　　——2018年12月20日的一次对话……
```
`webpack-dev-server`是利用用webpack建立一个开发服务器以提供内容的实时重载功能。此命令应该仅用于开发环境。
它也可以通过底层使用webpack-dev-middleware以实现在内存中处理webpack的资源。

我在这里罗列了webpack-dev-server的**全部**参数选项，并同样也按功能做了分类。
可以这么说,webpack-dev-server的这些丰富的参数是一种对不同习惯人群的示好，展现了很好的包容力。值得花时间看看，熟悉更多的用法。


----------


### 配置选项：
| 参数名 | 值类型 | 说明 |
| :-----: | :-----: | :-----: |
| --config | 字串 | 指定config文件所在路径。默认值：`webpack.config.js` 或 `webpackfile.js` |
| --config-register, -r | 数组 | 加载webpack配置前预加载一个或以上的模块。默认值：模块的id或路径 |
| --config-name | 字串 | 指定使用的配置名称 |
| --env | 字串 | 向配置内容传递环境参数，仅限以下三个值："development", "production", "none" |
| --mode | 字串 | 启用生产环境的优化或开发提示，仅限以下三个值："development", "production", "none" |

### 基本选项：
| 参数名 | 值类型 | 说明 |
| :-----: | :-----: | :-----: |
| --context | 字串 | 解析`entry`选项的最顶层文件夹。这是一个绝对路径。如果设置了`output.pathinfo`，则pathinfo改为这个路径。默认路径为当前文件夹 |
| --entry | 字串 | 为编译行为指定入口点 |
| --watch, -w | 布尔值 | 进入观察者模式，即当文件变动时重新执行生成 |
| --debug | 布尔值 | 切换各loader进入debug模式 |
| --devtool | 字串 | 一个增强debug功能的开发工具 |
| -d | 布尔值 | 使用这个选项表示同时指定了 `--debug`、`--devtool`、`--eval-cheap-module-source-map`和`--output-pathinfo`这四个选项 |
| -p | 布尔值 | 使用这个选项表示同时指定了 `--optimize-minimize`、`--define`和`process.env.NODE_ENV="production"` |
| --progress | 布尔值 | 打印一个便宜进度信息 |

### 模块选项：
| 参数名 | 值类型 | 说明 |
| :-----: | :-----: | :-----: |
| --module-bind | 字串 | 给loader绑定扩展 |
| --module-bind-post | 字串 | 给已用的loader绑定扩展 |
| --module-bind-pre | 字串 | 给预置的loader绑定扩展 |

### 输出选项：
| 参数名 | 值类型 | 说明 |
| :-----: | :-----: | :-----: |
| --output, -o | 字串 | 指定出口路径和参与编译的文件 |
| --output-path | 字串 | 指定出口文件夹路径，必须为**绝对路径** 默认值：当前文件夹 |
| --output-filename | 字串 | 指定每个输出到磁盘文件的名字。绝对**不要**在这里设置绝对路径！`output.path`选项将辨别文件的位置并为文件取一个唯一的文件名。默认值： [name].js |
| --output-chunk-filename | 字串 | `output.path`的相对路径中的非入口区块文件名。默认值： 文件名+[id] |
| --output-source-map-filename | 字串 | `output.path`中JavaScript文件的SourceMaps文件名。
| --output-public-path | 字串 | `publicPath`指定了文件被浏览器引用时所在的公开URL位置 |
| --output-jsonp-function | 字串 | wepack为了同步载入区块而使用的JSONP函数 |
| --output-pathinfo | 布尔值 | 决定是否在编译时加入模块相关的注释 |
| --output-library | 字串 | 将入口节点作为公开的库文件 |
| --output-library-target | 字串 | 指定库的类型。可选值分别为："var", "assign", "this", "window", "self", "global", "commonjs", "commonjs2", "commonjs-module", "amd", "umd", "umd2", "jsonp" |

### 高级选项：
| 参数名 | 值类型 | 说明 |
| :-----: | :-----: | :-----: |
| --records-input-path | 字串 | 将编译状态保存到json文件 |
| --records-output-path | 字串 | 从json文件读取编译状态 |
| -records-path | 字串 | 指定向/从json文件中存储或载入编译状态的`绝对路径`。这个参数指定了`recpordsPath`的内容，如果没有指定`recordsInputPath`或`recordsOutputPath`就会用它来做替代 |
| --define | 字串 | 在bundle定义一个自由变量 |
| --target | 字串 | 设置构建环境 |
| --cache | 布尔值 | 是否设置提高多重增量构建性能的模块与区块的缓存 |
| --watch-sdin, --stdin | 布尔 | 是否在标准输入流结束后自动关闭 |
| --watch-aggregate-timeout | 数字 | 设置首次变更后重新生成的延迟时间。单位：毫秒 |
| --watch-poll | 字串 | 启用轮询监视 |
| --hot | 布尔值 | 启用模块热替换功能 |
| --prefetc | 字串 | 预抓取目标请求 (例如： --prefetch) |
| --provide | 字串 | 为所有模块提供一个自由变量 (例如： --provide JQuery=jquery) |
| --labeled-modules | 布尔值 | 启用模块标注 |
| --plugin | 字串 | 载入指定的模块 |
| --bail | 布尔值 | 对错误信息采用零容忍策略。默认值: null |
| --profile | 布尔值 | 为每一个模块设置捕获定时信息。　默认值: null |
| --hot-only | 布尔值 | 如果模块热替换失败就不刷新页面 |

### 解析选项：
| 参数名 | 值类型 | 说明 |
| :-----: | :-----: | :-----: |
| --resolve-alias | 字串 | 重定向模块请求 |
| --resolve-exensions | 数组 | 重定向模块请求 |
| --resolve-loader-alias | 字串 | 为loader的解析过程设置别名 |

### 优化选项：
| 参数名 | 值类型 | 说明 |
| :-----: | :-----: | :-----: |
| --optimize-max-chunks | 数字 | 将会尝试保持区块计数值低于限定值 |
| --optimize-min-chunk-size | 数字 | 创建区块的最低尺寸条件 |
| --optimize-minimize | 布尔值 | 启用输出最小化策略。会用到`optimization.minimmizer` |

### 状态选项：
| 参数名 | 值类型 | 说明 |
| :-----: | :-----: | :-----: |
| --color, --colors | 布尔值 | 启用或禁用终端配色输出方案 |
| --info | 布尔值 | 输出webpack-dev-server运行细节。　默认值：true |
| --client-log-level | 字串 | 设置日志输出等级。可选值有`info`, `warning`, `error`和`none`。默认值：info |

### SSL选项：
| 参数名 | 值类型 | 说明 |
| :-----: | :-----: | :-----: |
| --https | 布尔值 | 是否启用HTTPS |
| --key | 字串 | 指定SSL秘钥的位置 |
| --cert | 字串 | 指定SSL证书的位置 |
| --cacert | 字串 | 指定CA证书的位置 |
| --pfx | 字串 | 指定SSL pfx证书的位置 |
| --pfx-passphrase | 字串 | pfx证书密码 |


### 响应选项：
| 参数名 | 值类型 | 说明 |
| :-----: | :-----: | :-----: |
| --content-base | 字串 | 指定HTML服务的目录 |
| --watch-content-base | 布尔值 | 启用实时重载 |
| --history-api-fallback | 布尔值 | 从单页面应用退回/index.html |
| --compress | 布尔值 | 启用gzip压缩 |

### 连接选项：
| 参数名 | 值类型 | 说明 |
| :-----: | :-----: | :-----: |
| --port | 数字 | 指定端口号 |
| --disable-host-check | 布尔值 | 设置是否检查主机 |
| --socker | 任意 | 指定监听的Socket文件 |
| --public | 字串 | 服务器的主机名或IP地址 |
| --host | 字串 | 服务器要绑定的主机名或IP地址。默认值："localhost" |
| --alowed-hosts | 字串 | 许可访问开发主机的主机名列表，主机名间用(半角)逗号分隔 |

### 其它选项：
| 参数名 | 值类型 | 说明 |
| :-----: | :-----: | :-----: |
| --help, -h | 无 | 显示这段帮助信息 |
| --version | 无 | 显示当前webpack-dev-server的版本 |
| --bonjour | 无 | 通过ZeroConf网络广播服务器信息 |
| --lazy | 无 | 字如其意 |
| --inline | 布尔值 | 是否启用内联模式，若为false则不启用客户端脚本的功能（比如：实时重载）。默认值: true |
| --open | 字串 | 打开默认浏览器，也可以后面跟字串打开指定的浏览器 |
| --useLocalIp | 布尔值 | 打开默认浏览器访问本机IP |
| --open-page | 字串 | 打开浏览器访问指定页面 |
