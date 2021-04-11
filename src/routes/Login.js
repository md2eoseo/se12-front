import { useState } from 'react';
import './css/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    console.log('사용자 Email :', email);
    console.log('사용자 Password :', password);
  };

  const onEmailChange = e => {
    setEmail(e.target.value);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  return (
    <div className="Login">
      <div className="title">로그인</div>
      <form className="form" onSubmit={onSubmit}>
        <input className="email" type="text" placeholder="이메일" onChange={onEmailChange} />
        <input className="password" type="password" placeholder="비밀번호 (5자 이상)" onChange={onPasswordChange} />
        <button className="submitBtn" type="submit">
          로그인
        </button>
      </form>
    </div>
  );
}

export default Login;
