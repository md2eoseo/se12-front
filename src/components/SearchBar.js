import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
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

function SearchBar() {
  const history = useHistory();
  const [term, setTerm] = useState('');

  const onSearchBtnClick = e => {
    e.preventDefault();
    history.push(`/search?term=${term}`);
  };

  return (
    <Container>
      <Form onSubmit={onSearchBtnClick}>
        <Input type="text" placeholder="검색어 입력" onChange={({ target: { value } }) => setTerm(value)} />
        <Button type="submit">검색</Button>
      </Form>
    </Container>
  );
}

export default SearchBar;
