import React from 'react';
import { Route, Link } from 'react-router-dom';
import './Sign.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userPW: '',
      userBirthday: '',
      userEmail: '',
      userPhone: '',
      emailChecked: false,
      pwChecked: false,
      btnColor: '#4374D9',
    };
  }

  goToMain = () => {
    console.log(this.props);
    <h1>Success!</h1>;
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

  onlyNumber = event => {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  };

  render() {
    return (
      <div className="Sign">
        <div className="sign_logo">
          <Link to="/main">
            <img className="slogo" src="http://image.kyobobook.co.kr/ink/images/kyobobook_meta.png" alt="Logo" />
          </Link>
        </div>
        <br></br>
        <div className="signform">
          <label>
            <h3>생년월일</h3>
            <input id="birth" className="year" type="text" placeholder=" 년(4자)" maxLength="4" onkeyup="onlyNumber(event)" />
          </label>
          <select className="month">
            <option value="" selected disabled hidden>
              월
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <input className="date" type="text" placeholder=" 일" maxLength="2" onkeyup="onlyNumber(event)" />
          <br></br>
          <label>
            <h3>성별</h3>
            <select className="gender">
              <option value="" selected disabled hidden>
                성별
              </option>
              <option value="male">남자</option>
              <option value="female">여자</option>
              <option value="null">선택안함</option>
            </select>
          </label>
          <br></br>
          <label>
            <h3>
              이메일
              <small>(선택)</small>
            </h3>

            <input className="email" type="text" placeholder=" 선택입력" />
          </label>
          <br></br>
          <label>
            <h3>휴대전화</h3>
            <input className="phone" type="text" placeholder=" 전화번호 입력" />
          </label>
          <br></br>
          <button className="signBtn" type="button">
            가입하기
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
