import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  margin: 30px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Input = styled.input`
  font-size: 18px;
  width: 550px;
  height: 50px;
  margin: 0 10px;
  border: solid 3px #4374d9;
  padding: 0px 15px;
  &:focus {
    outline: none;
  }
`;

const Select = styled.select`
  width: 100px;
  height: 50px;
  font-size: 18px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  height: 50px;
  width: 70px;
  border: solid 3px #4374d9;
  background-color: #4374d9;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;

const Conditions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PriceInput = styled.input`
  width: 120px;
  height: 30px;
  margin: 0 10px;
  &:focus {
    outline: none;
  }
`;

function SearchBar({ initialTerm, initialCategoryId, initialMinPrice, initialMaxPrice, categories, categoriesLoading }) {
  const history = useHistory();
  const [term, setTerm] = useState(initialTerm || null);
  const [categoryId, setCategoryId] = useState(initialCategoryId || null);
  const [minPrice, setMinPrice] = useState(initialMinPrice || null);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice || null);

  const onSearchBtnClick = e => {
    e.preventDefault();
    history.push(`/search?${generateQueryStrings()}`);
  };

  const generateQueryStrings = () => {
    let queryStrings = '';
    if (term && term !== '') {
      queryStrings += `term=${term}&`;
    }
    if (categoryId && categoryId !== '') {
      queryStrings += `categoryId=${categoryId}&`;
    }
    if (minPrice && minPrice !== '') {
      queryStrings += `minPrice=${minPrice}&`;
    }
    if (maxPrice && maxPrice !== '') {
      queryStrings += `maxPrice=${maxPrice}&`;
    }
    return queryStrings;
  };

  return (
    <Container>
      <Form onSubmit={onSearchBtnClick}>
        <Select name="categoryId" value={categoryId} onChange={({ target: { value } }) => setCategoryId(value)}>
          <option value="">전체</option>
          {!categoriesLoading &&
            categories &&
            categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </Select>
        <Input type="text" placeholder="검색어 입력" value={term} onChange={({ target: { value } }) => setTerm(value)} />
        <Button type="submit">검색</Button>
      </Form>
      <Conditions>
        <PriceInput type="number" placeholder="최소 금액" value={minPrice} onChange={({ target: { value } }) => setMinPrice(value)} />
        {' ~ '}
        <PriceInput type="number" placeholder="최대 금액" value={maxPrice} onChange={({ target: { value } }) => setMaxPrice(value)} />
      </Conditions>
    </Container>
  );
}

export default SearchBar;
