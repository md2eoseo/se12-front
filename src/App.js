import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import MainPage from './Home';
import Login from './Login';
import Sign from './Sign';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/Login" component={Login} />
          <Route path="/sign" component ={Sign}/>
          <Route path="/main" exact component={MainPage} />
          <Route
            render={() => (
              <div className="error">
                잘못된 접근입니다.
                <Link to="/main">홈으로 돌아가기</Link>
              </div>
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
