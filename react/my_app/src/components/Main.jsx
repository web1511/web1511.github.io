import React ,{Component}from 'react';
import { Route, Switch, Link } from "react-router-dom";

import { Layout, Menu, Icon, Dropdown } from 'antd';
import SlideLeft from './SlideLeft.jsx';
import Allselect from './Allselect.jsx';
import Staff from './Staff.jsx';




const { Header, Sider, Content } = Layout;
const logout = (
  <Menu>
    <Menu.Item>
      {/* <a rel="noopener noreferrer" href="http://baidu.com">
        退出
      </a> */}
      <Link to="/Login">
        退出
      </Link>
    </Menu.Item>
  </Menu>
);

class Main extends Component {
    state = {
        collapsed: false
      };
    
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed
        });
      };
    render() {
        return (
            <Layout className="wrap">
                <Header className="header">
                    <div className="logo">
                        <span>React后台管理</span>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </div>
                    <div className="headRight">
                        <Dropdown overlay={logout}>
                            <a className="ant-dropdown-link" href="javascrupt:;">
                                admin <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                </Header>
                <Layout>
                    <Sider
                        width={200}
                        style={{ background: '#fff' }}
                        className="slideLeft"
                        trigger={null} collapsible collapsed={this.state.collapsed}
                    >
                        <SlideLeft></SlideLeft>
                    </Sider>
                    <Layout>
                        <Content
                            style={{
                                padding: 10,
                                background: '#fff',
                                minHeight: 280,
                            }}
                        >
                            <Switch>
                                <Route path="/Main/allselect" component={Allselect}></Route>
                                <Route path="/Main/Staff" component={Staff}></Route>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default Main