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

const ItemImg = styled.div`
  ${props =>
    props.src &&
    css`
      background-image: url(${props.src});
    `}
  height: 180px;
  width: 132px;
  margin-bottom: 8px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const ItemName = styled.p``;

const ItemPrice = styled.p``;

function Item({ itemId, imgUrl, name, price }) {
  return (
    // TODO: "/item" 뒤에 itemId 추가
    <Link to="/item">
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
