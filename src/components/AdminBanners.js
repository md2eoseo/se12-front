import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Banner from './Banner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1120px;
  margin-bottom: 50px;
`;

const Label = styled.h2`
  padding: 20px;
`;

const Button = styled.div`
  padding: 0px 0px 20px 790px;
`;

const AddButton = styled.button`
  width: 110px;
  height: 50px;
  margin-right: 20px;
  font-size: 18px;
  color: white;
  background-color: #487be1;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    background-color: cornflowerblue;
  }
`;

const SEE_ALL_BANNERS_QUERY = gql`
  query seeAllBanners {
    seeAllBanners {
      ok
      error
      banners {
        id
        category
        imgUrl
        title
        startDate
        endDate
        activate
      }
    }
  }
`;

function AdminBanners() {
  const { loading, data, refetch } = useQuery(SEE_ALL_BANNERS_QUERY);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Container>
      <Label>공지/이벤트 관리</Label>
      <Button>
        <Link to="/addbanner">
          <AddButton>배너 등록</AddButton>
        </Link>
      </Button>

      {loading && '공지/이벤트 불러오는 중...'}
      {data &&
        data.seeAllBanners.banners.map(banner => (
          <Banner
            key={banner.id}
            bannerId={banner.id}
            category={banner.category}
            title={banner.title}
            startDate={banner.startDate}
            endDate={banner.endDate}
            activate={banner.activate}
            admin={true}
          />
        ))}
    </Container>
  );
}

export default AdminBanners;
