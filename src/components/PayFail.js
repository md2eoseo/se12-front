import { Link } from 'react-router-dom';
import styled from 'styled-components';
import payFail from './payfail.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;
const Title = styled.div`
  letter-spacing: 3px;
  font-size: 25px;
`;
const Image = styled.img`
  height: 160px;
  width: 170px;
  margin-bottom: 30px;
`;
const GoHome = styled.button`
  margin-top: 60px;
  width: 175px;
  height: 50px;
  color: white;
  background-color: #747474;
  font-size: 130%;
  cursor: pointer;
  outline: none;
  border: none;
`;
function PayFail() {
  return (
    <Container>
      <Image src={payFail} />
      <Title>결제 취소</Title>
      <Link to="/">
        <GoHome>홈으로 이동</GoHome>
      </Link>
    </Container>
  );
}

export default PayFail;
