import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Container = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 10px 10px;
`;

const ItemImg = styled.img`
  ${props =>
    props.src &&
    css`
      background-image: url(${props.src});
    `}
  height: 180px;
  width: 132px;
  max-height: 200px;
  max-width: 140px;
  object-fit: cover;
  margin-bottom: 8px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const ItemName = styled.p``;

const ItemPrice = styled.p``;

function Item({ itemId, imgUrl, name, price }) {
  const history = useHistory();
  return (
    <Container id={`item-${itemId}`} onClick={() => history.push(`/item?itemId=${itemId}`)}>
      <ItemImg src={imgUrl[0]} />
      <ItemName>{name}</ItemName>
      <ItemPrice>{price}원</ItemPrice>
    </Container>
  );
}

export default Item;
