import styled from 'styled-components';
import AdminMain from '../components/AdminMain';
import AdminMenu from '../components/AdminMenu';

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
`;

function AdminPage() {
  return (
    <Container>
      <AdminMenu />
      <AdminMain />
    </Container>
  );
}

export default AdminPage;
