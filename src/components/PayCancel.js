import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

function PayCancel() {
  return <Container>결제 취소</Container>;
}

export default PayCancel;
