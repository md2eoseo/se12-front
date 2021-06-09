import { Link } from 'react-router-dom';
import styled from 'styled-components';
import paySuccess from './paysuccess.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;
const Image = styled.img`
  height: 150px;
  width: 170px;
  margin-bottom: 50px;
  margin-left: 30px;
`;
const Title = styled.div`
  letter-spacing: 3px;
  font-size: 30px;
`;
const Text = styled.div`
  margin-top: 20px;
  font-size: 20px;
`;
const GoHome = styled.button`
  margin-top: 60px;
  width: 175px;
  height: 50px;
  color: white;
  background-color: #487be1;
  font-size: 130%;
  cursor: pointer;
  outline: none;
  border: none;
`;
function PaySuccess() {
  return (
    <Container>
      <Image src={paySuccess} />
      <Title>결제 성공</Title>
      <Text>구매해주셔서 감사합니다</Text>
      <Link to="/">
        <GoHome>쇼핑 계속하기</GoHome>
      </Link>
    </Container>
  );
}

export default PaySuccess;
