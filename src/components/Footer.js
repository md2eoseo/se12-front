import styled from 'styled-components';

const Container = styled.div`
  border-top: 1px solid gray;
  justify-content: center;
  text-align: center;
  padding: 30px;
  height: 100px;
`;
const Text = styled.div`
  justify-content: center;
  margin-left: 100px;
  display: inline;
`;
function Footer() {
  return (
    <Container>
      <Text>사업자정보</Text>
      <Text>이용안내</Text>
      <Text>고객지원</Text>
      <Text>이용약관</Text>
      <Text>개인정보처리방침</Text>
    </Container>
  );
}

export default Footer;
