import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const SEE_ITEM_QUERY = gql`
  query seeItem($id: Int) {
    seeItem(id: $id) {
      ok
      error
      item {
        id
        category {
          name
        }
        name
        price
        stock
        imgUrl
        author
        contents
        publisher
        pressDate
        activate
        createdAt
        updatedAt
      }
    }
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
`;

const ItemName = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
`;

const ItemImg = styled.img`
  max-height: 180px;
  margin-bottom: 8px;
`;

function useQueryString() {
  return new URLSearchParams(useLocation().search);
}

function ItemPage() {
  const queries = useQueryString();
  const itemId = Number(queries.get('itemId'));
  const { data } = useQuery(SEE_ITEM_QUERY, { variables: { id: itemId } });

  return (
    <Container>
      {data && <ItemName>제목 : {data.seeItem.item.name}</ItemName>}
      {data && <ItemName>가격 : {data.seeItem.item.price}</ItemName>}
      {data && <ItemName>카테고리 : {data.seeItem.item.category.name}</ItemName>}
      {data && <ItemName>재고 : {data.seeItem.item.stock}</ItemName>}
      {data && <ItemName>작가 : {data.seeItem.item.author}</ItemName>}
      {data && <ItemName>내용 : {data.seeItem.item.contents}</ItemName>}
      {data && <ItemName>출판사 : {data.seeItem.item.publisher}</ItemName>}
      {data && <ItemName>출간일 : {data.seeItem.item.pressDate}</ItemName>}
      {data && <ItemImg src={data.seeItem.item.imgUrl} />}
    </Container>
  );
}

export default ItemPage;
