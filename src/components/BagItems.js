import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import BagItem from './BagItem';

const Container = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const SEE_BAG_QUERY = gql`
  query seeBag {
    seeBag {
      ok
      error
      items {
        id
        name
        price
      }
    }
  }
`;

function BagItems() {
  const { loading, data } = useQuery(SEE_BAG_QUERY);

  return (
    <Container>
      {loading && '장바구니 정보 불러오는 중...'}
      {data && data.seeBag.items.map(item => <BagItem key={item.id} itemId={item.id} name={item.name} price={item.price} />)}
    </Container>
  );
}

export default BagItems;
