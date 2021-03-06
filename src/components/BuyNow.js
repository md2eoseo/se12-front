import { gql, useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { getUserId } from '../client';
import styled from 'styled-components';
import Address from './Address';
import UserInfo from './UserInfo';
import axios from 'axios';
import querystring from 'querystring';
import { useEffect, useState } from 'react';

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
        shippingFee
        author
        contents
        publisher
        activate
        createdAt
        updatedAt
      }
    }
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Title = styled.div`
  font-size: 27px;
  letter-spacing: 3px;
  font-weight: bold;
  justify-content: left;
  color: #696969;
  margin-bottom: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 900px;
  padding: 10px 10px 10px 10px;
  border: 1px solid #bdbdbd;
`;

const UserInfomation = styled.div`
  display: flex;
  flex-direction: row;
`;

const ItemImg = styled.img`
  height: 180px;
  width: 132px;
  max-height: 200px;
  max-width: 140px;
  margin-right: 30px;
  object-fit: cover;
  margin-bottom: 8px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;
const Name = styled.div`
  width: 250px;
`;
const Price = styled.div`
  width: 150px;
  justify-content: left;
`;

const Total = styled.div`
  justify-content: left;
  margin-left: 80px;
  width: 80px;
`;
const ItemQuantity = styled.div`
  border: 1px solid #a6a6a6;
  width: 40px;
  height: 30px;
  text-align: center;
`;
const ItemName = styled.span``;
const ItemPrice = styled.span``;
const TotalPrice = styled.span``;

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
const TName = styled.div`
  width: 300px;
  margin-left: 100px;
`;
const TPrice = styled.div`
  width: 155px;
  justify-content: center;
`;
const TQuantity = styled.div`
  margin-right: 55px;
  width: 60px;
`;

const TTotal = styled.div``;

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

function useQueryString() {
  return new URLSearchParams(useLocation().search);
}

function BuyNow() {
  const queries = useQueryString();
  const itemId = Number(queries.get('itemId'));
  const quantity = Number(queries.get('quantity'));
  const [totalPrice, setTotalPrice] = useState();
  const { data, loading } = useQuery(SEE_ITEM_QUERY, { variables: { id: itemId } });

  useEffect(() => {
    if (data?.seeItem) {
      let totalP = data.seeItem.item.price * quantity;
      if (totalP < 20000) {
        totalP += data.seeItem.item.shippingFee;
      }
      setTotalPrice(totalP);
    }
  }, [data, quantity]);

  async function showKakaoPay() {
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
          item_name: data.seeItem.item.name,
          quantity: quantity,
          total_amount: totalPrice,
          tax_free_amount: totalPrice,
          approval_url: `${process.env.REACT_APP_BASEURL}/pay/success`,
          cancel_url: `${process.env.REACT_APP_BASEURL}/pay/cancel`,
          fail_url: `${process.env.REACT_APP_BASEURL}/pay/fail`,
        })
      )
      .then(res => {
        window.location.replace(res.data.next_redirect_pc_url);
      });
  }

  return !loading ? (
    <Container>
      <Title>??????/??????</Title>
      <Table>
        <TName>
          <Label>?????????</Label>
        </TName>
        <TPrice>
          <Label>?????????</Label>
        </TPrice>
        <TQuantity>
          <Label>??????</Label>
        </TQuantity>
        <TTotal>
          <Label>??????</Label>
        </TTotal>
      </Table>
      <Wrapper>
        <ItemImg src={data && data.seeItem.item.imgUrl[0]} />
        <Name>
          <ItemName>{data && data.seeItem.item.name}</ItemName>
        </Name>
        <Price>
          <ItemPrice>{data && data.seeItem.item.price}???</ItemPrice>
        </Price>

        <ItemQuantity>{quantity}</ItemQuantity>
        <Total>
          <TotalPrice>{data && data.seeItem.item.price * quantity}???</TotalPrice>
        </Total>
      </Wrapper>
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
                ???????????? : <Span>{data && data.seeItem.item.price * quantity}???</Span>
              </Value>
              <Value>
                ????????? : <Span>{` ${totalPrice < 20000 ? data.seeItem.item.shippingFee + '???' : '??????'}`}</Span>
              </Value>
              <Pay>
                ?????? ?????? :<TotalPay>{totalPrice}???</TotalPay>
              </Pay>
            </Box>
          </Payment>
        </Side>
      </UserInfomation>
      <BuyButton onClick={showKakaoPay}>????????????</BuyButton>
    </Container>
  ) : (
    <Container>?????? ?????? ???????????? ???...</Container>
  );
}

export default BuyNow;
