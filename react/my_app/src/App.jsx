import React from 'react';
import { HashRouter  as Router, Route, Link, Switch } from "react-router-dom";
//import './css/reset.css';
import './App.css';

import { Layout, Menu, Icon, Dropdown } from 'antd';
import Allselect from './components/Allselect.jsx';
import Staff from './components/Staff.jsx';
// import CardManage from './component/CardManage.jsx';
// import Swarehouse from './component/Swarehouse.jsx';
// import Scardout from './component/Scardout.jsx';
// import Recharge from './component/Recharge.jsx';
// import RechargeRecord from './component/RechargeRecord.jsx';
// import PushRecord from './component/PushRecord.jsx';
// import Setmeal from './component/Setmeal.jsx';
// import WarnPush from './component/WarnPush.jsx';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const logout = (
  <Menu>
    <Menu.Item>
      <a rel="noopener noreferrer" href="http://baidu.com">
        退出
      </a>
    </Menu.Item>
  </Menu>
);

class App extends React.Component {
  rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
  state = {
    collapsed: false,
    path: window.location.hash.split('/')[1],
    openKeys: ['sub1']
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  componentWillMount() {
    
  }
  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
  render() {
    return (
      <Router>
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
              <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={[ this.state.path ? this.state.path : 'allselect']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}

              >
                <SubMenu
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
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <div>
                      <Icon type="user" />
                      <span className="menuL"> DOM的学习</span>
                    </div>
                  }
                >
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={
                    <div>
                      <Icon type="user" />
                      <span className="menuL"> DOM的学习</span>
                    </div>
                  }
                >
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
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
                  <Route path="/*.*" component={Allselect}></Route>
                  <Route path="/allselect" component={Allselect}></Route>
                  <Route path="/Staff" component={Staff}></Route>
                  {/* <Route path="/Flow" component={Flow}></Route>
                  <Route path="/CardManage" component={CardManage}></Route>
                  <Route path="/Swarehouse" component={Swarehouse}></Route>
                  <Route path="/Scardout" component={Scardout}></Route>
                  <Route path="/Recharge" component={Recharge}></Route>
                  <Route path="/RechargeRecord" component={RechargeRecord}></Route>
                  <Route path="/PushRecord" component={PushRecord}></Route>
                  <Route path="/Setmeal" component={Setmeal}></Route>
                  <Route path="/WarnPush" component={WarnPush}></Route> */}
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Router>

    )
  }
}

export default App;
