import { gql, useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import { useEffect, useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 400px;
  height: 50px;
  border: solid 1px #b8b8b8;
  margin-bottom: 20px;
  padding: 10px;

  &:focus {
    outline: none;
    border: solid 1px #4374d9;
  }
`;

const Text = styled.div`
  margin-bottom: 10px;
  font-weight: 600;
`;

const Button = styled.button`
  width: 400px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #4374d9;
  margin-bottom: 20px;
  font-weight: 500;
  cursor: pointer;
`;

const Label = styled.h2`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Message = styled.div`
  font-size: 13px;
  margin-bottom: 10px;
  margin-top: -10px;
  color: #ff4848;
`;

const SEE_BANNER_QUERY = gql`
  query seeBanner($id: Int!) {
    seeBanner(id: $id) {
      ok
      error
      banner {
        id
        category
        imgUrl
        title
        contents
        startDate
        endDate
      }
    }
  }
`;

const UPDATE_BANNER_MUTATION = gql`
  mutation updateBanner($id: Int!, $category: BannerCategory, $title: String, $contents: String, $startDate: String, $endDate: String) {
    updateBanner(id: $id, category: $category, title: $title, contents: $contents, startDate: $startDate, endDate: $endDate) {
      ok
      error
    }
  }
`;

const schema = yup.object().shape({
  category: yup.string().required('카테고리를 선택해주세요.').nullable(),
  title: yup.string().required('공지/이벤트 제목을 입력해주세요.').nullable(),
  contents: yup.string(),
  startDate: yup.date().required('시작 날짜를 입력해주세요.').typeError('시작 날짜를 입력해주세요.'),
  endDate: yup.date().required('종료 날짜를 입력해주세요.').typeError('종료 날짜를 입력해주세요.'),
});

function useQueryString() {
  return new URLSearchParams(useLocation().search);
}

function EditBanner() {
  const queries = useQueryString();
  const bannerId = Number(queries.get('bannerId'));
  const history = useHistory();
  const [minEndDate, setMinEndDate] = useState();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ category, title, contents, startDate, endDate }) => {
    if (updateBannerLoading) {
      return;
    }
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    console.log(timezoneOffset);
    console.log(startDate, endDate);
    const nStartDate = new Date(startDate - timezoneOffset);
    const nEndDate = new Date(endDate - timezoneOffset);
    console.log(nStartDate, nEndDate);
    updateBanner({
      variables: {
        id: bannerId,
        category,
        title,
        contents,
        startDate: nStartDate,
        endDate: nEndDate,
      },
    });
  };

  const onCompleted = data => {
    const {
      updateBanner: { ok, error },
    } = data;
    if (!ok) {
      setError('result', { message: error });
    } else {
      history.push('/banners');
    }
  };

  const { loading: seeBannerLoading, data: seeBanner } = useQuery(SEE_BANNER_QUERY, { variables: { id: bannerId } });
  const [updateBanner, { loading: updateBannerLoading }] = useMutation(UPDATE_BANNER_MUTATION, {
    onCompleted,
  });

  useEffect(() => {
    setMinEndDate(seeBanner && new Date(+seeBanner.seeBanner.banner.startDate).toISOString().slice(0, -2));
  }, [seeBanner]);

  useEffect(() => {
    if (seeBanner) {
      document.getElementById(seeBanner.seeBanner.banner.category).checked = true;
    }
  }, [seeBanner]);

  return seeBannerLoading ? (
    <Container>공지/이벤트 불러오는 중...</Container>
  ) : (
    <Container>
      <Label>공지/이벤트 수정</Label>
      {errors.result?.message && <Message>{errors.result?.message}</Message>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="radio" name="category" id="ANNOUNCEMENT" value="ANNOUNCEMENT" {...register('category')} />
        <label htmlFor="ANNOUNCEMENT">공지</label>
        <input type="radio" name="category" id="EVENT" value="EVENT" {...register('category')} />
        <label htmlFor="EVENT">이벤트</label>
        {errors.category?.message && <Message>{errors.category?.message}</Message>}
        <label>
          <Text>제목</Text>
          <Input
            type="text"
            placeholder="제목을 입력하세요."
            {...register('title')}
            defaultValue={seeBanner && seeBanner.seeBanner.banner.title}
          />
          {errors.title?.message && <Message>{errors.title?.message}</Message>}
        </label>
        <label>
          <Text>시작</Text>
          <Input
            type="datetime-local"
            placeholder="시작 날짜/시간을 입력하세요."
            {...register('startDate')}
            onChange={({ target: { value } }) => setMinEndDate(value)}
            defaultValue={seeBanner && new Date(+seeBanner.seeBanner.banner.startDate).toISOString().slice(0, -2)}
          />
          {errors.startDate?.message && <Message>{errors.startDate?.message}</Message>}
        </label>
        <label>
          <Text>종료</Text>
          <Input
            type="datetime-local"
            placeholder="종료 날짜/시간을 입력하세요."
            {...register('endDate')}
            min={minEndDate}
            defaultValue={seeBanner && new Date(+seeBanner.seeBanner.banner.endDate).toISOString().slice(0, -2)}
          />
          {errors.endDate?.message && <Message>{errors.endDate?.message}</Message>}
        </label>
        <label>
          <Text>내용</Text>
          <textarea
            placeholder="내용을 입력하세요."
            {...register('contents')}
            defaultValue={seeBanner && seeBanner.seeBanner.banner.contents}
          />
          {errors.contents?.message && <Message>{errors.contents?.message}</Message>}
        </label>
        <Button className="submitBtn" type="submit" disabled={seeBannerLoading || updateBannerLoading}>
          {updateBannerLoading ? '공지/이벤트 수정 중...' : '공지/이벤트 등록'}
        </Button>
      </form>
    </Container>
  );
}

export default EditBanner;
