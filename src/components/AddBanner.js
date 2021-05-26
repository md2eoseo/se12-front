import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useState } from 'react';

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

const CREATE_BANNER_MUTATION = gql`
  mutation createBanner(
    $category: BannerCategory!
    $title: String!
    $contents: String
    $imgUrl: Upload!
    $startDate: String!
    $endDate: String!
  ) {
    createBanner(category: $category, title: $title, contents: $contents, imgUrl: $imgUrl, startDate: $startDate, endDate: $endDate) {
      ok
      error
    }
  }
`;

const schema = yup.object().shape({
  category: yup.string().required('카테고리를 선택해주세요.').nullable(),
  title: yup.string().required('공지/이벤트 제목을 입력해주세요.').nullable(),
  contents: yup.string(),
  imgUrl: yup.mixed().test('fileSize', '2MB 이하 이미지를 업로드해주세요.', value => {
    return value[0].size <= 2000000;
  }),
  startDate: yup.date().required('시작 날짜를 입력해주세요.').typeError('시작 날짜를 입력해주세요.'),
  endDate: yup.date().required('종료 날짜를 입력해주세요.').typeError('종료 날짜를 입력해주세요.'),
});

const timezoneOffset = new Date().getTimezoneOffset() * 60000;

function AddBanner() {
  const history = useHistory();
  const [minEndDate, setMinEndDate] = useState('');
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ category, title, imgUrl, contents, startDate, endDate }) => {
    if (loading) {
      return;
    }

    const nStartDate = new Date(startDate - timezoneOffset);
    const nEndDate = new Date(endDate - timezoneOffset);
    createBanner({
      variables: {
        category,
        title,
        contents,
        imgUrl: imgUrl[0],
        startDate: nStartDate,
        endDate: nEndDate,
      },
    });
  };

  const onCompleted = data => {
    const {
      createBanner: { ok, error },
    } = data;
    if (!ok) {
      setError('result', { message: error });
    } else {
      history.push('/banners');
    }
  };

  const [createBanner, { loading }] = useMutation(CREATE_BANNER_MUTATION, {
    onCompleted,
  });

  return (
    <Container>
      <Label>공지/이벤트 등록</Label>
      {errors.result?.message && <Message>{errors.result?.message}</Message>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="radio" name="category" id="ANNOUNCEMENT" value="ANNOUNCEMENT" checked {...register('category')} />
        <label htmlFor="ANNOUNCEMENT">공지</label>
        <input type="radio" name="category" id="EVENT" value="EVENT" {...register('category')} />
        <label htmlFor="EVENT">이벤트</label>
        {errors.category?.message && <Message>{errors.category?.message}</Message>}
        <label>
          <Text>이미지</Text>
          <input type="file" {...register('imgUrl')} required />
          {errors.imgUrl?.message && <Message>{errors.imgUrl?.message}</Message>}
        </label>
        <label>
          <Text>제목</Text>
          <Input type="text" placeholder="제목을 입력하세요." {...register('title')} />
          {errors.title?.message && <Message>{errors.title?.message}</Message>}
        </label>
        <label>
          <Text>시작</Text>
          <Input
            type="datetime-local"
            placeholder="시작 날짜/시간을 입력하세요."
            {...register('startDate')}
            onChange={({ target: { value } }) => setMinEndDate(value)}
          />
          {errors.startDate?.message && <Message>{errors.startDate?.message}</Message>}
        </label>
        <label>
          <Text>종료</Text>
          <Input type="datetime-local" placeholder="종료 날짜/시간을 입력하세요." {...register('endDate')} min={minEndDate} />
          {errors.endDate?.message && <Message>{errors.endDate?.message}</Message>}
        </label>
        <label>
          <Text>내용</Text>
          <textarea placeholder="내용을 입력하세요." {...register('contents')} />
          {errors.contents?.message && <Message>{errors.contents?.message}</Message>}
        </label>
        <Button className="submitBtn" type="submit" disabled={loading}>
          {loading ? '공지/이벤트 등록 중...' : '공지/이벤트 등록'}
        </Button>
      </form>
    </Container>
  );
}

export default AddBanner;
