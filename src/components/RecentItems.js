import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';

const Container = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const SEE_RECENT_ITEMS_QUERY = gql`
  query seeRecentItems($count: Int) {
    seeRecentItems(count: $count) {
      ok
      error
      items {
        id
        imgUrl
        name
        price
      }
    }
  }
`;

function RecentItems() {
  const { loading, data } = useQuery(SEE_RECENT_ITEMS_QUERY, { variables: { count: 6 } });

  return (
    <Container>
      {loading && '최신 상품 불러오는 중...'}
      {data &&
        data.seeRecentItems.items.map(item => (
          <Item key={item.id} itemId={item.id} imgUrl={item.imgUrl} name={item.name} price={item.price} />
        ))}
    </Container>
  );
}

export default RecentItems;
