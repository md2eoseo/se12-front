import styled from 'styled-components';
import BagItems from './BagItems';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 40px;
`;
const TotalPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  margin-left: 600px;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
`;
const Int = styled.span`
  font-size: 33px;
  font-weight: bold;
  color: #4374d9;
  margin-top: -10px;
  padding: 0px 10px 0px 0px;
`;

const Label = styled.span`
  font-size: 25px;
  padding: 0px 10px 0px 0px;
`;

const Won = styled.span`
  font-size: 25px;
`;

const BuyButton = styled.button`
  margin-top: 30px;
  margin-left: 30px;
  width: 200px;
  height: 50px;
  color: white;
  background-color: #487be1;
  font-size: 140%;
  letter-spacing: 2px;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    background-color: cornflowerblue;
  }
`;

function BagPage() {
  return (
    <Container>
      <BagItems />
      <TotalPrice>
        <Contents>
          <Label>총 상품 금액</Label>
          <Int>1000</Int>
          <Won>원</Won>
        </Contents>
        <BuyButton>구매하기</BuyButton>
      </TotalPrice>
    </Container>
  );
}

export default BagPage;
