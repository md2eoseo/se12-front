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
  const [info, setInfo] = useState(true);

  if (data?.getUser?.user?.address == null) {
    setInfo(info => false);
  }

  useEffect(() => {
    setUserId(getUserId());
  }, []);
  return (
    <Container>
      <Label> {info ? data?.getUser?.user?.address : `등록된 주소가 없습니다.`}</Label>
    </Container>
  );
}

export default Address;
