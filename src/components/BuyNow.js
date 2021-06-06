import { gql, useQuery } from '@apollo/client';
import { useLocation, useHistory } from 'react-router-dom';
import { setState } from 'react';
import { useState } from 'react';
import { GET_USER_QUERY } from './MyMenu';
import { getUserId } from '../client';
import styled from 'styled-components';
import Address from './Address';
import UserInfo from './UserInfo';
import axios from 'axios';
import Kakaopay from './Kakaopay';

export const SEE_ITEM_QUERY = gql`
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
const T_Name = styled.div`
  width: 300px;
  margin-left: 100px;
`;
const T_Price = styled.div`
  width: 155px;
  justify-content: center;
`;
const T_Quantity = styled.div`
  margin-right: 55px;
  width: 60px;
`;

const T_Total = styled.div``;

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

function ShowKakaopay() {
  return <Kakaopay />;
}

function BuyNow() {
  const queries = useQueryString();
  const history = useHistory();
  const itemId = Number(queries.get('itemId'));
  const { data } = useQuery(SEE_ITEM_QUERY, { variables: { id: itemId } });
  const { userdata, loading } = useQuery(GET_USER_QUERY, { variables: { id: getUserId() } });
  const count = localStorage.getItem('count');
  const shippingFee = 2500;
  const total = (data && data.seeItem.item.price) * count;
  const payment = total + shippingFee;

  return (
    !loading && (
      <Container>
        <Title>주문/결제</Title>
        <Table>
          <T_Name>
            <Label>상품명</Label>
          </T_Name>
          <T_Price>
            <Label>판매가</Label>
          </T_Price>
          <T_Quantity>
            <Label>수량</Label>
          </T_Quantity>
          <T_Total>
            <Label>합계</Label>
          </T_Total>
        </Table>
        <Wrapper>
          <ItemImg src={data && data.seeItem.item.imgUrl[0]} />
          <Name>
            <ItemName>{data && data.seeItem.item.name}</ItemName>
          </Name>
          <Price>
            <ItemPrice>{data && data.seeItem.item.price}원</ItemPrice>
          </Price>

          <ItemQuantity>{count}</ItemQuantity>
          <Total>
            <TotalPrice>{total}원</TotalPrice>
          </Total>
        </Wrapper>
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
        <BuyButton onClick={ShowKakaopay}>결제하기</BuyButton>
      </Container>
    )
  );
}

export default BuyNow;
