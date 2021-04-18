import { gql, useMutation } from '@apollo/client';
import { logUserIn } from '../client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  margin: 0 2px;
  padding: 0 5px;
  width: 200px;
  height: 30px;
`;

const SubmitBtn = styled.button`
  width: 64px;
  height: 60px;
  color: white;
  background-color: cornflowerblue;
  font-size: 100%;
  cursor: pointer;
  outline: none;
  border: none;
`;

const Errors = styled.div`
  position: absolute;
  top: 100%;
  align-self: flex-start;
  margin-left: 10px;
  margin-top: 4px;
`;

const Error = styled.div`
  margin: 2px 0;
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

  const onSubmit = ({ userId, password }) => {
    if (loading) {
      return;
    }
    login({ variables: { userId, password } });
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
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Inputs>
          <Input type="text" placeholder="아이디" {...register('userId')} />
          <Input type="password" placeholder="비밀번호" {...register('password')} />
        </Inputs>
        <SubmitBtn type="submit" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </SubmitBtn>
        <Link to="/signup">회원가입</Link>
      </Form>
      <Errors>
        {errors.userId?.message && <Error>{errors.userId?.message}</Error>}
        {errors.password?.message && <Error>{errors.password?.message}</Error>}
        {errors.result?.message && <Error>{errors.result?.message}</Error>}
      </Errors>
    </Container>
  );
}

export default Login;
