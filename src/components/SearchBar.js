import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 550px;
  height: 50px;
  border: solid 3px #4374d9;
  padding: 0px 15px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  margin-left: 10px;
  height: 50px;
  width: 70px;
  border: solid 3px #4374d9;
  background-color: #4374d9;
  color: white;
  font-size: 17px;
  cursor: pointer;
`;

const Conditions = styled.div``;

function SearchBar({ initialTerm, initialCategoryId, categories, categoriesLoading }) {
  const history = useHistory();
  const [term, setTerm] = useState(initialTerm);
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const onSearchBtnClick = e => {
    e.preventDefault();
    history.push(`/search?${generateQueryStrings()}`);
  };

  const generateQueryStrings = () => {
    let queryStrings = '';
    if (term !== '') {
      queryStrings += `term=${term}&`;
    }
    if (categoryId !== '') {
      queryStrings += `categoryId=${categoryId}&`;
    }
    if (minPrice !== '') {
      queryStrings += `minPrice=${minPrice}&`;
    }
    if (maxPrice !== '') {
      queryStrings += `maxPrice=${maxPrice}&`;
    }
    return queryStrings;
  };

  return (
    <Container>
      <Form onSubmit={onSearchBtnClick}>
        <select name="categoryId" value={categoryId} onChange={({ target: { value } }) => setCategoryId(value)}>
          <option value="">전체</option>
          {categories &&
            categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
        <Input type="text" placeholder="검색어 입력" value={term} onChange={({ target: { value } }) => setTerm(value)} />
        <Button type="submit">검색</Button>
      </Form>
      <Conditions></Conditions>
    </Container>
  );
}

export default SearchBar;
