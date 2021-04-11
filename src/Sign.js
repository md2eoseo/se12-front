import React from "react";
import { Route, Link } from "react-router-dom";
import "./sign.css";

class Sign extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      userPW: "",
      userBirthday: "",
      userName: "",
      idChecked: false,
      pwChecked: false,
      repwChecked: false,
      nameChecked: false,
      idbtnColor: "#000000",
      pwbtnColor: "#000000",
      namebtnColor: "#000000",
      repwbtnColor: "#000000",
      bordercolor: "#ff0000",
    };
  }

  goToMain = () => {
    console.log(this.props);
    <h1>Success!</h1>;
  };

  //// ============== 유효성 검사 코드 ======== /////
  idInputCheck = (event) => {
    //이메일 형식
    //아이디 유효성 검사
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    this.setState({ userName: event.target.value });
    if (regExp.test(event.target.value)) {
      this.setState({ idChecked: true }, () => this.IdbtnChangeColor());
    } else {
      this.setState({ idChecked: false }, () => this.IdbtnChangeColor());
    }
  };
  pwInputCheck = (event) => {
    //8~16자 영문 대 소문자, 숫자, 특수문자, 비밀번호 유효성 검사
    this.setState({ userPW: event.target.value });
    const regExp = /^(?=.*[a-zA-Z])(?=.*[\~\․\!\@\#\$\%\^\&\*\(\)\_\-\+\=\[\]\|\\\;\:\\'\"\<\>\,\.\?\/])(?=.*[0-9]).{8,16}$/;
    if (regExp.test(event.target.value)) {
      this.setState({ userPW: event.target.value, pwChecked: true }, () =>
        this.PwbtnChangeColor()
      );
    } else {
      this.setState({ pwChecked: false }, () => this.PwbtnChangeColor());
    }
  };
  RepwInputCheck = () => {
    //입력한 비밀번호와 맞는 지 확인
    //this.setState({ userPW: event.target.value });
    const objPwd = document.getElementById("pwd"); //비밀번호
    const objPwd2 = document.getElementById("pwd2"); //비밀번호확인
    if (objPwd2.value === objPwd.value) {
      this.setState({ repwChecked: true }, () => this.RePwbtnChangeColor());
    } else {
      this.setState({ repwChecked: false }, () => this.RePwbtnChangeColor());
    }
  };

  //한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)
  NameInputCheck = (event) => {
    //한글이랑 영어입력
    this.setState({ userName: event.target.value });
    const nameRegExp = /^[가-힣a-zA-Z]{2,15}$/;
    if (nameRegExp.test(event.target.value)) {
      this.setState({ userName: event.target.value, nameChecked: true }, () =>
        this.NamebtnChangeColor()
      );
    } else {
      this.setState({ nameChecked: false }, () => this.NamebtnChangeColor());
    }
  };
  //// ============== 유효성 검사 코드 ======== /////

  //=========배경색을 바꾸는 코드를 모음===================//
  IdbtnChangeColor = () => {
    //아이디의 배경색을 바꾸는 코드
    if (this.state.idChecked) {
      this.setState({ idbtnColor: "#1500ff" });
    } else {
      this.setState({ idbtnColor: "#ff0000" });
    }
  };
  NamebtnChangeColor = () => {
    //아이디의 배경색을 바꾸는 코드
    if (this.state.nameChecked) {
      this.setState({ namebtnColor: "#1500ff" });
    } else {
      this.setState({ namebtnColor: "#ff0000" });
    }
  };
  PwbtnChangeColor = () => {
    //비밀번호의 배경색을 바꾸는 코드
    if (this.state.pwChecked) {
      this.setState({ pwbtnColor: "#1500ff" });
    } else {
      this.setState({ pwbtnColor: "#ff0000" });
    }
  };

  RePwbtnChangeColor = () => {
    //비밀번호 재확인 코드
    if (this.state.repwChecked) {
      this.setState({ repwbtnColor: "#1500ff" });
    } else {
      this.setState({ repwbtnColor: "#ff0000" });
    }
  };

  btnClick = () => {
    console.log("사용자 ID :", this.state.userName);
    console.log("사용자 Password :", this.state.userPW);
    this.goToMain();
  };

  render() {
    return (
      <div className="Login">
        <div></div>
        <div className="login-form">
          <Link to="/main">
            <img
              class="logo"
              src="http://image.kyobobook.co.kr/ink/images/kyobobook_meta.png"
              alt="Logo"
            />
          </Link>
          <br></br>
          <label>
            <h3>아이디</h3>
            <input
              className="userId"
              type="text"
              style={{ borderColor: this.state.idbtnColor }}
              onChange={this.idInputCheck}
            />
          </label>
          <label>
            <h3>비밀번호</h3>
            <input
              className="userPw"
              type="password"
              id="pwd"
              style={{ borderColor: this.state.pwbtnColor }}
              onChange={this.pwInputCheck}
            />
          </label>
          <label>
            <h3>비밀번호 확인</h3>
            <input
              className="userPw"
              type="password"
              id="pwd2"
              style={{ borderColor: this.state.repwbtnColor }}
              onChange={this.RepwInputCheck}
            />
          </label>
          <label>
            <h3>이름</h3>
            <input
              className="userName"
              type="text"
              id="name"
              style={{ borderColor: this.state.namebtnColor }}
              onChange={this.NameInputCheck}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Sign;
