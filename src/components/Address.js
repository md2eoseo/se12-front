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
  const { data, loading } = useQuery(GET_USER_QUERY, { variables: { id: userId } });
  useEffect(() => {
    setUserId(getUserId());
  }, []);

  return (
    !loading && (
      <Container>
        <Label>
          {data?.getUser?.user?.address === null || data?.getUser?.user?.address.trim() === ''
            ? '등록된 주소가 없습니다.'
            : data.getUser.user.address}
        </Label>
      </Container>
    )
  );
}

export default Address;
