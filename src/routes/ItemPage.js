import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { useState } from 'react';

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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 100px;
  flex-direction: column;
`;

const Wrapper = styled.div`
  flex-direction: row;
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

const Contents = styled.div`
  margin-top: 100px;
  margin-bottom: 20px;

  font-size: 20px;
  color: #5d5d5d;
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
  flex-direction: column;
`;

const H3 = styled.h3``;

const Dec = styled.button`
  margin-left: 40px;
  width: 40px;
  height: 35px;
  padding: 0px 10px 0px 20px;
`;
const Inc = styled.button``;

const Num = styled.div``;

const Button = styled.div`
  flex-direction: column;
`;

const BuyButton = styled.button`
  width: 360px;
  height: 50px;
`;

const BagButton = styled.button``;
function useQueryString() {
  return new URLSearchParams(useLocation().search);
}

function ItemPage() {
  const [number, setNumber] = useState(0);
  const onIncrease = () => {
    setNumber(number => number + 1);
  };
  const onDecrease = () => {
    setNumber(number => number - 1);
  };

  const queries = useQueryString();
  const itemId = Number(queries.get('itemId'));
  const { data } = useQuery(SEE_ITEM_QUERY, { variables: { id: itemId } });
  const pressDate = data && data.seeItem.item.pressDate;
  const pDate = new Date(+pressDate),
    pressYear = pDate.getFullYear(),
    pressMonth = pDate.getMonth() + 1,
    pressDay = pDate.getDate();
  const pressed = `${pressYear}년 ${pressMonth}월 ${pressDay}일`;

  return (
    <Container>
      <Wrapper>
        <Image>
          <Carousel autoPlay emulateTouch swipeable stopOnHover infiniteLoop showStatus={false} showThumbs={false}>
            {data && <ItemImg src={data.seeItem.item.imgUrl} />}
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
            <Num>{number}</Num>
            <Inc onClick={onIncrease}>+</Inc>
          </Quantity>
          <Button>
            <BuyButton>앙</BuyButton>
            <BagButton>양</BagButton>
          </Button>
        </Info>
      </Wrapper>
      <Contents>
        <Text>책소개</Text>
        <Line />
        {data && <ItemName>{data.seeItem.item.contents}</ItemName>}
      </Contents>
    </Container>
  );
}

export default ItemPage;
