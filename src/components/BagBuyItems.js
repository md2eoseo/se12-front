import styled from 'styled-components';
import BagBuyItem from './BagBuyItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Table = styled.div`
  display: flex;
  align-items: center;
  width: 900px;
  padding: 10px 10px 10px 20px;
  font-weight: bold;
  color: #4c4c4c;
  background-color: #e7e7e7;
  border: 1px solid #bdbdbd;
`;

const Label = styled.span``;
const Name = styled.div`
  width: 300px;
  margin-left: 100px;
`;
const Price = styled.div`
  width: 155px;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 27px;
  letter-spacing: 3px;
  font-weight: bold;
  color: #696969;
  margin-bottom: 20px;
  margin-left: 2px;
`;
const Quantity = styled.div`
  margin-right: 55px;
  width: 60px;
`;

const Total = styled.div``;

function BagBuyItems({ bagItems, seeBagRefetch }) {
  return (
    <Container>
      <Title>주문/결제</Title>
      <Table>
        <Name>
          <Label>상품명</Label>
        </Name>
        <Price>
          <Label>판매가</Label>
        </Price>
        <Quantity>
          <Label>수량</Label>
        </Quantity>
        <Total>
          <Label>합계</Label>
        </Total>
      </Table>
      {bagItems.map(bagItem => (
        <BagBuyItem
          key={bagItem.id}
          imgUrl={bagItem.item.imgUrl}
          bagItemId={bagItem.id}
          name={bagItem.item.name}
          price={bagItem.item.price}
          quantity={bagItem.quantity}
          stock={bagItem.item.stock}
          seeBagRefetch={seeBagRefetch}
        />
      ))}
    </Container>
  );
}

export default BagBuyItems;
