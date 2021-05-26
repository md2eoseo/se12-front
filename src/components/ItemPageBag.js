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
  width: 790px;
  padding: 10px 10px 10px 10px;
  border: 1px solid #bdbdbd;
  &:hover {
    background-color: #ebf7ff;
    cursor: pointer;
  }
`;

const Delete = styled.button`
  width: 70px;
  height: 40px;
  color: white;
  background-color: #487be1;
  font-size: 100%;
  cursor: pointer;
  outline: none;
  border: 1px solid #487be1;
  &:hover {
    background-color: cornflowerblue;
  }
`;

const ItemName = styled.span``;

const ItemPrice = styled.span``;
const ItemTotalPrice = styled.span``;

const Name = styled.div`
  width: 250px;
  margin-left: 20px;
`;
const Price = styled.div`
  width: 140px;
  justify-content: left;
`;

const Total = styled.div`
  justify-content: left;
  margin-right: 40px;
  width: 110px;
`;
const Quantity = styled.div`
  border: 1px solid #a6a6a6;
  width: 40px;
  height: 30px;
  text-align: center;
  margin-right: 80px;
`;

const DELETE_BAGITEM_MUTATION = gql`
  mutation deleteBagItem($id: Int!) {
    deleteBagItem(id: $id) {
      ok
      error
    }
  }
`;

function ItemPageBag({ itemId, name, price, quantity }) {
  const onDeleteBtnClick = () => {
    const yes = window.confirm(`'${name}' 를 장바구니에서 삭제하시겠습니까?`);
    if (yes) {
      deleteBagItem({ variables: { id: itemId } });
      window.alert(`'${name}' 상품이 삭제되었습니다.`);
    }
  };

  const deleteBagItemCompleted = () => {
    document.getElementById(`item-${itemId}`).remove();
  };

  const [deleteBagItem, { deleteBagItemLoading }] = useMutation(DELETE_BAGITEM_MUTATION, {
    onCompleted: deleteBagItemCompleted,
  });
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

        <Total>
          <ItemTotalPrice>{price * quantity}원</ItemTotalPrice>
        </Total>
        <Delete onClick={onDeleteBtnClick} disabled={deleteBagItemLoading}>
          삭제
        </Delete>
      </Bag>
    </Container>
  );
}

export default ItemPageBag;
