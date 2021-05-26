import { NoSchemaIntrospectionCustomRule } from 'graphql';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

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

const DELETE_BAGITEM_MUTATION = gql`
  mutation deleteBagItem($id: Int) {
    deleteBagItem(id: $id) {
      ok
      error
    }
  }
`;

function BagItem({ itemId, name, price, quantity, imgUrl }) {
  const onDeleteBtnClick = () => {
    const yes = window.confirm(`'${name}' 를 장바구니에서 삭제하시겠습니까?`);
    if (yes) {
      deleteBagItem({ variables: { id: itemId } });
    }
  };

  const [deleteBagItem] = useMutation(DELETE_BAGITEM_MUTATION);
  return (
    <Container id={`item-${itemId}`}>
      <Bag>
        <ItemImg src={imgUrl[0]} />
        <Name>
          <ItemName>{name}</ItemName>
        </Name>
        <Price>
          <ItemPrice>{price}원</ItemPrice>
        </Price>
        <Quantity>{quantity}</Quantity>
        <Delete onClick={onDeleteBtnClick}>X</Delete>
      </Bag>
    </Container>
  );
}

export default BagItem;
