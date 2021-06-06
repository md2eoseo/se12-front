import { getUserId } from '../client';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { GET_USER_QUERY } from './MyMenu';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.div`
  margin-bottom: 20px;
  margin-top: -20px;
`;

function UserInfo() {
  const { data, loading } = useQuery(GET_USER_QUERY, { variables: { id: getUserId() } });
  return (
    !loading && (
      <Container>
        <Label>{data.getUser.user.name}</Label>
        <Label>{data.getUser.user.email}</Label>
      </Container>
    )
  );
}

export default UserInfo;
