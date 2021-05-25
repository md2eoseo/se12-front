import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
import Banner from './Banner';
import SearchBar from './SearchBar';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import RecentItems from './RecentItems';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-top: 60px;
  margin-bottom: 10px;
  font-weight: lighter;
  color: #4c4c4c;
  letter-spacing: 3px;
`;

const HR = styled.hr`
  width: 140px;
  margin-bottom: 20px;
`;

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

function CustomerMain({ categories, categoriesLoading }) {
  const { data } = useQuery(SEE_BANNERS_QUERY);

  return (
    <Container>
      <SearchBar categories={categories} categoriesLoading={categoriesLoading} />
      <Carousel autoPlay emulateTouch swipeable stopOnHover infiniteLoop showStatus={false} showThumbs={false}>
        {data && data.seeBanners.banners.map(banner => <Banner key={banner.id} bannerId={banner.id} imgUrl={banner.imgUrl} />)}
      </Carousel>
      <Title>NEW ITEM</Title>
      <HR />
      <RecentItems />
    </Container>
  );
}

export default CustomerMain;
