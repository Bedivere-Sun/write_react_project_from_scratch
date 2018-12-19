const path = require('path');

//这里我引入html-webpack-plugin作为一个实例在后面插件部分使用。详细的html-webpack-plugin的介绍请参考Notes/html-webpack-plugin.md
const H5Plugin = require('html-webpack-plugin');

module.exports = {
	//选择当前环境，有production 、 developemtn 和 none三个选择
	mode: 'development',
	//入口节点，指明webpack开始打包的位置

	// ****** 我对entry这部分设置的理解是，要写多少个主页面就配置多少个对应的名称……不知道这样理解对不对……
	entry: {
		home: path.resolve(__dirname, './src/pages/Home/index')
	},
	/*
		出口节点，这里通过path模块解析了打包输出的位置
		filename表示输出的文件名称
		[name]是webpack的一种写法，表示多个入口名时输出多个对应的文件。
	*/
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js'
	},
	/*
		模块配置，主要作用是规定各个loader的调用方式
		test作为正则匹配来使用，匹配成功的应对应的规则和loader
		exclude: 是指定不处理哪个文件夹中的文件
		include: 指定处理哪个文件夹的文件，未包含的不指定
		官方文档中建议主要使用include来配置
	*/

	// ****** 这里有几处include重复了，应该有什么方法简化一下写法
	module: {
		rules: [
			//　这里设置babel-loader处理jsx文件
			{
				test: /\.jsx?$/,
				include: path.resolve(__dirname, './src/pages/'),
				loader: 'babel-loader'
			},
			// file-loader就是直接处理这些图片并展示出来
			{
				test: /\.(png|gif)/,
				include: path.resolve(__dirname, './static/images/'),
				loader: 'file-loader'
			},
			// 我这里的想法是jpg一般都比较小，可以转换成url-data数据直接调用。我把logo文件的svg也写在这里了。
			{
				test: /\.(jpg|jpeg|svg)/,
				include: path.resolve(__dirname, './static/images/'),
				loader: 'url-loader'
			},
			// 通过less代替原始的css
			{
				test: /\.less/,
				loader: 'style-loader!css-loader!less-loader'
			}
		]
	},
	plugins: [
		//这里是在文件起始位置引入的html-webpack-plugin对象的实例
		new H5Plugin({
			chunks: 'home',
			title: 'Hello Pug and React!',
			template: `!!pug-loader!${path.resolve(__dirname, './src/templates/index.pug')}`
		})
	],
	resolve: {
		/*
			resolve选项是webpack帮助模块找到模块的绝对路径而使用，主要用于解析模块的请求
			在这个部分设置的都是和路径有关的，webpack通过一个叫resolver库帮助自己找到bundle要引入的代码，然后利用enhanced-resolve来解析文件路径
			enhanced-resolve是webpack在github上开放的一个子项目，用于提供一个同步的可高度定制的require.resolve功能
			项目地址为https://github.com/webpack/enhanced-resolve
			通过源码的介绍我发现，似乎ResolveFactory里面可以用到的一切选项你都可以用到配置文件的这个部分来。不过咱们这里最主要的目的还是为了解决某一类扩展名文件的引用方式
			文档中对extensions选项的定义是设置一个列表，用以尝试文件是否存在。也就是说，如果我要require('./Home')，如果webpack没有找到./Home这文件，它就会检测有没有./Home.{js, jsx}，
			如果有对应的文件则直接引入，否则才抛出文件不存在的错误。这里也要注意尝试是按照列表的前后顺序进行的。如果你希望默认的先尝试引入扩展名为.jsx的文件，那.jsx就要写在前面。
		*/
		extensions: ['.js', '.jsx'],
		alias:{
			svgImages: path.resolve(__dirname, 'static/images/svg')
		}
	},
		/*
			根据网上一大抄的”主流配置“来看，一般这里人们都会倾向于写这么一种格式来配置：

			externals: ['react', 'react-dom']
			或者
			externals: {
				"react": "React",
				"react-dom": "ReactDOM"
			}

			但是一方面这些配置未必可以直接用在自己的项目中，另一方面也没有让人明白为什么要这样写。为了探究这个部分我也的确是翻了不少地方花了很多时间，最后得出结论如下：

			1.  从webpack的官方文档来看：external选项提供一个从输出的bundle文件中排除对应依赖的配置。它可以防止某些引用的模块打包到bundle中，进而指定在运行时从外部获取这些额外的依赖。

			2.  我的理解是这个设置是为了不让webpack打包的时候将一切引用的文件都一起打包而设置的。
				比如你要用到jQuery，不会对jQuery做开发和修正，主要还是使用jQuery的各个函数或语法，因此就没有必要让webpack打包时将jQuery一起进行优化——毕竟jquery.min.js就已经做的足够好了，
				所以不如直接在页面中通过<script src="jquery.min.js"></script>直接引入并使用更好。而且这样也节省了webpack优化的时间。
			
			对于上面这两种写法分别能达到什么目的在官方文档中的Externals → object章节开头是这样写的：
			对于一个通过花括号(形如{root, amd, commonjs, ...})括起来的对象而言，它们只允许output.libraryTarget:'umd'的调用
shifan
			所以我的理解就是形如json格式的就是目标为umd对象，其它库的目标的调用要通过[...]这样的格式来实现调用

			我直接调用react和react-dom的umd文件夹下的js文件，所以使用第二种写法

			另外externals支持正则表达式，所以第一个也可以写成以下的格式：

			externals: /^react(\s|\S)+$/
		*/
		externals: {
			"react": "React",
			"react-dom": "ReactDOM"
		}
};
