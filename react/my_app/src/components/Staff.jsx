import React, { Component } from 'react'
import './Staff.css'

let  data = [
    {
        id: 0,
        name: '小明',
        age: 24,
        gender: '男'
    },
    {
        id: 1,
        name: '小芳',
        age: 30,
        gender: '女'
    },
    {
        id: 2,
        name: '小美',
        age: 31,
        gender: '女'
    },
    {
        id: 3,
        name: '小刚',
        age: 21,
        gender: '男'
    },
    {
        id: 4,
        name: '小琪',
        age: 18,
        gender: '女'
    }
];
class Staff extends Component {
  state = {
      list :data
  }
  render(){
    let tbList = this.state.list;
    return (
        <div className="wrapStaff">
            <div className="ctrl">
                <div className="age_sort">
                    <a href="javascript:;" onClick={this.sortFn()[0].bind(this)}>年龄从小到大</a>
                    <a href="javascript:;"
                     onClick={this.sortFn()[1].bind(this)}
                    >年龄从大到小</a>
                    <a href="javascript:;" 
                       onClick={this.sortFn()[2].bind(this)}
                    className="active">默认排序</a>
                </div>
                <div className="gender_show">
                    <a href="javascript:;"
                     onClick = { this.filterFn()[0].bind(this) }
                    >只显示男性</a>
                    <a href="javascript:;"
                      onClick = { this.filterFn()[1].bind(this) }
                    >只显示女性</a>
                    <a href="javascript:;" className="active"
                       onClick = { this.filterFn()[2].bind(this) }
                    >默认</a>
                </div>
            </div>
            <table id="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>性别</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tbList.map( (item,index) => {
                            return (
                                <tr key={index}>
                                    <th>{item.id}</th>
                                    <th>{item.name}</th>
                                    <th>{item.age}</th>
                                    <th>{item.gender}</th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
   )
  }
  
  addEvt() {

  }
  sortFn() {
    let list = this.state.list;
    let that = this;
    let sortArr = [
        () => {
            list.sort((r1,r2)=>{
                return r1.age - r2.age
            });
            that.setState({
                list : list
            });
            return list;
        },
        () => {
            list.sort((r1,r2)=>{
                return r2.age - r1.age
            });
            that.setState({
                list : list
            });
            return list;
            
        },
        () => {
            list.sort((r1,r2)=>{
                return r1.id - r2.id
            });
            that.setState({
                list : list
            });
            return list;
        }
    ];
    return sortArr;
  }

  filterFn() {
      let that =this;
      let filterArr = [
          () => {
             
             let newData = data.filter( item=>item.gender=='男');
             that.setState({
                list : newData
             });
             return newData;
          },
          () => {
           
            let newData = data.filter( item=>item.gender=='女');
            that.setState({
                list : newData
             });
             return newData;
          },
          () => {
          
            let newData = [...data];
            that.setState({
                list : newData
             });
             return newData;
          }
      ];
      return filterArr;
  }

}

export default Staff