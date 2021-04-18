import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getUserId, logUserOut } from '../client';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Greeting = styled.div``;

const LogoutBtn = styled.button``;

const GET_USER_QUERY = gql`
  query getUser($id: Int!) {
    getUser(id: $id) {
      ok
      error
      user {
        name
      }
    }
  }
`;

function MyMenu() {
  const history = useHistory();
  const [userId, setUserId] = useState();
  const { data, loading } = useQuery(GET_USER_QUERY, { variables: { id: userId } });

  useEffect(() => {
    setUserId(getUserId());
  }, []);

  const logout = () => {
    logUserOut();
    history.push('/');
  };

  return (
    <Container>
      <Greeting>안녕하세요! {!loading && `${data?.getUser?.user?.name}님!`}</Greeting>
      <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
    </Container>
  );
}

export default MyMenu;
