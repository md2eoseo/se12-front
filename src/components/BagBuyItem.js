import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Bag = styled.div`
  display: flex;
  align-items: center;
  width: 900px;
  padding: 10px 10px 10px 10px;
  border: 1px solid #bdbdbd;
  &:hover {
    background-color: #ebf7ff;
    cursor: pointer;
  }
`;

const ItemName = styled.span``;

const ItemPrice = styled.span``;
const ItemTotalPrice = styled.span``;

const Name = styled.div`
  width: 310px;
`;
const Price = styled.div`
  width: 150px;
  justify-content: left;
`;

const Total = styled.div`
  justify-content: left;
  margin-left: 80px;
  width: 200px;
`;
const Quantity = styled.div`
  border: 1px solid #a6a6a6;
  width: 40px;
  height: 30px;
  text-align: center;
`;

const ItemImg = styled.img`
  ${props =>
    props.src &&
    css`
      background-image: url(${props.src});
    `}
  height: 90px;
  width: 66px;
  max-height: 200px;
  max-width: 140px;
  margin-right: 30px;
  object-fit: cover;
  margin-bottom: 8px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

function BagBuyItem({ bagItemId, name, price, quantity, imgUrl }) {
  return (
    <Container id={`bagItem-${bagItemId}`}>
      <Bag>
        <ItemImg src={imgUrl[0]} />
        <Name>
          <ItemName>{name}</ItemName>
        </Name>
        <Price>
          <ItemPrice>{price}원</ItemPrice>
        </Price>
        <Quantity>{quantity}</Quantity>
        <Total>
          <ItemTotalPrice>{price * quantity}원</ItemTotalPrice>
        </Total>
      </Bag>
    </Container>
  );
}

export default BagBuyItem;
