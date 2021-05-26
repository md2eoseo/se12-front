import { getUserId } from '../client';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { GET_USER_QUERY } from './MyMenu';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.div``;

function Address() {
  const { data, loading } = useQuery(GET_USER_QUERY, { variables: { id: getUserId() } });
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
