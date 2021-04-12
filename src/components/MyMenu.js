import React from 'react';
import './css/Login.css';
import { useHistory } from 'react-router';
import { logUserOut } from '../client';

function MyMenu() {
  const history = useHistory();

  const logout = () => {
    logUserOut();
    history.push('/');
  };

  return (
    <div className="MyMenu">
      <button className="logoutBtn" onClick={logout}>
        로그아웃
      </button>
    </div>
  );
}

export default MyMenu;
