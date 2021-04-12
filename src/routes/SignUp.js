import React from 'react';
import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  form {
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 480px;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 25px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 400px;
  height: 50px;
  border: solid 1px #b8b8b8;
  margin-bottom: 20px;
  padding: 10px;

  &:focus {
    outline: none;
    border: solid 1px #4374d9;
  }
`;

const Text = styled.div`
  margin-bottom: 10px;
  font-weight: 600;
`;

const Button = styled.button`
  width: 400px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #4374d9;
  margin-bottom: 20px;
  font-weight: 500;
  cursor: pointer;
`;

const Message = styled.div`
  font-size: 13px;
  margin-bottom: 10px;
  margin-top: -10px;
  color: #ff4848;
`;

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
    history.push('/');
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  return (
    <Wrapper>
      <Container>
        <Title>회원가입</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.result?.message && <Message>{errors.result?.message}</Message>}
          <label>
            <Text>이메일</Text>
            <Input type="text" placeholder="이메일을 입력하세요" {...register('email')} />
            {errors.email?.message && <Message>{errors.email?.message}</Message>}
          </label>
          <label>
            <Text>비밀번호</Text>
            <Input placeholder="영문 대소문자, 숫자, 특수문자를 포함한 8~16자리" type="password" {...register('password')} />
            {errors.password?.message && <Message>{errors.password?.message}</Message>}
          </label>
          <label>
            <Text>이름</Text>
            <Input type="text" placeholder="이름을 입력하세요" {...register('name')} />
            {errors.name?.message && <Message>{errors.name?.message}</Message>}
          </label>
          <Button className="submitBtn" type="submit">
            회원가입
          </Button>
        </form>
      </Container>
    </Wrapper>
  );
}

export default SignUp;
