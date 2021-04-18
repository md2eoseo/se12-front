import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: column;
  align-items: center;
`;

const BannerImg = styled.img``;

function Banner({ bannerId, imgUrl }) {
  return (
    <Container bannerId={bannerId}>
      <BannerImg src={imgUrl} />
    </Container>
  );
}

export default Banner;
