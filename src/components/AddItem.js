import { gql, useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Select = styled.select`
  height: 50px;
  font-size: 18px;
  &:focus {
    outline: none;
  }
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

const SEE_CATEGORIES_QUERY = gql`
  query seeCategories {
    seeCategories {
      ok
      error
      categories {
        id
        name
      }
    }
  }
`;

const CREATE_ITEM_MUTATION = gql`
  mutation createItem(
    $categoryId: Int!
    $name: String!
    $price: Int!
    $stock: Int
    $imgUrl: [Upload]!
    $author: String
    $contents: String
    $publisher: String
    $activate: Boolean
  ) {
    createItem(
      categoryId: $categoryId
      name: $name
      price: $price
      stock: $stock
      imgUrl: $imgUrl
      author: $author
      contents: $contents
      publisher: $publisher
      activate: $activate
    ) {
      ok
      error
    }
  }
`;

const schema = yup.object().shape({
  categoryId: yup.number().min(1, '카테고리를 선택해주세요.').required('카테고리를 선택해주세요.'),
  name: yup.string().required('상품 이름을 입력해주세요.'),
  price: yup
    .number()
    .required('가격을 입력해주세요.')
    .max(1500000, '1,500,000원 이하의 금액을 입력해주세요.')
    .positive('유효하지 않은 가격입니다.')
    .typeError('가격을 입력해주세요.'),
  author: yup.string(),
  publisher: yup.string(),
  contents: yup.string(),
  imgUrl: yup.mixed().test('fileSize', '2MB 이하 이미지를 업로드해주세요.', value => {
    for (let i = 0; i < value.length; i++) {
      if (value[i].size > 2000000) {
        return false;
      }
    }
    return true;
  }),
});

function AddItem() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ categoryId, name, price, stock, imgUrl, author, contents, publisher, activate }) => {
    if (createItemLoading) {
      return;
    }
    createItem({
      variables: {
        categoryId: Number(categoryId),
        name,
        price,
        stock,
        imgUrl,
        author,
        contents,
        publisher,
        activate,
      },
    });
  };

  const onCompleted = data => {
    const {
      createItem: { ok, error },
    } = data;
    if (!ok) {
      return setError('result', { message: error });
    } else {
      history.push('/');
    }
  };

  const { loading: seeCategoriesLoading, data } = useQuery(SEE_CATEGORIES_QUERY);

  const [createItem, { loading: createItemLoading }] = useMutation(CREATE_ITEM_MUTATION, {
    onCompleted,
  });

  return (
    <Container>
      <Label>상품 등록</Label>
      {errors.result?.message && <Message>{errors.result?.message}</Message>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <Text>이미지</Text>
          <input type="file" {...register('imgUrl')} required multiple />
          {errors.imgUrl?.message && <Message>{errors.imgUrl?.message}</Message>}
        </label>
        <label>
          <Text>카테고리</Text>
          <Select {...register('categoryId')}>
            <option value={0}>선택</option>
            {data?.seeCategories.categories &&
              data.seeCategories.categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </Select>
          {errors.categoryId?.message && <Message>{errors.categoryId?.message}</Message>}
        </label>
        <label>
          <Text>이름</Text>
          <Input type="text" placeholder="이름을 입력하세요." {...register('name')} />
          {errors.name?.message && <Message>{errors.name?.message}</Message>}
        </label>
        <label>
          <Text>가격</Text>
          <Input type="number" placeholder="가격을 입력하세요." {...register('price')} />
          {errors.price?.message && <Message>{errors.price?.message}</Message>}
        </label>
        <label>
          <Text>저자</Text>
          <Input type="text" placeholder="저자를 입력하세요." {...register('author')} />
          {errors.author?.message && <Message>{errors.author?.message}</Message>}
        </label>
        <label>
          <Text>출판사</Text>
          <Input type="text" placeholder="출판사를 입력하세요." {...register('publisher')} />
          {errors.publisher?.message && <Message>{errors.publisher?.message}</Message>}
        </label>
        <label>
          <Text>설명</Text>
          <textarea placeholder="설명을 입력하세요." {...register('contents')} />
          {errors.contents?.message && <Message>{errors.contents?.message}</Message>}
        </label>
        <Button className="submitBtn" type="submit" disabled={createItemLoading || seeCategoriesLoading}>
          {createItemLoading ? '상품 등록 중...' : '상품 등록'}
        </Button>
      </form>
    </Container>
  );
}

export default AddItem;
