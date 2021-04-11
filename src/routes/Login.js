import React from 'react';
import { gql, useMutation } from '@apollo/client';
import './css/Login.css';
import { logUserIn } from '../client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router';

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;

const schema = yup.object().shape({
  email: yup.string().email('유효한 이메일 형식을 입력해주세요.').required('이메일을 입력해주세요.'),
  password: yup.string().required('비밀번호를 입력해주세요.'),
});

function Login() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ email, password }) => {
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
      return setError('result', {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
      history.push('/');
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  return (
    <div className="Login">
      <h2 className="title">로그인</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className="email" type="text" placeholder="이메일" {...register('email')} />
        {errors.email?.message}
        <input className="password" type="password" placeholder="비밀번호" {...register('password')} />
        {errors.password?.message}
        <button className="submitBtn" type="submit" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
        {errors.result?.message}
      </form>
    </div>
  );
}

export default Login;
