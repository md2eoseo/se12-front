import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Header({ location, history }) {
  return (
    <header className="header">
      <strong>메인</strong>
      <ul>
        <li>
          <Link to="/main">
            <img
              class="homelogo"
              src="https://s3.ap-northeast-2.amazonaws.com/media.linkareer.com/activity_manager/logo/2020-01-171353507994430_%EA%B5%90%EB%B3%B4%EB%AC%B8%EA%B3%A0_%EB%A1%9C%EA%B3%A0.png"
            />
          </Link>
        </li>
        <ul className ="link">
          <li>
            <Link to="/login">로그인</Link>
            <Link to ="/Sign">회원가입</Link>
          </li>
        </ul>

      </ul>
    </header>
  );
}

export default Header;
