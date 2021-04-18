import styled from 'styled-components';

const Container = styled.div``;

const BannerImg = styled.img``;

function Banner({ bannerId, imgUrl }) {
  return (
    <Container bannerId={bannerId}>
      <BannerImg src={imgUrl} />
    </Container>
  );
}

export default Banner;
