import React ,{Component} from 'react';
import './Allselect.css';

class Allselect extends Component {

    state = {
        data :  [
            {
                id: 0,
                title: "残酷月光 - 费启鸣",
                checked: true,
                collect: true
            }, {
                id: 1,
                title: "兄弟 - 艾热",
                checked: false,
                collect: false
            }, {
                id: 2,
                title: "毕生 - 夏增祥",
                checked: false,
                collect: true
            }, {
                id: 3,
                title: "公子向北去 - 李春花",
                checked: false,
                collect: false
            }, {
                id: 4,
                title: "战场 - 沙漠五子",
                checked: false,
                collect: false
            }
        ],
        selectState:false
    }
    constructor(props) {
       super(props);

    }
    render() {
        let listData = this.state.data;
       return (
        <section id="wrap">
            <h2 className="title">百度音乐榜单</h2>
            <ul id="list">
                
                {
                   
                    listData.map((item,index)=>{
                       return (
                            <li key={index} >
                                <input 
                                  type="checkbox" 
                                  key = {index}
                                  checked = {item.checked?'checked':''}
                                  onChange={this.checkChange.bind(this,index)}
                                />
                                <span>{item.title}</span>
                                {
                                  item.collect ? <a href="javascript:;" 
                                  className="collect"
                                   onClick ={ this.collectFn.bind(this,index) }
                                  >收藏</a>
                                  : <a href="javascript:;" 
                                   className="cancelCollect"
                                   onClick ={ this.cancelCollectFn.bind(this,index)}
                                  >取消收藏</a>
                                }
                                <a href="javascript:;" 
                                className="remove"
                                onClick = { this.removeSign.bind(this,index)}
                               
                                >删除</a>
                             </li>
                          );
                    })
                
                }
            </ul>
            <footer className="footer">
                <label><input type="checkbox" id="checkAll" 
                 onChange={ this.allSelect.bind(this) }
                 checked = { this.state.selectState && this.state.data.length>0? 'checked' :''}
                />全选/全不选</label>
                <a href="javascript:;" id="remove"
                   onClick = {this.removAll.bind(this)}
                >删除</a>
                <input type="text" id="newInfo" />
                <a href="javascript:;" id="add"
                   onClick = {this.addFn.bind(this)}
                >添加</a>
            </footer>
         </section>
       )
    }

    isCheck( data ) { //判断是否全部选中
        let checkAll = data.every(item=>item.checked);
        return checkAll;
    }
    checkChange(index,e) {
        let {data,selectState }= this.state;
        data[index].checked = e.target.checked;
        selectState = this.isCheck( data );
        this.setState({
            data,
            selectState
        });
    }
    collectFn (num){
        let listData = this.state.data;
        listData[num].collect = false;
        this.setState({
            data:listData
        });
    }
    cancelCollectFn(num) {
        let listData = this.state.data;
        listData[num].collect = true;
        this.setState({
            data:listData
        });
    }
    removeSign(num) {
        let listData = this.state.data;
        listData[num].checked && listData.splice(num,1);
        this.setState({
            data:listData
        });
    }
    removAll(e) {
        let { data,selectState} = this.state;
        data = data.filter( item => !item.checked );
        selectState = this.isCheck(data);
        if( !selectState ) {
            alert('请勾选要删除的项目');
            return;
        }
        this.setState({
            data,
            selectState
        })
    }
    allSelect(e){
        let listData = this.state.data;
        listData.forEach(item => {
            item.checked = e.target.checked;
        });
        this.setState({
            data:listData,
            selectState : e.target.checked
        });
    }
    addFn(e){
        let listData = this.state.data;
        let Id = 5;
        let txt = document.querySelector('#newInfo');
        if( txt.value.trim() == '') {
            alert('请输入点内容');
            return;
        }
        listData.push({
            id: Id,
            title: txt.value,
            checked: false,
            collect: false
        })
        this.setState({
            data:listData
        });
        Id ++;
    }
    
 }

 export default  Allselect;

    