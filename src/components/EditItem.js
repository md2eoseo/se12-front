import { gql, useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';

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

const SEE_ITEM_QUERY = gql`
  query seeItem($id: Int) {
    seeItem(id: $id) {
      ok
      error
      item {
        id
        categoryId
        category {
          name
        }
        name
        price
        stock
        imgUrl
        author
        contents
        publisher
        pressDate
        activate
        createdAt
        updatedAt
      }
    }
  }
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

const UPDATE_ITEM_MUTATION = gql`
  mutation updateItem(
    $id: Int!
    $categoryId: Int
    $name: String
    $price: Int
    $stock: Int
    $author: String
    $contents: String
    $publisher: String
    $pressDate: String
  ) {
    updateItem(
      id: $id
      categoryId: $categoryId
      name: $name
      price: $price
      stock: $stock
      author: $author
      contents: $contents
      publisher: $publisher
      pressDate: $pressDate
    ) {
      ok
      error
    }
  }
`;

const schema = yup.object().shape({
  categoryId: yup.number().min(1, '카테고리를 선택해주세요.').required('카테고리를 선택해주세요.'),
  name: yup.string().required('상품 이름을 입력해주세요.'),
  price: yup.number().min(0, '유효하지 않은 가격입니다.').required('가격을 입력해주세요.'),
  author: yup.string(),
  publisher: yup.string(),
  contents: yup.string(),
});

function useQueryString() {
  return new URLSearchParams(useLocation().search);
}

function EditItem() {
  const queries = useQueryString();
  const itemId = Number(queries.get('itemId'));
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = ({ categoryId, name, price, stock, author, contents, publisher, pressDate }) => {
    if (updateItemLoading) {
      return;
    }
    updateItem({
      variables: {
        id: itemId,
        categoryId: Number(categoryId),
        name,
        price,
        stock,
        author,
        contents,
        publisher,
        pressDate,
      },
    });
  };

  const onCompleted = data => {
    const {
      updateItem: { ok, error },
    } = data;
    if (!ok) {
      return setError('result', { message: error });
    } else {
      history.push('/items');
    }
  };

  const { loading: seeItemLoading, data: seeItem } = useQuery(SEE_ITEM_QUERY, { variables: { id: itemId } });
  const { loading: seeCategoriesLoading, data: seeCategories } = useQuery(SEE_CATEGORIES_QUERY);

  const [updateItem, { loading: updateItemLoading }] = useMutation(UPDATE_ITEM_MUTATION, {
    onCompleted,
  });

  return seeCategoriesLoading || seeItemLoading ? (
    <Container>상품 불러오는 중...</Container>
  ) : (
    <Container>
      <Label>상품 수정</Label>
      {errors.result?.message && <Message>{errors.result?.message}</Message>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <Text>카테고리</Text>
          <Select {...register('categoryId')} defaultValue={seeItem.seeItem.item.categoryId}>
            <option value={0}>선택</option>
            {seeCategories.seeCategories.categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
          {errors.categoryId?.message && <Message>{errors.categoryId?.message}</Message>}
        </label>
        <label>
          <Text>이름</Text>
          <Input type="text" placeholder="이름을 입력하세요." {...register('name')} defaultValue={seeItem && seeItem.seeItem.item.name} />
          {errors.name?.message && <Message>{errors.name?.message}</Message>}
        </label>
        <label>
          <Text>가격</Text>
          <Input
            type="number"
            placeholder="가격을 입력하세요."
            {...register('price')}
            defaultValue={seeItem && seeItem.seeItem.item.price}
          />
          {errors.price?.message && <Message>{errors.price?.message}</Message>}
        </label>
        <label>
          <Text>저자</Text>
          <Input
            type="text"
            placeholder="저자를 입력하세요."
            {...register('author')}
            defaultValue={seeItem && seeItem.seeItem.item.author}
          />
          {errors.author?.message && <Message>{errors.author?.message}</Message>}
        </label>
        <label>
          <Text>출판사</Text>
          <Input
            type="text"
            placeholder="출판사를 입력하세요."
            {...register('publisher')}
            defaultValue={seeItem && seeItem.seeItem.item.publisher}
          />
          {errors.publisher?.message && <Message>{errors.publisher?.message}</Message>}
        </label>
        <label>
          <Text>설명</Text>
          <textarea placeholder="설명을 입력하세요." {...register('contents')} defaultValue={seeItem && seeItem.seeItem.item.contents} />
          {errors.contents?.message && <Message>{errors.contents?.message}</Message>}
        </label>
        <Button className="submitBtn" type="submit" disabled={updateItemLoading || seeCategoriesLoading || seeItemLoading}>
          {updateItemLoading ? '상품 수정 중...' : '상품 수정'}
        </Button>
      </form>
    </Container>
  );
}

export default EditItem;
