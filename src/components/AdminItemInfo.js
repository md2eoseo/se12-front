import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
  margin-top: 90px;
  margin-bottom: 70px;
  flex-direction: column;
`;

const Wrapper = styled.div`
  flex-direction: row;
  margin-right: 50px;
`;

const Text = styled.h3`
  color: #4c4c4c;
`;

const ItemName = styled.span`
  margin-bottom: 10px;
  font-size: 17px;
  font-weight: lighter;
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

const Content = styled.div`
  margin-top: 10px;
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

const Label = styled.h3`
  margin-top: 30px;
  font-size: 20px;
  color: #4c4c4c;
`;

const Button = styled.div`
  flex-direction: column;
  margin-top: 50px;
`;

const EditButton = styled.button`
  width: 175px;
  height: 50px;
  margin-left: 20px;
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

const ListButton = styled.button`
  width: 175px;
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

function AdminItemInfo() {
  const queries = useQueryString();
  const itemId = Number(queries.get('itemId'));
  const { loading, data } = useQuery(SEE_ITEM_QUERY, { variables: { id: itemId } });

  var stateString;
  if (data && data.seeItem.item.activate) {
    stateString = '판매중';
  } else {
    stateString = '판매중단';
  }

  if (data && data.seeItem.ok) {
    const pressDate = data && data.seeItem.item.pressDate;
    const pDate = new Date(+pressDate),
      pressYear = pDate.getFullYear(),
      pressMonth = pDate.getMonth() + 1,
      pressDay = pDate.getDate();
    const pressed = `${pressYear}년 ${pressMonth}월 ${pressDay}일`;

    const createDay = data && data.seeItem.item.createdAt;
    const cDate = new Date(+createDay),
      createdYear = cDate.getFullYear(),
      createdMonth = cDate.getMonth() + 1,
      createdDay = cDate.getDate();
    const created = `${createdYear}-${createdMonth}-${createdDay}`;

    const updateDay = data && data.seeItem.item.updatedAt;
    const uDate = new Date(+updateDay),
      updatedYear = uDate.getFullYear(),
      updatedMonth = uDate.getMonth() + 1,
      updatedDay = uDate.getDate();
    const updated = `${updatedYear}-${updatedMonth}-${updatedDay}`;

    return (
      <Container>
        <Wrapper>
          <Image>
            <Carousel autoPlay emulateTouch swipeable stopOnHover infiniteLoop showStatus={false} showThumbs={false}>
              {data && <ItemImg src={data.seeItem.item.imgUrl} />}
            </Carousel>
          </Image>
          <Info>
            <Label>제목 : {data && <ItemName>{data.seeItem.item.name}</ItemName>}</Label>
            <Label>저자 : {data && <ItemName>{data.seeItem.item.author}</ItemName>}</Label>
            <Label>카테고리 : {data && <ItemName>{data.seeItem.item.category.name}</ItemName>}</Label>
            <Label>출판사 : {data && <ItemName>{data.seeItem.item.publisher}</ItemName>}</Label>
            <Label>출간일 : {data && <ItemName>{pressed}</ItemName>}</Label>
            <Label>재고 : {data && <ItemName>{data.seeItem.item.stock}권</ItemName>}</Label>
            <Label>판매가 : {data && <ItemName>{data.seeItem.item.price}원</ItemName>}</Label>
            <Label>
              판매상태 : <ItemName>{stateString}</ItemName>
            </Label>
            <Label>
              등록일 : <ItemName>{created}</ItemName>
            </Label>
            <Label>
              수정일 : <ItemName>{updated}</ItemName>
            </Label>
          </Info>
        </Wrapper>
        <Content>
          <Text>책소개</Text>
          <Line />
          {data && <Description>{data.seeItem.item.contents}</Description>}
        </Content>
        <Button>
          <Link to="/items">
            <ListButton>목록으로</ListButton>
          </Link>
          <EditButton>상품 수정</EditButton>
        </Button>
      </Container>
    );
  } else if (loading) {
    return (
      <Router>
        <Route render={() => <div className="loading">상품 상세정보 불러오는 중...</div>} />
      </Router>
    );
  } else {
    return (
      <Router>
        <Route
          render={() => (
            <div className="error">
              잘못된 접근입니다.
              <a href="/">홈으로 돌아가기</a>
            </div>
          )}
        />
      </Router>
    );
  }
}

export default AdminItemInfo;
