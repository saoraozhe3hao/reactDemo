(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/********************** 组件生命周期 *********************************/
// 定义 CommonJS 模块
module.exports = React.createClass({displayName: "exports",
    componentWillMount: function () {
        // 组件插入真实DOM 前调用
    },
    componentDidMount: function () {
        // 组件插入真实DOM 后调用
    },
    componentWillUpdate(nextProps, nextState){
        // 组件重新渲染 前调用
    },
    componentDidUpdate(prevProps, prevState){
        // 组件重新渲染 后调用
    },
    componentWillUnmount: function () {
        // 组件移除真实DOM 前调用
    },
    render: function () {
        return (
            React.createElement("div", null, 
                "Hello ", this.props.name
            )
        );
    }
});
},{}],2:[function(require,module,exports){
/********************** 渲染 *********************************/
var names = ['Jack', 'Tom', 'Alice'];
// React.render的第一个参数是JSX 和 组件的render方法里return JSX
// JSX里可以包含组件标签，JSX只能有一个顶级元素
React.render(
    React.createElement("div", null, 
        
            names.map(function (name) {
                return React.createElement("div", null, "Hello,", name, "!")
            })
        
    )
    ,
    $('#render').get(0)
);

/********************** 组件的定义与使用 *********************************/
// 组件定义，组件名大写
var Greet = React.createClass({displayName: "Greet",
        render: function () {
            // return 后面的括号不能换行
            return (
                // JSX 中 class 要写成 className，style=''要写成style={{}}
                React.createElement("h1", {className: "greet", style: {color:'red'}}, 
                    /* 组件中用 this.props获取参数 */
                    "Hello ", this.props.name, 
                    React.createElement("li", null, 
                        
                            // 组件中用 this.props.children 获取子元素
                            this.props.children.map(function (child) {
                                return React.createElement("li", null, child);
                            })
                        
                    )
                )
            )
        },
        // 构造默认参数
        getDefaultProps: function () {
            return {
                name: 'Hello World'
            };
        }
    }
);

// 使用组件，传入参数和子元素
React.render(
    React.createElement(Greet, {name: "jack"}, 
        React.createElement("span", null, "hello"), 
        React.createElement("span", null, "world")
    ),
    $('#greet').get(0)
);

/********************** 事件绑定与值单向绑定 *********************************/
var Input = React.createClass({displayName: "Input",
    // 初始化 state
    getInitialState: function () {
        return {
            enable: false,
            name:'按钮'
        };
    },
    // 更新 state
    handleClick: function (event) {
        console.log();
        this.setState({
            enable: !this.state.enable,
            name:this.refs.nameInput.getDOMNode().value //通过 ref 获得指定元素，通过 getDOMNode() 获取真实DOM
        });
        this.props.callback('成功');
    },
    change:function(content){
        this.setState({
            name:content
        });
    },
    // 值绑定 只能绑定在 state 上
    render: function () {
        return (
            React.createElement("p", null, 
                React.createElement("input", {type: "text", disabled: this.state.enable, ref: "nameInput"}), 
                React.createElement("button", {onClick: this.handleClick}, "变成", this.state.name)
            )
        );
    }
});
var SuperInput = React.createClass({displayName: "SuperInput",
    render: function () {
        return (
            React.createElement("p", null, 
                React.createElement("button", {onClick: this.handleClick}, "改变子组件状态,回调", this.state.cbValue), 
                React.createElement(Input, {ref: "input", callback: this.cb}), "  "/* 组件嵌套 */
            )
        );
    },
    getInitialState: function () {
        return {

        };
    },
    handleClick: function (event) {
        this.refs.input.change('变了');   {/* 改变子组件状态 */}
    },
    cb: function(cbValue){
        this.setState({
            cbValue:cbValue
        });
    }
});
React.render(
    React.createElement(SuperInput, null),
    $('#input').get(0)
);
/********************** 组件生命周期 *********************************/
// 引用CommonJS模块，用 browserify 打包
var Lifecycle = require("./browserify");

React.render(
    React.createElement(Lifecycle, {name: "lifeCycle"}),
    $('#lifeCycle').get(0)
);
},{"./browserify":1}]},{},[2]);
