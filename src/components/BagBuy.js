import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BagBuyItems from './BagBuyItems';
import Address from './Address';
import UserInfo from './UserInfo';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const BuyButton = styled.button`
  width: 200px;
  height: 50px;
  color: white;
  margin-top: 40px;
  margin-bottom: 40px;
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

const UserAddress = styled.div`
  margin-top: 20px;
  border: 1px solid #bdbdbd;
  width: 550px;
  height: 350px;
  padding: 10px;
`;

const Box = styled.div`
  margin-top: 40px;
  height: 87px;
`;

const User = styled.div`
  margin-top: 20px;
  border: 1px solid #bdbdbd;
  width: 350px;
  padding: 10px;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
`;

const Payment = styled.div`
  border: 1px solid #bdbdbd;
  width: 350px;
  padding: 10px;
`;

const Pay = styled.div`
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: bold;
  margin-top: -20px;
  margin-bottom: 30px;
  margin-left: 10px;
`;

const Value = styled.div`
  width: 200px;
  margin-bottom: 30px;
  margin-top: -20px;
  margin-left: 10px;
`;

const Span = styled.span`
  width: 100px;
`;

const TotalPay = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const Text = styled.div`
  font-size: 20px;
  letter-spacing: 3px;
  font-weight: bold;
  color: #696969;
  margin-left: 20px;
  margin-top: 10px;
`;

const UserInfomation = styled.div`
  display: flex;
  flex-direction: row;
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

function BagBuy() {
  const [total, setTotal] = useState(0);
  const { loading, data, refetch } = useQuery(SEE_BAG_QUERY);
  const shippingFee = 2500;
  const payment = total + shippingFee;

  useEffect(() => {
    if (data?.seeBag) {
      const sum = data.seeBag.bagItems.reduce((prev, bagItem) => (prev += bagItem.quantity * bagItem.item.price), 0);
      setTotal(sum);
    }
  }, [data]);
  return (
    <Container>
      {loading && '장바구니 정보 불러오는 중...'}
      {data && <BagBuyItems bagItems={data.seeBag.bagItems} seeBagRefetch={refetch} />}
      <UserInfomation>
        <UserAddress>
          <Text>배송지</Text>
          <Box>
            <Address />
          </Box>
        </UserAddress>
        <Side>
          <User>
            <Text>주문자 정보</Text>
            <Box>
              <UserInfo />
            </Box>
          </User>
          <Payment>
            <Text>결제 금액</Text>
            <Box>
              <Value>
                상품금액 : <Span>{total}원</Span>
              </Value>
              <Value>
                배송비 : <Span>{shippingFee}원</Span>
              </Value>
              <Pay>
                주문 금액 : <TotalPay>{payment}원</TotalPay>
              </Pay>
            </Box>
          </Payment>
        </Side>
      </UserInfomation>
      <BuyButton>결제하기</BuyButton>
    </Container>
  );
}

export default BagBuy;
