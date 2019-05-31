import React, { Component } from 'react'
import {  Link } from "react-router-dom";
import {  Menu, Icon } from 'antd';
import   {getQueryObject} from '../util/common.js';



/** <SubMenu
    key="sub1"
    title={
        <div>
            <Icon type="user" />
            <span className="menuL"> Es6的学习</span>
        </div>
    }
>
    <Menu.Item key="allselect">
        <Link to="/allselect">
            <span>百度全选</span>
        </Link>
    </Menu.Item>
    <Menu.Item key="Staff">
        <Link to="/Staff">
            <span>员工列表</span>
        </Link>
    </Menu.Item>
</SubMenu> **/
const { SubMenu } = Menu;
const listData = [
    {
        title: 'E6的学习',
        tKey: 'sub1' ,
        url: [
                {
                    type: 'allselect?tKey=sub1',
                    t: '百度全选'
                },
                {
                    type: 'Staff?tKey=sub1',
                    t: '员工列表'
                }
        ]
    },
    {
        title: 'DOM的学习',
        tKey: 'sub2' ,
        url: [
                {
                    type: 'allselect2?tKey=sub2',
                    t: '百度全选'

                },
                {
                    type: 'Staff2?tKey=sub2',
                    t: '员工列表'
                }
        ]
    }
];
let rootSub=null;
rootSub = listData.map(item => {
    return item.tKey;
});

let firstOpen = getQueryObject(window.location.href).tKey;

class SlideLeft extends Component {
    rootSubmenuKeys = [...rootSub];
    state = {
        list : listData,
        path: window.location.hash.split('/')[1],
        openKeys: [firstOpen ? firstOpen :'sub1']
    }

    componentWillMount(){
        this.activeSlide();
    }
    render() {
        let list = this.state.list;
        console.log( 'render',this.state)
        return (
            <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={[ this.state.path ]}
                defaultOpenKeys={this.state.openKeys}
                style={{ height: '100%', borderRight: 0 }}
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}

              >
              {
                  list.map( (item) => {
                   return ( <SubMenu
                            key= {item.tKey}
                            title = {
                                <div>
                                    <Icon type="user" />
                                    <span className="menuL"> Es6的学习</span>
                                </div>
                           }
                          >
                                {
                                    item.url.map((ele) =>{
                                        return (
                                            <Menu.Item key={ele.type}>
                                                <Link to={'/' + ele.type }>
                                                    <span>{ele.t}</span>
                                                </Link>
                                          </Menu.Item>
                                        )
                                    })
                                }
                        </SubMenu> )
                  })
              }
           </Menu>   
        )
    }

    activeSlide = () => {
        let pRoute = window.location.hash.split('/')[1];
        if( !pRoute ) {
            this.setState({
                path :'allselect'
            })
        }else{
            this.setState({
                path :pRoute
            }) 
        }
    }
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find( key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
    };
}

export default SlideLeft