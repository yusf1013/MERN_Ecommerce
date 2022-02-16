import styled from "styled-components";
import LoginComp from "../components/LoginComponent";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Pad = styled.div`
  width: 150%;
  background-color: white; 
  
`;

const Login = () => {
  
  return (
    <Container>
      <Pad></Pad>
      <LoginComp></LoginComp>
      <Pad></Pad>
    </Container>
    
  );
};

export default Login;
