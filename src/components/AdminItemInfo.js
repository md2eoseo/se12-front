import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

const SEE_ITEM_QUERY = gql`
  query seeItem($id: Int) {
    seeItem(id: $id) {
      ok
      error
      item {
        id
        categoryId
        category {
          name
        }
        name
        price
        stock
        shippingFee
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
    stateString = '?????????';
  } else {
    stateString = '????????????';
  }

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

  return loading ? (
    <Container>?????? ???????????? ???...</Container>
  ) : (
    <Container>
      <Wrapper>
        <Image>
          <Carousel autoPlay emulateTouch swipeable stopOnHover infiniteLoop showStatus={false} showThumbs={false}>
            {data && data.seeItem.item.imgUrl.map((src, i) => <ItemImg key={i} src={src} />)}
          </Carousel>
        </Image>
        <Info>
          <Label>?????? : {data && <ItemName>{data.seeItem.item.name}</ItemName>}</Label>
          <Label>?????? : {data && <ItemName>{data.seeItem.item.author}</ItemName>}</Label>
          <Label>???????????? : {data && <ItemName>{data.seeItem.item.category.name}</ItemName>}</Label>
          <Label>????????? : {data && <ItemName>{data.seeItem.item.publisher}</ItemName>}</Label>
          <Label>?????? : {data && <ItemName>{data.seeItem.item.stock}???</ItemName>}</Label>
          <Label>????????? : {data && <ItemName>{data.seeItem.item.price}???</ItemName>}</Label>
          <Label>????????? : {data && <ItemName>{data.seeItem.item.shippingFee}???</ItemName>}</Label>
          <Label>
            ???????????? : <ItemName>{stateString}</ItemName>
          </Label>
          <Label>
            ????????? : <ItemName>{created}</ItemName>
          </Label>
          <Label>
            ????????? : <ItemName>{updated}</ItemName>
          </Label>
        </Info>
      </Wrapper>
      <Content>
        <Text>?????????</Text>
        <Line />
        {data && <Description>{data.seeItem.item.contents}</Description>}
      </Content>
      <Button>
        <Link to="/">
          <ListButton>????????????</ListButton>
        </Link>
        <Link to={`/edititem?itemId=${itemId}`}>
          <EditButton>?????? ??????</EditButton>
        </Link>
      </Button>
    </Container>
  );
}

export default AdminItemInfo;
