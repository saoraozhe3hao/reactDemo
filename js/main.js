/********************** 渲染 *********************************/
var names = ['Jack', 'Tom', 'Alice'];
// React.render的第一个参数是JSX 和 组件的render方法里return JSX
// JSX里可以包含组件标签，JSX只能有一个顶级元素
ReactDOM.render(
    React.createElement("div", null, 
        
            names.map(function (name,index) {
                return React.createElement("div", {key: index}, "Hello,", name, "!")
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
                    React.createElement("ul", null, 
                        
                            // 组件中用 this.props.children 获取子元素
                            this.props.children.map(function (child,index) {
                                return React.createElement("li", {key: index}, child);
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

// 无状态组件,即没有state
function Button(prop){
    return (
        React.createElement("button", null, prop.text)
    )
}
// 使用组件，传入参数和子元素
ReactDOM.render(
    React.createElement(Greet, {name: "jack"}, 
        React.createElement("span", null, "hello"), 
        React.createElement("span", null, "world"), 
        React.createElement(Button, {text: "按钮"})
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
        event.preventDefault();
        console.log(event);
        this.setState({
            enable: !this.state.enable,
            name: ReactDOM.findDOMNode(this.refs.nameInput).value //通过 ref 获得指定组件或元素，通过 getDOMNode() 获取真实DOM
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
            React.createElement("span", null, 
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
                /* 给事件处理函数传递参数 */
                React.createElement("button", {onClick: this.handleClick.bind(this,'变了')}, "改变子组件状态,回调", this.state.cbValue), 
                React.createElement(Input, {ref: "input", callback: this.cb}), "  "/* 组件嵌套，将方法传递给子组件，让其回调 */
            )
        );
    },
    getInitialState: function () {
        return {

        };
    },
    handleClick: function (attr) {
        this.refs.input.change(attr);   {/* 改变子组件状态 */}
    },
    cb: function(cbValue){
        this.setState({
            cbValue:cbValue
        });
    }
});
ReactDOM.render(
    React.createElement(SuperInput, null),
    $('#input').get(0)
);
/********************** 组件生命周期 *********************************/
// 引用CommonJS模块，用 browserify 打包
var Lifecycle = require("./browserify");

ReactDOM.render(
    React.createElement(Lifecycle, {name: "lifeCycle"}),
    $('#lifeCycle').get(0)
);