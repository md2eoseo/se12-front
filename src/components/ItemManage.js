import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Table = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 900px;
height: 200px;
padding: 8px;
border: 1px solid black;

&:hover {
  border-width: 2px;
  cursor: pointer;`;

const ItemImg = styled.img`
  max-height: 160px;
`;
const ItemInfo = styled.div`
  margin-left: -20px;
  height: 50px;
`;
const ItemName = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
`;

const ItemPrice = styled.div`
  margin-left: -20px;
`;

const ItemAuthor = styled.div``;

const ItemPublisher = styled.div`
  margin-left: -20px;
`;

const ItemCreatedAt = styled.div`
  margin-bottom: 10px;
`;

const ItemUpdateAt = styled.div``;

const ItemDate = styled.div`
  margin-left: -20px;
  height: 50px;
`;

const Button = styled.div`
  margin-top: 10px;
  margin-right: 10px;
`;

const Box = styled.div`
  margin-bottom: 15px;
`;

const ActivateButton = styled.button`
  width: 80px;
  height: 40px;
  color: white;
  background-color: #cc3d3d;
  font-size: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  ${props =>
    props.activate &&
    css`
      background-color: #2f9d27;
    `}
`;

const EditButton = styled.button`
  width: 80px;
  height: 40px;
  color: white;
  background-color: #487be1;
  font-size: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    background-color: cornflowerblue;
  }
`;

const DeleteButton = styled.button`
  width: 80px;
  height: 40px;
  color: white;
  background-color: #487be1;
  font-size: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    background-color: cornflowerblue;
  }
`;

const TOGGLE_ACTIVATE_MUTATION = gql`
  mutation toggleActivate($id: Int!, $activate: Boolean!) {
    updateItem(id: $id, activate: $activate) {
      ok
      error
    }
  }
`;

function ItemManage({ itemId, imgUrl, name, price, author, publisher, createdAt, updatedAt, activate }) {
  const cDate = new Date(+createdAt),
    createdYear = cDate.getFullYear(),
    createdMonth = cDate.getMonth() + 1,
    createdDay = cDate.getDate();
  const created = `${createdYear}-${createdMonth}-${createdDay}`;
  const uDate = new Date(+updatedAt),
    updatedYear = uDate.getFullYear(),
    updatedMonth = uDate.getMonth() + 1,
    updatedDay = uDate.getDate();
  const updated = `${updatedYear}-${updatedMonth}-${updatedDay}`;

  const [activateState, setActivateState] = useState(activate);

  const onActivateBtnClick = () => {
    toggleActivate({ variables: { id: itemId, activate: !activateState } });
  };

  const toggleActivateCompleted = () => {
    setActivateState(!activateState);
  };

  const [toggleActivate, { toggleActivateLoading }] = useMutation(TOGGLE_ACTIVATE_MUTATION, {
    onCompleted: toggleActivateCompleted,
  });

  return (
    <Container id={`item-${itemId}`}>
      <Table>
        <ItemImg src={imgUrl} />
        <ItemInfo>
          <ItemName>제목: {name}</ItemName>
          <ItemAuthor>저자: {author}</ItemAuthor>
        </ItemInfo>
        <ItemPublisher>출판사: {publisher}</ItemPublisher>
        <ItemPrice>가격: {price}원</ItemPrice>
        <ItemDate>
          <ItemCreatedAt>등록일: {created}</ItemCreatedAt>
          <ItemUpdateAt>업데이트일: {updated}</ItemUpdateAt>
        </ItemDate>
        <Button>
          <Box>
            <ActivateButton activate={activateState} onClick={onActivateBtnClick} disabled={toggleActivateLoading}>
              판매상태
            </ActivateButton>
          </Box>
          <Box>
            <EditButton>수정</EditButton>
          </Box>
          <Box>
            <DeleteButton>삭제</DeleteButton>
          </Box>
        </Button>
      </Table>
    </Container>
  );
}

export default ItemManage;
