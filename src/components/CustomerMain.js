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

function CustomerMain() {
  const { data } = useQuery(SEE_BANNERS_QUERY);

  return (
    <Container>
      <SearchBar />
      <Carousel autoPlay emulateTouch swipeable stopOnHover infiniteLoop showStatus={false} showThumbs={false}>
        {data && data.seeBanners.banners.map(banner => <Banner key={banner.id} bannerId={banner.id} imgUrl={banner.imgUrl} />)}
      </Carousel>
      <RecentItems />
    </Container>
  );
}

export default CustomerMain;
