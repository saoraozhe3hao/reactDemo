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