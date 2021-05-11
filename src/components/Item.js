import styled from 'styled-components';

const Container = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemImg = styled.img`
  max-height: 180px;
  margin-bottom: 8px;
`;

const ItemName = styled.p``;

const ItemPrice = styled.p``;

function Item({ itemId, imgUrl, name, price }) {
  return (
    <Container itemId={itemId}>
      <ItemImg src={imgUrl} />
      <ItemName>{name}</ItemName>
      <ItemPrice>{price}원</ItemPrice>
    </Container>
  );
}

export default Item;
