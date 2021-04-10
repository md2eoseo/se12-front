import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

function Header({ location, history }) {
  return (
    <div className="Header">
      <div className="leftMenu"></div>
      <div className="logo">
        <Link to="/main">
          <img
            className="logoImg"
            alt="logoImg"
            src="https://s3.ap-northeast-2.amazonaws.com/media.linkareer.com/activity_manager/logo/2020-01-171353507994430_%EA%B5%90%EB%B3%B4%EB%AC%B8%EA%B3%A0_%EB%A1%9C%EA%B3%A0.png"
          />
        </Link>
      </div>
      <div className="rightMenu">
        <Link className="default-link" to="/login">
          로그인
        </Link>
        |
        <Link className="default-link" to="/signup">
          회원가입
        </Link>
        |
        <Link className="default-link" to="/bag">
          장바구니
        </Link>
      </div>
    </div>
  );
}

export default Header;
