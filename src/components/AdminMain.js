import { Route } from 'react-router';
import styled from 'styled-components';
import AdminBanners from './AdminBanners';
import AdminItems from './AdminItems';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function AdminMain() {
  return (
    <Container>
      <Route path="/banners" component={AdminBanners} />
      <Route path="/items" component={AdminItems} />
    </Container>
  );
}

export default AdminMain;
