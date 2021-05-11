import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Banner from './Banner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Label = styled.h2``;

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
  const { loading, data } = useQuery(SEE_ALL_BANNERS_QUERY);

  return (
    <Container>
      <Label>공지/이벤트 관리</Label>
      {loading && '배너 불러오는 중...'}
      {data &&
        data.seeAllBanners.banners.map(banner => (
          <Banner
            key={banner.id}
            bannerId={banner.id}
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
