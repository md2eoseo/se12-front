import styled from 'styled-components';
import ItemManage from './ItemManage';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.div`
  padding: 0px 0px 20px 660px;
`;

const AddButton = styled.button`
  width: 110px;
  height: 50px;
  margin-right: 20px;
  font-size: 18px;
  color: white;
  background-color: #487be1;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    background-color: cornflowerblue;
  }
`;

const SaveButton = styled.button`
  width: 110px;
  height: 50px;
  font-size: 18px;
  color: white;
  background-color: #487be1;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    background-color: cornflowerblue;
  }
`;

const Label = styled.h2`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const SEE_RECENT_ITEMS_QUERY = gql`
  query seeRecentItems($count: Int) {
    seeRecentItems(count: $count) {
      ok
      error
      items {
        id
        author
        publisher
        pressDate
        activate
        createdAt
        updatedAt
        imgUrl
        name
        price
      }
    }
  }
`;

function AdminItems() {
  const { loading, data } = useQuery(SEE_RECENT_ITEMS_QUERY, { variables: { count: 10 } });
  function refreshPage() {
    window.location.reload();
  }
  return (
    <Container>
      <Label>상품 관리</Label>
      <Button>
        <Link to="/additem">
          <AddButton>상품 등록</AddButton>
        </Link>
        <SaveButton onClick={refreshPage}>저장</SaveButton>
      </Button>

      {loading && '상품 불러오는 중...'}
      {data &&
        data.seeRecentItems.items.map(item => (
          <ItemManage
            key={item.id}
            itemId={item.id}
            imgUrl={item.imgUrl}
            name={item.name}
            price={item.price}
            author={item.author}
            publisher={item.publisher}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            activate={item.activate}
          />
        ))}
    </Container>
  );
}

export default AdminItems;
