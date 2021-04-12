import React from 'react';
import './css/SignUp.css';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  form {
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140vh;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 25px;
  margin-bottom: 20px;
`;

const Select = styled.select`
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

const Select_month = styled(Select)`
  width: 125px;
  margin-left: 10px;
  margin-right: 10px;
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

const Message = styled.div`
  font-size: 13px;
  margin-bottom: 10px;
  margin-top: -10px;
  color: #ff4848;
`;

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      password: '',
      name: '',
      email: '',
      birthday: '',
      phone: '',
      idChecked: false,
      pwChecked: false,
      repwChecked: false,
      nameChecked: false,
      emailChecked: false,
      phoneChecked: false,
      birthdayChecked: false,
      idError: '',
      nameError: '',
      pwError: '',
      repwError: '',
      emailError: '',
      phoneError: '',
      birthdayError: '',
      idInputColor: '#b8b8b8',
      pwInputColor: '#b8b8b8',
      repwInputColor: '#b8b8b8',
      nameInputColor: '#b8b8b8',
      bdInputColor: '#b8b8b8',
      emInputColor: '#b8b8b8',
      pnInputColor: '#b8b8b8',
    };
  }

  onSubmit = e => {
    e.preDefault();
    console.log('사용자 Email :', this.state.email);
    console.log('사용자 Password :', this.state.password);
  };

  idInputCheck = event => {
    //이메일 형식
    //아이디 유효성 검사
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    this.setState({ id: event.target.value });
    if (regExp.test(event.target.value)) {
      this.setState({ idChecked: true }, () => this.idMessage());
    } else {
      this.setState({ idChecked: false }, () => this.idMessage());
    }
  };

  pwInputCheck = event => {
    //8~16자 영문 대 소문자, 숫자, 특수문자, 비밀번호 유효성 검사
    this.setState({ password: event.target.value });
    const regExp = /^(?=.*[a-zA-Z])(?=.*[\~\․\!\@\#\$\%\^\&\*\(\)\_\-\+\=\[\]\|\\\;\:\\'\"\<\>\,\.\?\/])(?=.*[0-9]).{8,16}$/;
    if (regExp.test(event.target.value)) {
      this.setState({ password: event.target.value, pwChecked: true }, () => this.pwMessage());
    } else {
      this.setState({ pwChecked: false }, () => this.pwMessage());
    }
  };

  RepwInputCheck = () => {
    //입력한 비밀번호와 맞는 지 확인
    //this.setState({ password: event.target.value });
    const objPwd = document.getElementById('pwd'); //비밀번호
    const objPwd2 = document.getElementById('pwd2'); //비밀번호확인
    if (objPwd2.value === objPwd.value) {
      this.setState({ repwChecked: true }, () => this.repwMessage());
    } else {
      this.setState({ repwChecked: false }, () => this.repwMessage());
    }
  };

  //한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)
  NameInputCheck = event => {
    //한글이랑 영어입력
    this.setState({ name: event.target.value });
    const nameRegExp = /^[가-힣a-zA-Z]{2,15}$/;
    if (nameRegExp.test(event.target.value)) {
      this.setState({ name: event.target.value, nameChecked: true }, () => this.nameMessage());
    } else {
      this.setState({ nameChecked: false }, () => this.nameMessage());
    }
  };

  //생년월일 입력 체크 (8자리 양식에 맞게)
  birthdayInputCheck = event => {
    var regExp = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
    this.setState({ birthday: event.target.value });
    if (regExp.test(event.target.value)) {
      this.setState({ birthdayChecked: true }, () => this.birthdayMessage());
    } else {
      this.setState({ birthdayChecked: false }, () => this.birthdayMessage());
    }
  };

  //이메일 양식에 맞게 입력했는지 체크
  emailInputCheck = event => {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    this.setState({ email: event.target.value });
    if (regExp.test(event.target.value)) {
      this.setState({ emailChecked: true }, () => this.emailMessage());
    } else {
      this.setState({ emailChecked: false }, () => this.emailMessage());
    }
  };

  //전화번호 제대로 입력했는지 체크
  phoneInputCheck = event => {
    var regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    this.setState({ phone: event.target.value });
    if (regExp.test(event.target.value)) {
      this.setState({ phoneChecked: true }, () => this.phoneMessage());
    } else {
      this.setState({ phoneChecked: false }, () => this.phoneMessage());
    }
  };

  //==========양식에 맞지 않으면 오류메시지 출력 및 입력창 테두리 색 변경===========//

  idMessage = () => {
    //아이디의 배경색을 바꾸는 코드
    if (this.state.idChecked) {
      this.setState({ idError: '' });
      this.setState({ idInputColor: '#4374d9' });
    } else {
      this.setState({ idInputColor: '#FF4848' });
      this.setState({ idError: '이메일 형식에 맞게 입력하세요.' });
    }
  };

  nameMessage = () => {
    //이름의 배경색을 바꾸는 코드
    if (this.state.nameChecked) {
      this.setState({ nameError: '' });
      this.setState({ nameInputColor: '#4374d9' });
    } else {
      this.setState({ nameInputColor: '#FF4848' });
      this.setState({ nameError: '한글 또는 영어만 입력하세요' });
    }
  };

  pwMessage = () => {
    //비밀번호의 배경색을 바꾸는 코드
    if (this.state.pwChecked) {
      this.setState({ pwError: '' });
      this.setState({ pwInputColor: '#4374d9' });
    } else {
      this.setState({ pwInputColor: '#FF4848' });
      this.setState({ pwError: '8~16자 영문 대 소문자, 숫자, 특수문자만 사용하세요' });
    }
  };

  repwMessage = () => {
    //비밀번호 재확인 코드
    if (this.state.repwChecked) {
      this.setState({ repwError: '' });
      this.setState({ repwInputColor: '#4374d9' });
    } else {
      this.setState({ repwInputColor: '#FF4848' });
      this.setState({ repwError: '비밀번호가 일치하지 않습니다.' });
    }
  };

  //생년월일 양식 체크 메시지출력, 테두리색 변경
  birthdayMessage = () => {
    if (this.state.birthdayChecked) {
      this.setState({ birthdayError: '' });
      this.setState({ bdInputColor: '#4374d9' });
    } else {
      this.setState({ birthdayError: '생년월일을 정확히 입력하세요.' });
      this.setState({ bdInputColor: '#FF4848' });
    }
  };

  //이메일 양식 체크 메시지출력, 테두리색 변경
  emailMessage = () => {
    if (this.state.emailChecked) {
      this.setState({ emailError: '' });
      this.setState({ emInputColor: '#4374d9' });
    } else {
      this.setState({ emailError: '이메일 형식에 맞게 입력하세요.' });
      this.setState({ emInputColor: '#FF4848' });
    }
  };

  //휴대폰번호 양식 체크 메시지출력, 테두리색 변경
  phoneMessage = () => {
    if (this.state.phoneChecked) {
      this.setState({ phoneError: '' });
      this.setState({ pnInputColor: '#4374d9' });
    } else {
      this.setState({ phoneError: '번호를 정확하게 입력하세요.' });
      this.setState({ pnInputColor: '#FF4848' });
    }
  };

  onlyNumber = e => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  render() {
    return (
      <Wrapper>
        <Container>
          <Title>회원가입</Title>
          <form>
            <label>
              <Text>아이디</Text>
              <input
                placeholder="아이디를 입력하세요 (이메일)"
                type="text"
                style={{ borderColor: this.state.idInputColor }}
                onChange={this.idInputCheck}
              />
              <Message>{this.state.idError}</Message>
            </label>
            <label>
              <Text>비밀번호</Text>
              <input
                placeholder="영문 대소문자, 숫자, 특수문자를 포함한 8~16자리"
                type="password"
                id="pwd"
                style={{ borderColor: this.state.pwInputColor }}
                onChange={this.pwInputCheck}
              />
              <Message>{this.state.pwError}</Message>
            </label>
            <label>
              <Text>비밀번호 확인</Text>
              <input
                placeholder="비밀번호 재입력"
                type="password"
                id="pwd2"
                style={{ borderColor: this.state.repwInputColor }}
                onChange={this.RepwInputCheck}
              />
              <Message>{this.state.repwError}</Message>
            </label>
            <label>
              <Text>이름</Text>
              <input
                type="text"
                placeholder="이름을 입력하세요"
                id="name"
                style={{ borderColor: this.state.nameInputColor }}
                onChange={this.NameInputCheck}
              />
              <Message>{this.state.nameError}</Message>
            </label>
            <label>
              <Text>생년월일</Text>
              <input
                type="text"
                placeholder=" 생년월일 8자리를 입력하세요 (ex. 19981111)"
                style={{ borderColor: this.state.bdInputColor }}
                onChange={this.birthdayInputCheck}
              />
              <Message>{this.state.birthdayError}</Message>
            </label>
            <label>
              <Text>성별</Text>
              <Select>
                <option value="" selected disabled hidden>
                  성별
                </option>
                <option value="male">남자</option>
                <option value="female">여자</option>
                <option value="null">선택안함</option>
              </Select>
            </label>
            <label>
              <Text>이메일</Text>
              <input
                type="text"
                placeholder="이메일을 입력하세요"
                styled={{ border: this.state.borderColor }}
                style={{ borderColor: this.state.emInputColor }}
                onChange={this.emailInputCheck}
              />
              <Message>{this.state.emailError}</Message>
            </label>
            <label>
              <Text>휴대전화</Text>
              <input
                type="text"
                placeholder="전화번호를 입력하세요 ( - 제외)"
                style={{ borderColor: this.state.pnInputColor }}
                onChange={this.phoneInputCheck}
              />
              <Message>{this.state.phoneError}</Message>
            </label>
            <br></br>
            <Button className="submitBtn" type="submit">
              회원가입
            </Button>
          </form>
        </Container>
      </Wrapper>
    );
  }
}

export default SignUp;
