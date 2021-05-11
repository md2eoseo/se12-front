import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
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
const Button = styled.button`
  background-color: white;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0px 10px;
`;

function RecentItems() {
  const { loading, data } = useQuery(SEE_RECENT_ITEMS_QUERY, { variables: { count: 6 } });

  return (
    <Container>
      {loading && '최신 상품 불러오는 중...'}
      {data &&
        data.seeRecentItems.items.map(item => (
          <Link to="/iteminfo">
            <Button>
              <Item key={item.id} itemId={item.id} imgUrl={item.imgUrl} name={item.name} price={item.price} />
            </Button>
          </Link>
        ))}
    </Container>
  );
}

export default RecentItems;
