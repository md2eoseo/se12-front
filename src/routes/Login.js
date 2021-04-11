import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import './css/Login.css';
import { logUserIn } from '../client';

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    console.log('사용자 Email :', email);
    console.log('사용자 Password :', password);
    if (loading) {
      return;
    }
    login({ variables: { email, password } });
  };

  const onCompleted = data => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      // TODO: 로그인 에러 처리
      console.log(error);
    }
    if (token) {
      logUserIn(token);
    }
  };

  const onEmailChange = e => {
    setEmail(e.target.value);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

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
