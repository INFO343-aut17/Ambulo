import React, { Component } from 'react';
import './App.css';

import { HashRouter as Router, Switch, Route} from 'react-router-dom';
import constants from "./Components/constants";

import MainActivity from "./Components/MainActivity";
import LogInActivity from "./Components/LogInActivity";
import SignUpActivity from "./Components/SignUpActivity";
import UserActivity from "./Components/UserActivity";


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path={constants.routes.main} component={MainActivity}/>
            <Route path={constants.routes.logIn} component={LogInActivity}/>
            <Route path={constants.routes.signUp} component={SignUpActivity}/>
            <Route path={constants.routes.user} component={UserActivity}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
