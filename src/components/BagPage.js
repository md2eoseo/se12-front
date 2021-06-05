import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import BagItems from './BagItems';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const TotalPrice = styled.div`
  font-size: 30px;
  margin-top: 20px;
`;

const Total = styled.span`
  font-weight: bold;
  color: #4374d9;
`;

const BuyButton = styled.button`
  width: 200px;
  height: 50px;
  color: white;
  background-color: #487be1;
  font-size: 140%;
  letter-spacing: 2px;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    background-color: cornflowerblue;
  }
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

function BagPage() {
  const [total, setTotal] = useState(0);
  const { loading, data, refetch } = useQuery(SEE_BAG_QUERY);
  const history = useHistory();

  const onBuyBtnClick = () => {
    if (total == 0) {
      alert('구매할 상품이 없습니다.');
      return;
    } else {
      history.push(`/bagbuy`);
    }
  };

  useEffect(() => {
    if (data?.seeBag) {
      const sum = data.seeBag.bagItems.reduce((prev, bagItem) => (prev += bagItem.quantity * bagItem.item.price), 0);
      setTotal(sum);
    }
  }, [data]);
  return (
    <Container>
      {loading && '장바구니 정보 불러오는 중...'}
      {data && <BagItems bagItems={data.seeBag.bagItems} seeBagRefetch={refetch} />}
      <TotalPrice>
        총 금액 ₩<Total>{total}</Total>
      </TotalPrice>
      <BuyButton onClick={onBuyBtnClick}>구매하기</BuyButton>
    </Container>
  );
}

export default BagPage;
