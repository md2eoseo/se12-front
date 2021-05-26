import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import BagItem from './BagItem';

const Container = styled.div`
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
          imgUrl
          stock
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
  width: 900px;
  padding: 10px 10px 10px 20px;
  font-weight: bold;
  color: #4c4c4c;
  background-color: #e7e7e7;
  border: 1px solid #bdbdbd;
`;

const Label = styled.span``;
const Name = styled.div`
  width: 300px;
  margin-left: 100px;
`;
const Price = styled.div`
  width: 155px;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 27px;
  letter-spacing: 3px;
  font-weight: bold;
  color: #696969;
  margin-bottom: 20px;
  margin-left: 2px;
`;
const Quantity = styled.div`
  margin-right: 55px;
  width: 60px;
`;

const Total = styled.div``;

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
        <Total>
          <Label>합계</Label>
        </Total>
      </Table>
      {data &&
        data.seeBag.bagItems.map(item => (
          <BagItem
            key={item.id}
            imgUrl={item.item.imgUrl}
            itemId={item.id}
            name={item.item.name}
            price={item.item.price}
            quantity={item.quantity}
            stock={item.item.stock}
          />
        ))}
    </Container>
  );
}

export default BagItems;
