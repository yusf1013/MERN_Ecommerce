import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { register } from "../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Error = styled.div`
  color: red;
  margin-top: 20px;
`;

const Register = () => {
  // const { isFetching, error } = useSelector((state) => state.user);
  // const [user, setUser] = useState();
  const [em, setEm] = useState(null);
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();

    if(e.target[4].value !== e.target[5].value) {setEm("Passwords don't match!"); return;}
    else setEm(null);

    let res = await register(dispatch, {
      'username': e.target[2].value,
      'email': e.target[3].value,
      'password': e.target[4].value
    });

    if(res) setEm(null);
    else setEm("Something went wrong!");
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleClick}>
          <Input placeholder="name" />
          <Input placeholder="last name" />
          <Input placeholder="username" />
          <Input placeholder="email" />
          <Input placeholder="password" />
          <Input placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement> 
          <Button type="submit">CREATE</Button>
        </Form> 
        {em && <Error>{em}</Error>}
      </Wrapper>
    </Container>
  );
};

export default Register;
