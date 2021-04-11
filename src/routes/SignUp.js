import React from 'react';
import './css/SignUp.css';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      birthday: '',
      phone: '',
      emailChecked: false,
      pwChecked: false,
      btnColor: '#4374D9',
    };
  }

  onSubmit = e => {
    e.preDefault();
    console.log('사용자 Email :', this.state.email);
    console.log('사용자 Password :', this.state.password);
  };

  pwInputCheck = e => {
    this.setState({ userPW: e.target.value });
    if (e.target.value.length >= 5) {
      this.setState({ userName: e.target.value, pwChecked: true }, () => this.btnChangeColor());
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

  onlyNumber = e => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  render() {
    return (
      <div className="SignUp">
        <div className="title">회원가입</div>
        <div className="form">
          <label>
            <h3>생년월일</h3>
            <input id="birth" className="year" type="text" placeholder=" 년(4자)" maxLength="4" onkeyup="onlyNumber(e)" />
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
            <input className="date" type="text" placeholder=" 일" maxLength="2" onkeyup="onlyNumber(e)" />
          </label>
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
          <label>
            <h3>이메일</h3>
            <input className="email" type="text" placeholder="선택입력" />
          </label>
          <label>
            <h3>휴대전화</h3>
            <input className="phone" type="text" placeholder="전화번호 입력" />
          </label>
          <br></br>
          <button className="submitBtn" type="submit">
            회원가입
          </button>
        </div>
      </div>
    );
  }
}

export default SignUp;
