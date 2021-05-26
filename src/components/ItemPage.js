import { gql, useMutation, useQuery, useReactiveVar } from '@apollo/client';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { useState } from 'react';
import { isLoggedInVar } from '../client';
import ItemPageBags from './ItemPageBags';
import Address from './Address';
import { client, getUserId, isLoggedInVar } from '../client';
import { GET_USER_QUERY } from './MyMenu';

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
        author
        contents
        publisher
        pressDate
        activate
        createdAt
        updatedAt
      }
    }
  }
`;

const ADD_BAG_ITEM_MUTATION = gql`
  mutation addBagItem($itemId: Int!, $quantity: Int!) {
    addBagItem(itemId: $itemId, quantity: $quantity) {
      ok
      error
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const WrapperTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Text = styled.h3`
  color: #4c4c4c;
`;

const ItemName = styled.span`
  margin-bottom: 10px;
`;

const ItemImg = styled.img`
  height: 360px;
  width: 264px;
`;

const Image = styled.div`
  height: 360px;
  width: 264px;
  float: left;
`;

const Info = styled.div`
  flex-direction: column;
  margin-left: 100px;
  float: left;
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;

const Content = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  font-size: 20px;
  color: #5d5d5d;
  width: 800px;
`;

const Description = styled.div`
  margin-bottom: 10px;
  font-size: 17px;
`;

const Line = styled.hr`
  margin-top: 10px;
  margin-bottom: 20px;
  width: 800px;
`;

const Author = styled.span`
  padding: 0px 10px 0px 0px;
  color: #747474;
`;

const Price = styled.h2`
  margin-top: 20px;
  font-weight: bold;
`;

const Int = styled.span`
  font-size: 25px;
  font-weight: bold;
  color: #4374d9;
`;

const Label = styled.span`
  font-size: 18px;
  padding: 0px 20px 0px 0px;
`;

const Won = styled.span`
  font-size: 17px;
`;

const Category = styled.span`
  padding: 0px 10px 0px 10px;
  color: #747474;
`;

const Publisher = styled.span`
  padding: 0px 10px 0px 10px;
  color: #747474;
`;

const Pressed = styled.span`
  padding: 0px 10px 0px 10px;
  color: #747474;
`;

const Stock = styled.div`
  margin-top: 30px;
  font-size: 18px;
`;

const Slash = styled.span`
  color: #747474;
`;

const Quantity = styled.div`
  margin-top: 20px;
`;

const H3 = styled.h3`
  float: left;
`;

const Dec = styled.button`
  float: left;
  margin-left: 40px;
  width: 40px;
  height: 35px;
  color: white;
  background-color: #487be1;
  font-size: 100%;
  cursor: pointer;
  outline: none;
  border: 1px solid #487be1;
  &:hover {
    background-color: cornflowerblue;
  }
`;

const Inc = styled.button`
  float: left;
  width: 40px;
  height: 35px;
  color: white;
  background-color: #487be1;
  font-size: 100%;
  cursor: pointer;
  outline: none;
  border: 1px solid #487be1;
  &:hover {
    background-color: cornflowerblue;
  }
`;

const Num = styled.div`
  float: left;
  width: 60px;
  height: 35px;
  font-size: 100%;
  padding: 5px 10px 0px 25px;
  border: 1px solid #3162c7;
  outline: none;
`;

const TotalPrice = styled.div``;

const UserAddress = styled.div`
  margin-top: 20px;
  border: 1px solid #a6a6a6;
  width: 400px;
  padding: 10px;
  &:hover {
    background-color: #eaeaea;
    cursor: pointer;
  }
`;

const Box = styled.div`
  margin-top: 20px;
  height: 70px;
`;

const HR = styled.hr`
  width: 400px;
  margin-top: 80px;
  margin-bottom: 10px;
`;

const Button = styled.div`
  flex-direction: column;
`;

const Destination = styled.button`
  width: 400px;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: white;
  background-color: #41af39;
  font-size: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    background-color: #53c14b;
  }
`;

const BuyButton = styled.button`
  width: 195px;
  height: 50px;
  margin-right: 10px;
  color: white;
  background-color: #487be1;
  font-size: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    background-color: cornflowerblue;
  }
`;

const BagButton = styled.button`
  width: 195px;
  height: 50px;
  color: white;
  background-color: #5d5d5d;
  font-size: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    background-color: #747474;
  }
`;

function useQueryString() {
  return new URLSearchParams(useLocation().search);
}

function ItemPage() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const queries = useQueryString();
  const itemId = Number(queries.get('itemId'));
  const [quantity, setQuantity] = useState(1);
  const { data } = useQuery(SEE_ITEM_QUERY, { variables: { id: itemId } });

  const onCompleted = data => {
    const {
      addBagItem: { ok, error },
    } = data;
    if (!ok) {
      alert(error);
    } else {
      const {
        getUser: { user: userCache },
      } = client.readQuery({
        query: GET_USER_QUERY,
        variables: { id: getUserId() },
      });
      client.writeQuery({
        query: GET_USER_QUERY,
        data: {
          getUser: {
            user: { totalBagItems: userCache.totalBagItems + 1 },
          },
        },
        variables: {
          id: getUserId(),
        },
      });
      alert('추가되었습니다.');
    }
  };

  const pressDate = data && data.seeItem.item.pressDate;
  const pDate = new Date(+pressDate),
    pressYear = pDate.getFullYear(),
    pressMonth = pDate.getMonth() + 1,
    pressDay = pDate.getDate();
  const pressed = `${pressYear}년 ${pressMonth}월 ${pressDay}일`;
  const total = (data && data.seeItem.item.price) * quantity;

  const onIncrease = () => {
    if (quantity !== (data && data.seeItem.item.stock)) {
      setQuantity(quantity => quantity + 1);
    }
  };

  const onDecrease = () => {
    if (quantity !== 1) {
      setQuantity(quantity => quantity - 1);
    }
  };

  const onBagBtnClick = () => {
    if (!isLoggedIn) {
      alert('장바구니 추가는 로그인한 회원만 사용할 수 있습니다.');
      return;
    }
    if (addBagItemLoading) {
      return;
    }
    addBagItem({
      variables: {
        itemId,
        quantity,
      },
    });
  };

  const [addBagItem, { loading: addBagItemLoading }] = useMutation(ADD_BAG_ITEM_MUTATION, {
    onCompleted,
  });

  return (
    <Container>
      <WrapperTop>
        <Image>
          <Carousel autoPlay emulateTouch swipeable stopOnHover infiniteLoop showStatus={false} showThumbs={false}>
            {data && data.seeItem.item.imgUrl.map(src => <ItemImg src={src} />)}
          </Carousel>
        </Image>
        <Info>
          <Title>{data && <ItemName>{data.seeItem.item.name}</ItemName>}</Title>
          <Author>{data && <ItemName>{data.seeItem.item.author} 지음</ItemName>}</Author>
          <Slash>|</Slash>
          <Category>{data && <ItemName>{data.seeItem.item.category.name}</ItemName>}</Category>
          <Slash>|</Slash>
          <Publisher>{data && <ItemName>{data.seeItem.item.publisher}</ItemName>}</Publisher>
          <Slash>|</Slash>
          <Pressed>{data && <ItemName>{pressed}</ItemName>}</Pressed>
          <Stock>{data && <ItemName>재고 : {data.seeItem.item.stock}권</ItemName>}</Stock>
          <Price>
            {data && (
              <ItemName>
                <Label>판매가</Label>
                <Int>{data.seeItem.item.price}</Int>
                <Won>원</Won>
              </ItemName>
            )}
          </Price>
          <Quantity>
            <H3>수량</H3>
            <Dec onClick={onDecrease}>-</Dec>
            <Num>{quantity}</Num>
            <Inc onClick={onIncrease}>+</Inc>
          </Quantity>
          <TotalPrice>
            <HR />
            <Label>총 상품 금액</Label>
            <Int>{total}</Int>
            <Won>원</Won>
          </TotalPrice>
          <UserAddress>
            <Label title="기본 배송지는 회원가입 시 입력한 주소입니다.">배송지</Label>
            <Box>
              <Address />
            </Box>
          </UserAddress>
          <Button>
            <Destination>배송지 선택</Destination>
            <br />
            <BuyButton>구매하기</BuyButton>
            <BagButton onClick={onBagBtnClick}>장바구니 담기</BagButton>
          </Button>
        </Info>
      </WrapperTop>
      <Content>
        <Text>책소개</Text>
        <Line />
        {data && <Description>{data.seeItem.item.contents}</Description>}
      </Content>
    </Container>
  );
}

export default ItemPage;
