import React, { Component } from 'react'
import {  Link } from "react-router-dom";
import {  Menu, Icon } from 'antd';


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
                    type: 'allselect',
                    t: '百度全选'
                },
                {
                    type: 'Staff',
                    t: '员工列表'
                }
        ]
    },
    {
        title: 'DOM的学习',
        tKey: 'sub2' ,
        url: [
                {
                    type: 'allselect',
                    t: '百度全选'
                },
                {
                    type: 'Staff',
                    t: '员工列表'
                }
        ]
    }
];
let rootSub = [];
listData.forEach(item => {
    rootSub.push(item.tKey)
});

class SlideLeft extends Component {
    rootSubmenuKeys = [...rootSub];
    state = {
        list : listData,
        path: window.location.hash.split('/')[1],
        openKeys: ['sub1']
    }


    render() {
        let list = this.state.list;
        return (
            <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={[ this.state.path ? this.state.path : 'allselect']}
                defaultOpenKeys={['sub1']}
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