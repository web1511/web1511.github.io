import React from 'react';
import { HashRouter  as Router, Route, Switch } from "react-router-dom";
import './App.css';

import { Layout, Menu, Icon, Dropdown } from 'antd';
import SlideLeft from './components/SlideLeft.jsx';
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
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  componentWillMount() {
    
  }
 
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
                  <Route path="." component={Allselect}></Route>
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
