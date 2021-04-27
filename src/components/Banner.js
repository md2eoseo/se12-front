import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 80px;
  margin: 4px;
  padding: 8px;
  border: 1px solid black;

  &:hover {
    border-width: 2px;
    cursor: pointer;
  }
`;

const CardInfo = styled.div``;

const Title = styled.h2``;

const Period = styled.p``;

const CardBtns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ActivateBtn = styled.button`
  width: 32px;
  height: 32px;
  background-color: red;

  ${props =>
    props.activate &&
    css`
      background-color: green;
    `}
`;

const DeleteBtn = styled.button`
  width: 32px;
  height: 32px;
`;

const BannerImg = styled.img``;

const TOGGLE_ACTIVATE_MUTATION = gql`
  mutation toggleActivate($id: Int!, $activate: Boolean!) {
    updateBanner(id: $id, activate: $activate) {
      ok
      error
    }
  }
`;

const DELETE_BANNER_MUTATION = gql`
  mutation deleteBanner($id: Int!) {
    deleteBanner(id: $id) {
      ok
      error
    }
  }
`;

function Banner({ bannerId, imgUrl, title, startDate, endDate, activate, admin }) {
  const start = new Date(+startDate),
    startYear = start.getFullYear(),
    startMonth = ('' + (start.getMonth() + 1)).padStart(2, '0'),
    startDay = ('' + start.getDate()).padStart(2, '0'),
    startHours = ('' + start.getHours()).padStart(2, '0'),
    startMinutes = ('' + start.getMinutes()).padStart(2, '0');
  const end = new Date(+endDate),
    endYear = end.getFullYear(),
    endMonth = ('' + (end.getMonth() + 1)).padStart(2, '0'),
    endDay = ('' + end.getDate()).padStart(2, '0'),
    endHours = ('' + end.getHours()).padStart(2, '0'),
    endMinutes = ('' + end.getMinutes()).padStart(2, '0');
  const period = `${startYear}-${startMonth}-${startDay} ${startHours}:${startMinutes} ~ ${endYear}-${endMonth}-${endDay} ${endHours}:${endMinutes}`;
  const [activateState, setActivateState] = useState(activate);

  const onActivateBtnClick = () => {
    toggleActivate({ variables: { id: bannerId, activate: !activateState } });
  };

  const toggleActivateCompleted = () => {
    setActivateState(!activateState);
  };

  const onDeleteBtnClick = () => {
    const yes = window.confirm(`'${title}' 배너를 지우시겠습니까?`);
    if (yes) {
      deleteBanner({ variables: { id: bannerId } });
    }
  };

  const deleteBannerCompleted = () => {
    document.getElementById(`bannerId-${bannerId}`).remove();
  };

  const [toggleActivate, { toggleActivateLoading }] = useMutation(TOGGLE_ACTIVATE_MUTATION, {
    onCompleted: toggleActivateCompleted,
  });

  const [deleteBanner, { deleteBannerLoading }] = useMutation(DELETE_BANNER_MUTATION, {
    onCompleted: deleteBannerCompleted,
  });

  return (
    <Container id={`bannerId-${bannerId}`}>
      {admin ? (
        <Card>
          <CardInfo>
            <Title>{title}</Title>
            <Period>{period}</Period>
          </CardInfo>
          <CardBtns>
            <ActivateBtn activate={activateState} onClick={onActivateBtnClick} disabled={toggleActivateLoading} />
            <DeleteBtn onClick={onDeleteBtnClick} disabled={deleteBannerLoading}>
              X
            </DeleteBtn>
          </CardBtns>
        </Card>
      ) : (
        <BannerImg src={imgUrl} />
      )}
    </Container>
  );
}

export default Banner;
