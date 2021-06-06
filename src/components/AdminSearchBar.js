import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  margin: 20px;
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

const Radio = styled.input`
  margin: 0 4px;
  padding: 0px 15px;
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

function AdminSearchBar({ initialTerm, initialMinPrice, initialMaxPrice, initialSortMethod }) {
  const history = useHistory();
  const [term, setTerm] = useState(initialTerm || null);
  const [minPrice, setMinPrice] = useState(initialMinPrice || null);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice || null);
  const [sortMethod, setSortMethod] = useState(initialSortMethod || null);
  const MAX_INT = 2147483647;

  const onSearchBtnClick = e => {
    if (maxPrice > MAX_INT) {
      window.alert('최대 가격을 초과하였습니다.');
    }
    else{
      e.preventDefault();
    history.push(`?${generateQueryStrings()}`);
    }
  };

  const generateQueryStrings = () => {
    let queryStrings = '';
    if (term && term !== '') {
      queryStrings += `term=${term}&`;
    }
    if (minPrice && minPrice !== '') {
      queryStrings += `minPrice=${minPrice}&`;
    }
    if (maxPrice && maxPrice !== '') {
      queryStrings += `maxPrice=${maxPrice}&`;
    }
    if (sortMethod && sortMethod !== '') {
      queryStrings += `sortMethod=${sortMethod}&`;
    }
    return queryStrings;
  };

  return (
    <Container>
      <Form onSubmit={onSearchBtnClick}>
        <Input type="text" placeholder="검색어 입력" value={term} onChange={({ target: { value } }) => setTerm(value)} />
        <Button type="submit">검색</Button>
      </Form>
      <Conditions>
        <PriceInput type="number" placeholder="최소 금액" value={minPrice} onChange={({ target: { value } }) => setMinPrice(value)} />
        {' ~ '}
        <PriceInput type="number" placeholder="최대 금액" value={maxPrice} onChange={({ target: { value } }) => setMaxPrice(value)} />
        <Radio type="radio" name="sortMethod" id="PRICE_LOW" value="PRICE_LOW" onChange={({ target: { value } }) => setSortMethod(value)} />
        <label htmlFor="PRICE_LOW">저가격순</label>
        <Radio
          type="radio"
          name="sortMethod"
          id="PRICE_HIGH"
          value="PRICE_HIGH"
          onChange={({ target: { value } }) => setSortMethod(value)}
        />
        <label htmlFor="PRICE_HIGH">고가격순</label>
      </Conditions>
    </Container>
  );
}

export default AdminSearchBar;
