import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

function PayFail() {
  return <Container>결제 실패</Container>;
}

export default PayFail;
