import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BagBuyItems from './BagBuyItems';
import Address from './Address';
import UserInfo from './UserInfo';
import axios from 'axios';
import querystring from 'querystring';
import { getUserId } from '../client';

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
          shippingFee
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
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [maxShippingFee, setMaxShippingFee] = useState(0);
  const { loading, data, refetch } = useQuery(SEE_BAG_QUERY);
  const FREE_SHIPPING_LIMIT = 20000;

  useEffect(() => {
    if (data?.seeBag && data.seeBag.bagItems.length > 0) {
      let totalP = data.seeBag.bagItems.reduce((prev, bagItem) => (prev += bagItem.quantity * bagItem.item.price), 0);
      const totalQ = data.seeBag.bagItems.reduce((prev, bagItem) => (prev += bagItem.quantity), 0);
      const maximumShippingFee = Math.max(...data.seeBag.bagItems.map(bagItem => bagItem.item.shippingFee));
      setTotalPrice(totalP);
      setTotalQuantity(totalQ);
      setMaxShippingFee(maximumShippingFee);
    }
  }, [data]);

  async function showKakaoPay() {
    if (totalPrice > 1000000) {
      window.alert('????????? ?????? ????????? ????????? ?????? 100???????????????.');
    } else {
      const instance = axios.create({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_AK}`,
        },
      });
      await instance
        .post(
          '/v1/payment/ready',
          querystring.stringify({
            cid: 'TC0ONETIME',
            partner_order_id: '00000001',
            partner_user_id: getUserId(),
            item_name: '???????????? ??????',
            quantity: totalQuantity,
            total_amount: totalPrice < 20000 ? totalPrice + maxShippingFee : totalPrice,
            tax_free_amount: totalPrice < 20000 ? totalPrice + maxShippingFee : totalPrice,
            approval_url: `${process.env.REACT_APP_BASEURL}/pay/success`,
            cancel_url: `${process.env.REACT_APP_BASEURL}/pay/cancel`,
            fail_url: `${process.env.REACT_APP_BASEURL}/pay/fail`,
          })
        )
        .then(res => {
          window.location.replace(res.data.next_redirect_pc_url);
        });
    }
  }

  return (
    <Container>
      {loading && '???????????? ?????? ???????????? ???...'}
      {data && <BagBuyItems bagItems={data.seeBag.bagItems} seeBagRefetch={refetch} />}
      <UserInfomation>
        <UserAddress>
          <Text>?????????</Text>
          <Box>
            <Address />
          </Box>
        </UserAddress>
        <Side>
          <User>
            <Text>????????? ??????</Text>
            <Box>
              <UserInfo />
            </Box>
          </User>
          <Payment>
            <Text>?????? ??????</Text>
            <Box>
              <Value>
                ???????????? : <Span>{totalPrice}???</Span>
              </Value>
              <Value>
                ????????? : <Span> {` ${totalPrice < FREE_SHIPPING_LIMIT ? maxShippingFee + '???' : '??????'}`}</Span>
              </Value>
              <Pay>
                ?????? ?????? : <TotalPay>{totalPrice < 20000 ? totalPrice + maxShippingFee : totalPrice}???</TotalPay>
              </Pay>
            </Box>
          </Payment>
        </Side>
      </UserInfomation>
      <BuyButton onClick={showKakaoPay}>????????????</BuyButton>
    </Container>
  );
}

export default BagBuy;
