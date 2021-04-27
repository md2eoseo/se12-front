import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import { logUserIn } from '../client';

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
  height: 700px;
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
  mutation createAccount($userId: String!, $password: String!, $email: String!, $name: String!, $address: String) {
    createAccount(userId: $userId, password: $password, email: $email, name: $name, address: $address) {
      ok
      error
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($userId: String!, $password: String!) {
    login(userId: $userId, password: $password) {
      ok
      error
      token
    }
  }
`;

const schema = yup.object().shape({
  userId: yup.string().required('아이디를 입력해주세요.'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .matches(/^(?=.*[A-z])(?=.*[0-9])(?=.{8,16})/, '영문, 숫자를 포함한 8~16자리를 입력해주세요.'),
  email: yup.string().email('유효한 이메일 형식을 입력해주세요.').required('이메일을 입력해주세요.'),
  name: yup.string().required('이름을 입력해주세요.'),
  address: yup.string(),
});

function SignUp() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ userId, password, email, name, address }) => {
    if (createAccountLoading) {
      return;
    }
    createAccount({ variables: { userId, password, email, name, address } });
  };

  const onSignUpCompleted = data => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError('result', {
        message: error,
      });
    }
    const { userId, password } = getValues();
    login({ variables: { userId, password } });
  };

  const onLoginCompleted = data => {
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

  const [createAccount, { loading: createAccountLoading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted: onSignUpCompleted,
  });

  const [login, { loading: loginLoading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: onLoginCompleted,
  });

  return (
    <Wrapper>
      <Container>
        <Title>회원가입</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.result?.message && <Message>{errors.result?.message}</Message>}
          <label>
            <Text>아이디</Text>
            <Input type="text" placeholder="아이디를 입력하세요" {...register('userId')} />
            {errors.userId?.message && <Message>{errors.userId?.message}</Message>}
          </label>
          <label>
            <Text>비밀번호</Text>
            <Input placeholder="영문, 숫자를 포함한 8~16자리" type="password" {...register('password')} />
            {errors.password?.message && <Message>{errors.password?.message}</Message>}
          </label>
          <label>
            <Text>이메일</Text>
            <Input type="text" placeholder="이메일을 입력하세요" {...register('email')} />
            {errors.email?.message && <Message>{errors.email?.message}</Message>}
          </label>
          <label>
            <Text>이름</Text>
            <Input type="text" placeholder="이름을 입력하세요" {...register('name')} />
            {errors.name?.message && <Message>{errors.name?.message}</Message>}
          </label>
          <label>
            <Text>주소(선택)</Text>
            <Input type="text" placeholder="주소를 입력하세요" {...register('address')} />
            {errors.address?.message && <Message>{errors.address?.message}</Message>}
          </label>
          <Button className="submitBtn" type="submit" disabled={createAccountLoading || loginLoading}>
            {loginLoading ? '자동 로그인 중...' : createAccountLoading ? '회원가입 중...' : '회원가입'}
          </Button>
        </form>
      </Container>
    </Wrapper>
  );
}

export default SignUp;
