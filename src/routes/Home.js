import { useReactiveVar } from '@apollo/client';
import styled from 'styled-components';
import { isAdminVar } from '../client';
import Admin from './Admin';
import Customer from './Customer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    width: 100%;
  }
`;

function Home() {
  const isAdmin = useReactiveVar(isAdminVar);
  return <Container>{isAdmin ? <Admin /> : <Customer />}</Container>;
}

export default Home;
