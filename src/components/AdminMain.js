import { Route } from 'react-router';
import styled from 'styled-components';
import AddBanner from './AddBanner';
import AddItem from './AddItem';
import AdminBanners from './AdminBanners';
import AdminItemInfo from './AdminItemInfo';
import AdminItems from './AdminItems';
import EditItem from './EditItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1000px;
`;

function AdminMain() {
  return (
    <Container>
      <Route path="/banners" component={AdminBanners} />
      <Route path="/additem" component={AddItem} />
      <Route path="/addbanner" component={AddBanner} />
      <Route path="/iteminfo" component={AdminItemInfo} />
      <Route path="/edititem" component={EditItem} />
      <Route exact path="/" component={AdminItems} />
    </Container>
  );
}

export default AdminMain;
