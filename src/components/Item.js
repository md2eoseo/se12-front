import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: white;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0px 10px;
`;

const ItemImg = styled.img`
  max-height: 180px;
  margin-bottom: 8px;
`;

const ItemName = styled.p``;

const ItemPrice = styled.p``;

function Item({ itemId, imgUrl, name, price }) {
  return (
    // TODO: "/item" 뒤에 itemId 추가
    <Link to={`/item?itemId=${itemId}`}>
      <Button>
        <Container id={`item-${itemId}`}>
          <ItemImg src={imgUrl} />
          <ItemName>{name}</ItemName>
          <ItemPrice>{price}원</ItemPrice>
        </Container>
      </Button>
    </Link>
  );
}

export default Item;
