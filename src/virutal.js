import React from 'react';
import { Route, Link } from 'react-router-dom';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userPW: '',
      userBirthday : '',
      idChecked: false,
      pwChecked: false,
      btnColor: '#4374D9',
    };
  }

  goToMain = () => {
    console.log(this.props);
    <h1>Success!</h1>;
  };

  idInputCheck = event => {
    this.setState({ userName: event.target.value });
    if (event.target.value.includes('@')) {
      this.setState({ idChecked: true }, () => this.btnChangeColor());
    } else {
      this.setState({ idChecked: false }, () => this.btnChangeColor());
    }
  };

  pwInputCheck = event => {
    this.setState({ userPW: event.target.value });
    if (event.target.value.length >= 5) {
      this.setState({ userName: event.target.value, pwChecked: true }, () => this.btnChangeColor());
    } else {
      this.setState({ pwChecked: false }, () => this.btnChangeColor());
    }
  };
  btnChangeColor = () => {
    if (this.state.idChecked && this.state.pwChecked) {
      this.setState({ btnColor: '#4374D9' });
    } else {
      this.setState({ btnColor: '#FF5A5A' });
    }
  };

  btnClick = () => {
    console.log('사용자 ID :', this.state.userName);
    console.log('사용자 Password :', this.state.userPW);
    this.goToMain();
  };

  render() {
    return (
      <div className="Login">
        <div></div>
        <div className="login-form">
          <Link to="/main">
            <img class="logo" src="http://image.kyobobook.co.kr/ink/images/kyobobook_meta.png" alt="Logo" />
          </Link>
          <br></br>
          <label for ="id">아이디</label>
          <br></br>
          <input id = "id" className="userId" type="text" onChange={this.idInputCheck} />
          <br></br>
          <h4>비밀번호</h4>
          <br></br>
          <input className="userPw" type="password"  onChange={this.pwInputCheck} />
          <br></br>
          <h4>이름</h4>
          <br></br>
          <input className="userName" type="text" onChange={this.idInputCheck} />
          <br></br>
          <h4>생년월일</h4>
          <br></br>
          <input className="userBirthday" type="text" onChange={this.idInputCheck} />
          <br></br>
          <h4>이메일</h4>
          <br></br>
          <input className="userEmail" type="text"  onChange={this.idInputCheck} />
          <br></br>
          <h4>휴대폰 번호</h4>
          <br></br>
          <input className="userPhoneNumber" type="text" onChange={this.idInputCheck} />
          <br></br>
          <button className="loginBtn" type="button" style={{ backgroundColor: this.state.btnColor }} onClick={this.btnClick}>
            회원가입
          </button>

        </div>
      </div>
    );
  }
}

export default Login;
