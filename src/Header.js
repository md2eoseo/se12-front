import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Header({ location, history }) {
  return (
    <div>
      <div className="top">
        <Link className="default-link" to="/login">
          로그인
        </Link>
        |
        <Link className="default-link" to="/sign">
          회원가입
        </Link>
        |
        <Link className="default-link" to="">
          장바구니
        </Link>
      </div>
      <header className="header">
        <strong>메인</strong>
        <ul>
          <li>
            <Link to="/main">
              <img
                className="homelogo"
                src="https://s3.ap-northeast-2.amazonaws.com/media.linkareer.com/activity_manager/logo/2020-01-171353507994430_%EA%B5%90%EB%B3%B4%EB%AC%B8%EA%B3%A0_%EB%A1%9C%EA%B3%A0.png"
              />
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header;
