import styled, { css } from 'styled-components';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import gql from 'graphql-tag';
import { client, getUserId } from '../client';
import { GET_USER_QUERY } from './MyMenu';

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

const Delete = styled.button`
  width: 80px;
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
`;
const Price = styled.div`
  width: 120px;
  justify-content: left;
`;

const Total = styled.div`
  justify-content: left;
  margin-right: 40px;
  width: 80px;
`;
const Quantity = styled.div`
  border: 1px solid #a6a6a6;
  width: 40px;
  height: 30px;
  text-align: center;
`;
const Dec = styled.button`
  width: 30px;
  height: 30px;
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
const Inc = styled.button`
  width: 30px;
  height: 30px;
  margin-right: 40px;
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
  margin-right: 30px;
  object-fit: cover;
  margin-bottom: 8px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const DELETE_BAGITEM_MUTATION = gql`
  mutation deleteBagItem($id: Int!) {
    deleteBagItem(id: $id) {
      ok
      error
    }
  }
`;

const UPDATE_BAGITEM_CNT_MUTATION = gql`
  mutation updateBagItemCnt($bagItemId: Int!, $quantity: Int!) {
    updateBagItemCnt(bagItemId: $bagItemId, quantity: $quantity) {
      ok
      error
      quantity
    }
  }
`;

function BagItem({ bagItemId, name, price, quantity, imgUrl, stock, seeBagRefetch }) {
  const onDeleteBtnClick = () => {
    const yes = window.confirm(`'${name}' 를 장바구니에서 삭제하시겠습니까?`);
    if (yes) {
      deleteBagItem({ variables: { id: bagItemId } });
      window.alert(`'${name}' 상품이 삭제되었습니다.`);
    }
  };
  const [c_quantity, setQuantity] = useState(quantity);

  const onIncrease = () => {
    if (c_quantity < stock) {
      updateBagItemCnt({ variables: { bagItemId, quantity: 1 } });
    }
  };

  const onDecrease = () => {
    if (c_quantity > 1) {
      updateBagItemCnt({ variables: { bagItemId, quantity: -1 } });
    }
  };

  const deleteBagItemCompleted = () => {
    const {
      getUser: { user: userCache },
    } = client.readQuery({
      query: GET_USER_QUERY,
      variables: { id: getUserId() },
    });
    client.writeQuery({
      query: GET_USER_QUERY,
      data: {
        getUser: {
          user: { totalBagItems: userCache.totalBagItems - 1 },
        },
      },
      variables: {
        id: getUserId(),
      },
    });
    seeBagRefetch();
  };

  const updateBagItemCntCompleted = data => {
    setQuantity(data.updateBagItemCnt.quantity);
    seeBagRefetch();
  };

  const [deleteBagItem, { loading: deleteBagItemLoading }] = useMutation(DELETE_BAGITEM_MUTATION, {
    onCompleted: deleteBagItemCompleted,
  });

  const [updateBagItemCnt, { loading: updateBagItemCntLoading }] = useMutation(UPDATE_BAGITEM_CNT_MUTATION, {
    onCompleted: updateBagItemCntCompleted,
  });
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
        <Dec onClick={onDecrease} disabled={updateBagItemCntLoading}>
          -
        </Dec>
        <Quantity>{c_quantity}</Quantity>
        <Inc onClick={onIncrease} disabled={updateBagItemCntLoading}>
          +
        </Inc>
        <Total>
          <ItemTotalPrice>{price * c_quantity}원</ItemTotalPrice>
        </Total>
        <Delete onClick={onDeleteBtnClick} disabled={deleteBagItemLoading}>
          삭제
        </Delete>
      </Bag>
    </Container>
  );
}

export default BagItem;
