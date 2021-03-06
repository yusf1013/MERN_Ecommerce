import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../redux/userRedux";
import { useDispatch } from "react-redux";
import LoginRequired from "./LoginRequired";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;


const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity);
  const history = useHistory();
  const user = useSelector((state) => state.user.currentUser); 
  const dispatch = useDispatch();

  const cartClick = () => {
    console.log("I am a cube!");
    history.push("/cart");
    // if(user)
    // {
    //     history.push("/cart");
    //     return;
    // }

    // setIsOpen(true);
  }

  return (
    <>
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo onClick={() => history.push("/")}>ONE-STOP.</Logo>
        </Center>
        <Right>
          {!user ? <MenuItem onClick={() => history.push("/register")}>REGISTER</MenuItem> : <MenuItem>MY ACCOUNT</MenuItem>}
          {!user ? <MenuItem onClick={() => history.push("/login")}>SIGN IN</MenuItem> : <MenuItem onClick={() => {console.log("Shit"); dispatch(logout())}}>LOGOUT</MenuItem>}
          
          <LoginRequired child = {
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          } 
          onClick = {()=> cartClick()}>
          </LoginRequired>

          {/* <MenuItem onClick={cartClick}>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem> */}

        </Right>
      </Wrapper>
    </Container>

    {/* <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <LoginComp title = "SIGN IN TO CONTINUE"></LoginComp>
    </Modal> */}
    </>
  );
};

export default Navbar;
