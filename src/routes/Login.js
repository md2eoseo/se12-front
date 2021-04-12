import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      idChecked: false,
      pwChecked: false,
      btnColor: '#4374D9',
    };
  }

  onSubmit = e => {
    e.preventDefault();
    console.log('사용자 Email :', this.state.email);
    console.log('사용자 Password :', this.state.password);
  };

  emailInputCheck = e => {
    this.setState({ email: e.target.value });
    if (e.target.value.includes('@')) {
      this.setState({ idChecked: true }, () => this.btnChangeColor());
    } else {
      this.setState({ idChecked: false }, () => this.btnChangeColor());
    }
  };

  pwInputCheck = e => {
    this.setState({ password: e.target.value });
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

  render() {
    return (
      <div className="Login">
        <div className="title">로그인</div>
        <form className="form" onSubmit={this.onSubmit}>
          <input className="email" type="text" placeholder="이메일" onChange={this.emailInputCheck} />
          <input className="password" type="password" placeholder="비밀번호 (5자 이상)" onChange={this.pwInputCheck} />
          <button
            className="submitBtn"
            type="submit"
            disabled={!this.state.idChecked || !this.state.pwChecked}
            style={{ backgroundColor: this.state.btnColor }}
          >
            로그인
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
