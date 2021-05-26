import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Bag = styled.div`
  display: flex;
  align-items: center;
  width: 800px;
  padding: 10px 10px 10px 20px;
  border: 1px solid #bdbdbd;
  &:hover {
    background-color: #ebf7ff;
    cursor: pointer;
  }
`;

const Delete = styled.button`
  width: 24px;
  height: 24px;
  font-size: 120%;
  color: #5d5d5d;
`;

const ItemName = styled.span``;

const ItemPrice = styled.span``;

const Name = styled.div`
  width: 350px;
`;
const Price = styled.div`
  width: 200px;
  justify-content: left;
`;

const Quantity = styled.div`
  border: 1px solid #a6a6a6;
  width: 40px;
  height: 30px;
  text-align: center;
  margin-right: 140px;
`;
function BagItem({ itemId, name, price, quantity }) {
  return (
    <Container id={`item-${itemId}`}>
      <Bag>
        <Name>
          <ItemName>{name}</ItemName>
        </Name>
        <Price>
          <ItemPrice>{price}원</ItemPrice>
        </Price>
        <Quantity>{quantity}</Quantity>
        <Delete>X</Delete>
      </Bag>
    </Container>
  );
}

export default BagItem;
