import React, { Component } from 'react'

const dataList = [
     {
        user:'小白',
        text:'第一个评论啦'
     },
     {
        user:'小黑',
        text:'第二个评论啦'
     }

];

var s = {
    fontSize :14,
    color: 'red'
}

function CreateList( props ) {//子组件
    console.log(props)
     return (
         <div>
            <h1 style={s}>评论人：{props.user}</h1>
            <p style={{...s}}>评论内容：{props.text}</p>
         </div>
     );
}

class Commet extends Component {
    state = {
        list : [...dataList]
    }
    render(){
        let cData = this.state.list;
        return (
            cData.map( (item,i) => {
                return (
                   <CreateList {...item} key={i}></CreateList> 
                )
            })
           
        )
    }
}

export default Commet