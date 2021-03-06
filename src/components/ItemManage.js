import styled, { css } from 'styled-components';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../client';

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
    cursor: pointer;
  }
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 790px;
  height: 200px;
  margin-right: 10px;
`;

const ItemImg = styled.img`
  ${props =>
    props.src &&
    css`
      background-image: url(${props.src});
    `}
  height: 180px;
  width: 132px;
  max-height: 160px;
  max-width: 100px;
  object-fit: cover;
  margin-bottom: 8px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;
const ItemInfo = styled.div`
  margin-left: -20px;
`;
const ItemName = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
  max-width: 100px;
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

function showItemState(activate) {
  if (activate) {
    return '?????????';
  } else if (!activate) {
    return '????????????';
  }
}

function deleteBtn(activate) {
  if (activate) {
    return '??????';
  } else if (!activate) {
    return '??????';
  }
}

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
    const yes = window.confirm(`'${name}' ????????? ${activateState ? '??????' : '??????'}???????????????????`);

    if (yes) {
      toggleActivate({ variables: { id: itemId, activate: !activateState } });

      window.alert(`'${name}' ????????? ${activateState ? '??????' : '??????'}???????????????.`);
    }
  };

  const toggleActivateCompleted = () => {
    setActivateState(!activateState);
    const itemActivate = client.readFragment({
      id: `Item:${itemId}`,
      fragment: gql`
        fragment ItemFragment on Item {
          activate
        }
      `,
    });
    client.writeFragment({
      id: `Item:${itemId}`,
      fragment: gql`
        fragment ItemFragment on Item {
          activate
        }
      `,
      data: {
        activate: !itemActivate.activate,
      },
    });
  };

  const [toggleActivate, { toggleActivateLoading }] = useMutation(TOGGLE_ACTIVATE_MUTATION, {
    onCompleted: toggleActivateCompleted,
  });

  return (
    <Container id={`item-${itemId}`}>
      <Table>
        <Link to={`/iteminfo?itemId=${itemId}`} style={{ textDecoration: 'none', color: 'black' }}>
          <Contents>
            <ItemImg src={imgUrl[0]} />
            <ItemInfo>
              <ItemName>??????: {name}</ItemName>
              {author && <ItemAuthor>??????: {author}</ItemAuthor>}
            </ItemInfo>
            {publisher && <ItemPublisher>?????????: {publisher}</ItemPublisher>}
            <ItemPrice>??????: {price}???</ItemPrice>
            <ItemDate>
              <ItemCreatedAt>?????????: {created}</ItemCreatedAt>
              <ItemUpdateAt>???????????????: {updated}</ItemUpdateAt>
            </ItemDate>
          </Contents>
        </Link>
        <Button>
          <Box>
            <ActivateButton activate={activateState}>{showItemState(activateState)}</ActivateButton>
          </Box>
          <Box>
            <Link to={`/edititem?itemId=${itemId}`}>
              <EditButton>??????</EditButton>
            </Link>
          </Box>
          <Box>
            <DeleteButton onClick={onActivateBtnClick} disabled={toggleActivateLoading}>
              {deleteBtn(activateState)}
            </DeleteButton>
          </Box>
        </Button>
      </Table>
    </Container>
  );
}

export default ItemManage;
