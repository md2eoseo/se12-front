import { useEffect, useState } from 'react';
import { getUserId } from '../client';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.div``;

const GET_USER_QUERY = gql`
  query getUser($id: Int!) {
    getUser(id: $id) {
      ok
      error
      user {
        address
      }
    }
  }
`;

function Address() {
  const [userId, setUserId] = useState();
  const { data } = useQuery(GET_USER_QUERY, { variables: { id: userId } });
  useEffect(() => {
    setUserId(getUserId());
  }, []);

  if ((data && data.getUser.user.address == '') || userId == '') {
    return (
      <Container>
        <Label>등록된 주소가 없습니다.</Label>
      </Container>
    );
  } else {
    return (
      <Container>
        <Label> {data && data.getUser.user.address}</Label>
      </Container>
    );
  }
}

export default Address;
