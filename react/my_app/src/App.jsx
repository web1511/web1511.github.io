import React from 'react';
import { HashRouter as Router, Route, Switch,Redirect } from "react-router-dom";
import './App.css';

// import { Layout, Menu, Icon, Dropdown } from 'antd';
// import SlideLeft from './components/SlideLeft.jsx';
// import Allselect from './components/Allselect.jsx';
// import Staff from './components/Staff.jsx';
import Login from './components/Login.jsx';
import Main from './components/Main.jsx';




class App extends React.Component {
  state = {
    
  };

  componentWillMount() {
  }
  render() {
    return (
      <Router>
        <Switch>
            <Route path="/Main" component={Main}
            ></Route>
            <Route path="/Login" component={Login}
            exact
            ></Route>
           <Redirect  to="/Main/staff" />
        </Switch>
      </Router>

    )
  }
}

export default App;
