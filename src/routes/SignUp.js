import React from 'react';
import { gql, useMutation } from '@apollo/client';
import './css/SignUp.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($name: String!, $email: String!, $password: String!, $address: String) {
    createAccount(name: $name, email: $email, password: $password, address: $address) {
      ok
      error
    }
  }
`;

const schema = yup.object().shape({
  name: yup.string().required('이름을 입력해주세요.'),
  email: yup.string().email('유효한 이메일 형식을 입력해주세요.').required('이메일을 입력해주세요.'),
  password: yup.string().required('비밀번호를 입력해주세요.'),
  address: yup.string(),
});

function SignUp() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ name, email, password, address }) => {
    if (loading) {
      return;
    }
    createAccount({ variables: { name, email, password, address } });
  };

  const onCompleted = data => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError('result', {
        message: error,
      });
    }
    history.push('/login');
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  return (
    <div className="SignUp">
      <h2 className="title">회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className="name" type="text" placeholder="이름" {...register('name')} />
        {errors.name?.message}
        <input className="email" type="text" placeholder="이메일" {...register('email')} />
        {errors.email?.message}
        <input className="password" type="password" placeholder="비밀번호" {...register('password')} />
        {errors.password?.message}
        <input className="address" type="text" placeholder="주소" {...register('address')} />
        <button className="submitBtn" type="submit" disabled={loading}>
          {loading ? '회원가입 중...' : '회원가입'}
        </button>
        {errors.result?.message}
      </form>
    </div>
  );
}

export default SignUp;
