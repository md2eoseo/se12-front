import { useEffect, useState } from 'react';
import './css/Login.css';
import { useHistory } from 'react-router';
import { getUserId, logUserOut } from '../client';
import { gql, useQuery } from '@apollo/client';

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
    <div className="MyMenu">
      <div>안녕하세요! {!loading && `${data?.getUser?.user?.name}님!`}</div>
      <button className="logoutBtn" onClick={logout}>
        로그아웃
      </button>
    </div>
  );
}

export default MyMenu;
