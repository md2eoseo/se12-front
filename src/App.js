import React, { Component } from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import MainPage from './Home';
import Login from './Login';
import Sign from './Sign';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

import Home from './routes/Home';
import Login from './routes/Login';
import SignUp from './routes/SignUp';


class App extends Component {
  render() {
    return (
      <Router>

        <Switch>
          <Route path="/Login" component={Login} />
          <Route path="/sign" component ={Sign}/>
          <Route path="/main" exact component={MainPage} />

        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={SignUp} />

          <Route
            render={() => (
              <div className="error">
                잘못된 접근입니다.

                <Link to="/main">홈으로 돌아가기</Link>
                <Link to="/">홈으로 돌아가기</Link>
              </div>
            )}
          />
        </Switch>

        <Footer />
      </Router>
    );
  }
}

export default App;
