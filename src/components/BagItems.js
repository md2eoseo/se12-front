import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import BagItem from './BagItem';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SEE_BAG_QUERY = gql`
  query seeBag {
    seeBag {
      ok
      error
      bagItems {
        id
        item {
          name
          price
        }
        quantity
        user {
          name
        }
      }
    }
  }
`;

const Table = styled.div`
  display: flex;
  align-items: center;
  width: 800px;
  padding: 10px 10px 10px 20px;
  font-weight: bold;
  color: #4c4c4c;
  background-color: #e7e7e7;
  border: 1px solid #bdbdbd;
`;

const Label = styled.span``;
const Name = styled.div`
  width: 350px;
`;
const Price = styled.div`
  width: 200px;
  justify-content: left;
`;

const Title = styled.div`
  font-size: 27px;
  letter-spacing: 3px;
  font-weight: bold;
  color: #696969;
  margin-bottom: 20px;
  margin-left: 2px;
`;
const Quantity = styled.div``;

function BagItems() {
  const { loading, data } = useQuery(SEE_BAG_QUERY);

  return (
    <Container>
      {loading && '장바구니 정보 불러오는 중...'}
      <Title>장바구니</Title>
      <Table>
        <Name>
          <Label>상품명</Label>
        </Name>
        <Price>
          <Label>판매가</Label>
        </Price>
        <Quantity>
          <Label>수량</Label>
        </Quantity>
      </Table>
      {data &&
        data.seeBag.bagItems.map(item => (
          <BagItem key={item.id} itemId={item.id} name={item.item.name} price={item.item.price} quantity={item.quantity} />
        ))}
    </Container>
  );
}

export default BagItems;
