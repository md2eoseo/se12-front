import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

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

const ItemName = styled.p``;

const ItemPrice = styled.p``;

function BagItem({ itemId, name, price }) {
  return (
    <Link to={`/item?itemId=${itemId}`}>
      <Button>
        <Container id={`item-${itemId}`}>
          <ItemName>{name}</ItemName>
          <ItemPrice>{price}원</ItemPrice>
        </Container>
      </Button>
    </Link>
  );
}

export default BagItem;
