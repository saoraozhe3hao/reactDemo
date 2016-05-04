/********************** 渲染 *********************************/
var names = ['Jack', 'Tom', 'Alice'];
// React.render的第一个参数是JSX 和 组件的render方法里return JSX
// JSX里可以包含组件标签，JSX只能有一个顶级元素
React.render(React.createElement("div", null, names.map(function (name) {
    return React.createElement("div", null, "Hello,", name, "!");
})), $('#render').get(0));

/********************** 组件的定义与使用 *********************************/
// 组件定义，组件名大写
var Greet = React.createClass({ displayName: "Greet",
    render: function () {
        // return 后面的括号不能换行
        return(
            // JSX 中 class 要写成 className，style=''要写成style={{}}
            React.createElement("h1", { className: "greet", style: { color: 'red' } },
            /* 组件中用 this.props获取参数 */
            "Hello ", this.props.name, React.createElement("li", null,

            // 组件中用 this.props.children 获取子元素
            this.props.children.map(function (child) {
                return React.createElement("li", null, child);
            })))
        );
    },
    // 构造默认参数
    getDefaultProps: function () {
        return {
            name: 'Hello World'
        };
    }
});

// 使用组件，传入参数和子元素
React.render(React.createElement(Greet, { name: "jack" }, React.createElement("span", null, "hello"), React.createElement("span", null, "world")), $('#greet').get(0));

/********************** 事件绑定与值单向绑定 *********************************/
var Input = React.createClass({ displayName: "Input",
    // 初始化 state
    getInitialState: function () {
        return {
            enable: false,
            name: '按钮'
        };
    },
    // 更新 state
    handleClick: function (event) {
        console.log();
        this.setState({
            enable: !this.state.enable,
            name: this.refs.nameInput.getDOMNode().value //通过 ref 获得指定元素，通过 getDOMNode() 获取真实DOM
        });
    },
    // 值绑定 只能绑定在 state 上
    render: function () {
        return React.createElement("p", null, React.createElement("input", { type: "text", disabled: this.state.enable, ref: "nameInput" }), React.createElement("button", { onClick: this.handleClick }, "变成", this.state.name));
    }
});
React.render(React.createElement(Input, null), $('#input').get(0));
/********************** 组件生命周期 *********************************/
// 引用CommonJS模块，用 browserify 打包
var Lifecycle = require("./browserify");

React.render(React.createElement(Lifecycle, { name: "lifeCycle" }), $('#lifeCycle').get(0));