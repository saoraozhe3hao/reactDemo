/********************** 渲染 *********************************/
var names = ['Jack', 'Tom', 'Alice'];
// React.render的第一个参数是JSX 和 组件的render方法里return JSX
// JSX里可以包含组件标签，JSX只能有一个顶级元素
ReactDOM.render(
    <div>
        {
            names.map(function (name, index) {
                return <div key={index}>Hello,{name}!</div>
            })
        }
    </div>
    ,
    $('#render').get(0)
);

/********************** 组件的定义与使用 *********************************/
// 组件定义，组件名大写
var Greet = React.createClass({
        render: function () {
            // return 后面的括号不能换行
            return (
                // JSX 中 class 要写成 className，style=''要写成style={{}}
                <h1 className='greet' style={{color:'red'}}>
                    {/* 组件中用 this.props获取参数 */}
                    Hello {this.props.name}
                    <ul>
                        {
                            // 组件中用 this.props.children 获取子元素，也可以用 React.Children.map、forEach、toArray、count 来处理 children
                            this.props.children.map(function (child, index) {
                                return <li key={index}>{child}</li>;
                            })
                        }
                    </ul>
                </h1>
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
function Button(prop) {
    // 以下jsx会被编译成 React.createElement(button,[props],[...children])
    return (
        <button>{prop.text}</button>
    )
}
// 使用组件，传入参数和子元素
ReactDOM.render(
    <Greet name='jack'>
        <span>hello</span>
        <span>world</span>
        <Button text="按钮"></Button>
    </Greet>,
    $('#greet').get(0)
);

/********************** 事件绑定与值单向绑定 *********************************/
var Input = React.createClass({
    // 初始化 state
    getInitialState: function () {
        return {
            enable: false,
            name: '按钮'
        };
    },
    // 更新 state
    handleClick: function (event) {
        event.preventDefault(); // 阻止冒泡
        this.setState({
            enable: !this.state.enable,
            name: ReactDOM.findDOMNode(this.refs.nameInput).value //通过 ref 获得指定组件或元素，通过 findDOMNode() 获取真实DOM
        });
        this.props.callback('成功');
    },
    change: function (content) {
        this.setState({
            name: content
        });
    },
    // 值绑定 只能绑定在 state 上
    render: function () {
        var ele = (
            <span>
                <input type='text' disabled={this.state.enable} ref='nameInput'/>
                <button onClick={this.handleClick}>变成{this.state.name}</button>
            </span>
        );
        // 克隆 react element，React.cloneElement(element, [props],[...children])用于给 react element 添加 props 和 替换 children
        return React.cloneElement(
            ele,
            {
                ref: 'span0',
                className: 'clone',
                title: this.state.name
            }
        );
    }
});
var SuperInput = React.createClass({
    render: function () {
        return (
            <p>
                {/* 给事件处理函数传递参数 */}
                <button onClick={this.handleClick.bind(this,'变了')}>改变子组件状态,回调{this.state.cbValue}</button>
                <Input ref="input" callback={this.cb}/> {/* 组件嵌套，将方法传递给子组件，让其回调 */}
            </p>
        );
    },
    getInitialState: function () {
        return {};
    },
    handleClick: function (attr) {
        this.refs.input.change(attr);
        {/* 改变子组件状态 */
        }
    },
    cb: function (cbValue) {
        this.setState({
            cbValue: cbValue
        });
    }
});
ReactDOM.render(              //ReactDOM.render 挂载， ReactDOM.unmountComponentAtNode(container) 卸载
    <SuperInput/>,
    $('#input').get(0)
);
/********************** 组件生命周期 *********************************/
// 引用CommonJS模块，用 browserify 打包
var Lifecycle = require("./browserify");

ReactDOM.render(
    <Lifecycle name="lifeCycle"/>,
    $('#lifeCycle').get(0)
);