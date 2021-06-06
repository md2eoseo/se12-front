import { Route } from 'react-router';
import styled from 'styled-components';
import AddBanner from './AddBanner';
import AddItem from './AddItem';
import AdminBanners from './AdminBanners';
import AdminSales from './AdminSales';
import AdminItemInfo from './AdminItemInfo';
import AdminItems from './AdminItems';
import EditBanner from './EditBanner';
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
      <Route path="/sales" component={AdminSales} />
      <Route path="/banners" component={AdminBanners} />
      <Route path="/additem" component={AddItem} />
      <Route path="/addbanner" component={AddBanner} />
      <Route path="/iteminfo" component={AdminItemInfo} />
      <Route path="/edititem" component={EditItem} />
      <Route path="/editbanner" component={EditBanner} />
      <Route exact path="/" component={AdminItems} />
    </Container>
  );
}

export default AdminMain;
