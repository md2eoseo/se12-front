import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';
import Login from './Login';

function Header({ location, history }) {
  return (
    <div className="Header">
      <div className="leftMenu"></div>
      <div className="logo">
        <Link to="/">
          <img
            className="logoImg"
            alt="logoImg"
            src="https://s3.ap-northeast-2.amazonaws.com/media.linkareer.com/activity_manager/logo/2020-01-171353507994430_%EA%B5%90%EB%B3%B4%EB%AC%B8%EA%B3%A0_%EB%A1%9C%EA%B3%A0.png"
          />
        </Link>
      </div>
      <div className="rightMenu">
        <Login />
      </div>
    </div>
  );
}

export default Header;
