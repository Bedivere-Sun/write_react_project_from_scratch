import React from 'react';

//这行用于演示如何引入.less文件
import './Home.less';

import logo from 'svgImages/logo.svg';

export default class Article extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(<div>
            <img src={logo} alt="Hello React"/>
            <h1>Hello World!</h1>
            <p>Hello World! 你好，世界！</p>
        </div>);
    }
}
