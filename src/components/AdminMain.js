import { Route } from 'react-router';
import styled from 'styled-components';
import AdminBanners from './AdminBanners';
import AdminItems from './AdminItems';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1000px;
`;

const Title = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  width: 895px;
  font-size: 23px;
  font-weight: bold;
  border: 1px solid #9f9f9f;
  padding: 20px 20px 20px 20px;
  background-color: #d9e5ff;
`;

const Text = styled.span`
  font-size: 17px;
  color: #505050;
  font-weight: lighter;
`;

function AdminMain() {
  return (
    <Container>
      <Title>
        관리자 전용 페이지 <Text> 메뉴를 선택하세요</Text>
      </Title>

      <Route path="/banners" component={AdminBanners} />
      <Route path="/items" component={AdminItems} />
    </Container>
  );
}

export default AdminMain;
