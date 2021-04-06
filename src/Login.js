import React from "react";
import {withRouter, Redirect} from "react-router-dom";
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: "",
      userPW: "",
      idChecked: false,
      pwChecked: false,
      btnColor: "#86E57F",
    };
  }

  goToMain = () => {
    console.log(this.props);
    <h1>Success!</h1>;
  };

  idInputCheck = (event) => {
    this.setState({ userName: event.target.value });
    if (event.target.value.includes("@")) {
      this.setState({ idChecked: true }, () => this.btnChangeColor());
    } else {
      this.setState({ idChecked: false }, () => this.btnChangeColor());
    }
  };

  pwInputCheck = (event) => {
    this.setState({ userPW: event.target.value });
    if (event.target.value.length >= 5) {
      this.setState({ userName: event.target.value, pwChecked: true }, () =>
        this.btnChangeColor()
      );
    } else {
      this.setState({ pwChecked: false }, () => this.btnChangeColor());
    }
  };
  btnChangeColor = () => {
    if(this.state.idChecked && this.state.pwChecked){
      this.setState({btnColor: "#86E57F"});
    }
    else{
      this.setState({btnColor: "#FF5A5A"});
    }
  };
  
  btnClick = () => {
    console.log("사용자 ID :", this.state.userName);
    console.log("사용자 Password :", this.state.userPW);
    this.goToMain();
  };
  
  render(){
    return(
      <div className="Login">
        <div className="login-form">
          <img class = "logo" src= "http://image.kyobobook.co.kr/ink/images/kyobobook_meta.png"alt="Logo"/>
          <br></br>
          <input 
            className="userId"
            type="text"
            placeholder=" 아이디 (이메일 형식)"
            onChange={this.idInputCheck}
          />
          <br></br>
          <input 
            className="userPw"
            type="password"
            placeholder=" 비밀번호 (5자 이상)"
            onChange={this.pwInputCheck}
          />
          <br></br>
          <button
            className="loginBtn"
            type="button"
            style={{backgroundColor: this.state.btnColor}}
            onClick={this.btnClick}
          >
            로그인
          </button>
        </div>
      </div>
    );
  }
}

export default Login;