import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getUserId, logUserOut } from '../client';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

const AppBlock = styled.div`
  width: 200px;
  margin: 0 auto;
  margin-top: 1rem;
  border: 1px solid black;
  padding: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Greeting = styled.div`
  margin-bottom: 10px;
`;

const LogoutBtn = styled.button`
  width: 64px;
  height: 30px;
  color: white;
  background-color: gray;
  font-size: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  margin-left: 16px;
`;

const BagBtn = styled.button`
  width: 64px;
  height: 30px;
  color: white;
  background-color: cornflowerblue;
  font-size: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  margin-right: 16px;
 `;

const LogoutBtn = styled.button`
  margin-top: 10px;
  width: 80px;
  height: 40px;
  color: white;
  background-color: #487be1;
  font-size: 90%;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    background-color: cornflowerblue;
  }
`;

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
      <AppBlock>
        <Greeting>안녕하세요! {!loading && `${data?.getUser?.user?.name}님!`}</Greeting>
        <BagBtn onClick={()=>{}}>장바구니</BagBtn>
        <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
      </AppBlock>
    </Container>
  );
}

export default MyMenu;
