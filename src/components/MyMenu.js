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

const Greeting = styled.div`
  width: 100%;
  text-align: center;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
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
        totalBagItems
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

  const onBagBtnClick = () => {
    history.push('/bag');
  };

  const logout = () => {
    logUserOut();
    history.push('/');
  };

  return (
    <Container>
      <Greeting>안녕하세요! {!loading && `${data?.getUser?.user?.name}님!`}</Greeting>
      <Buttons>
        <Button onClick={onBagBtnClick}>장바구니({data?.getUser?.user?.totalBagItems})</Button>
        <Button onClick={logout}>로그아웃</Button>
      </Buttons>
    </Container>
  );
}

export default MyMenu;
