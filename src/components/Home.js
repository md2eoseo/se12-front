import { Carousel } from 'react-responsive-carousel';
import Banner from './Banner';
import SearchBar from './SearchBar';
import RecentItems from './RecentItems';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const SEE_BANNERS_QUERY = gql`
  query seeBanners {
    seeBanners {
      ok
      error
      banners {
        id
        imgUrl
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-weight: lighter;
  color: #4c4c4c;
  letter-spacing: 3px;
`;

const HR = styled.hr`
  width: 140px;
  margin-bottom: 20px;
`;

function Home({ categories, categoriesLoading }) {
  const { data } = useQuery(SEE_BANNERS_QUERY);

  return (
    <Container>
      <Carousel autoPlay emulateTouch swipeable stopOnHover infiniteLoop showStatus={false} showThumbs={false}>
        {data && data.seeBanners.banners.map(banner => <Banner key={banner.id} bannerId={banner.id} imgUrl={banner.imgUrl} />)}
      </Carousel>
      <SearchBar categories={categories} categoriesLoading={categoriesLoading} />
      <Title>NEW ITEM</Title>
      <HR />
      <RecentItems />
    </Container>
  );
}

export default Home;
