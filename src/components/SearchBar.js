import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
`;
const Input = styled.input`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 550px;
  height: 50px;
  border: solid 3px #4374d9;
  padding 0px 15px;
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
`;
function SearchBar() {
  return (
    <Container>
      <Input type="text" placeholder="검색어 입력" />
      <Button type="submit">검색</Button>
    </Container>
  );
}

export default SearchBar;
