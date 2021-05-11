import { useReactiveVar } from '@apollo/client';
import styled from 'styled-components';
import { isAdminVar } from '../client';
import AdminPage from './AdminPage';
import CustomerPage from './CustomerPage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    width: 100%;
  }
`;

function HomePage() {
  const isAdmin = useReactiveVar(isAdminVar);
  return <Container>{isAdmin ? <AdminPage /> : <CustomerPage />}</Container>;
}

export default HomePage;
