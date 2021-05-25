import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
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
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ActivateBtn = styled.button`
  width: 80px;
  height: 50px;
  margin-right: 5px;
  color: white;
  background-color: #cc3d3d;
  font-size: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  ${props =>
    props.activate &&
    css`
      background-color: #2f9d27;
    `}
`;

const EditBtn = styled.button`
  width: 80px;
  height: 50px;
  color: white;
  margin-right: 5px;
  background-color: #487be1;
  font-size: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    background-color: cornflowerblue;
  }
`;

const DeleteBtn = styled.button`
  width: 80px;
  height: 50px;
  color: white;
  background-color: #cc0000;
  font-size: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  &:hover {
    background-color: #ee0000;
  }
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

function Banner({ bannerId, imgUrl, category, title, startDate, endDate, activate, admin }) {
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
    const yes = window.confirm(`'${title}' ${category === 'ANNOUNCEMENT' ? '공지' : '이벤트'}를 지우시겠습니까?`);
    if (yes) {
      deleteBanner({ variables: { id: bannerId } });
    }
  };

  const deleteBannerCompleted = () => {
    document.getElementById(`banner-${bannerId}`).remove();
  };

  const [toggleActivate, { toggleActivateLoading }] = useMutation(TOGGLE_ACTIVATE_MUTATION, {
    onCompleted: toggleActivateCompleted,
  });

  const [deleteBanner, { deleteBannerLoading }] = useMutation(DELETE_BANNER_MUTATION, {
    onCompleted: deleteBannerCompleted,
  });

  return (
    <Container id={`banner-${bannerId}`}>
      {admin ? (
        <Card>
          <CardInfo>
            <Title>
              {category === 'ANNOUNCEMENT' ? '공지' : '이벤트'} : {title}
            </Title>
            <Period>{period}</Period>
          </CardInfo>
          <CardBtns>
            <ActivateBtn activate={activateState} onClick={onActivateBtnClick} disabled={toggleActivateLoading}>
              노출상태
            </ActivateBtn>
            <Link to={`/editbanner?bannerId=${bannerId}`}>
              <EditBtn>수정</EditBtn>
            </Link>
            <DeleteBtn onClick={onDeleteBtnClick} disabled={deleteBannerLoading}>
              삭제
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
