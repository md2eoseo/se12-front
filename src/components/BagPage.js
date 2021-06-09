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

const Caption = styled.span`
  color: grey;
`;

const BuyButton = styled.button`
  margin: 40px 0;
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
          shippingFee
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
  const FREE_SHIPPING_LIMIT = 20000;
  const [totalPrice, setTotalPrice] = useState(0);
  const [maxShippingFee, setMaxShippingFee] = useState(0);
  const { loading, data, refetch } = useQuery(SEE_BAG_QUERY);
  const history = useHistory();

  useEffect(() => {
    if (data?.seeBag && data.seeBag.bagItems.length > 0) {
      let totalP = data.seeBag.bagItems.reduce((prev, bagItem) => (prev += bagItem.quantity * bagItem.item.price), 0);
      const maximumShippingFee = Math.max(...data.seeBag.bagItems.map(bagItem => bagItem.item.shippingFee));
      setTotalPrice(totalP);
      setMaxShippingFee(maximumShippingFee);
    }
  }, [data]);

  const onBuyBtnClick = () => {
    if ((data && data.seeBag.bagItems).length === 0) {
      alert('구매할 상품이 없습니다.');
      return;
    } else {
      history.push(`/bagbuy`);
    }
  };

  return (
    <Container>
      {loading && '장바구니 정보 불러오는 중...'}
      {data && <BagItems bagItems={data.seeBag.bagItems} seeBagRefetch={refetch} />}
      <TotalPrice>
        총 결제 금액 ₩{totalPrice} {` + 배송비 ${totalPrice < FREE_SHIPPING_LIMIT ? '₩' + maxShippingFee : '무료'}`}
        {` = ₩${totalPrice < FREE_SHIPPING_LIMIT ? totalPrice + maxShippingFee : totalPrice}`}
      </TotalPrice>
      <Caption>상품 금액이 20000원 이상이면 배송비가 무료입니다.</Caption>
      <BuyButton onClick={onBuyBtnClick}>구매하기</BuyButton>
    </Container>
  );
}

export default BagPage;
