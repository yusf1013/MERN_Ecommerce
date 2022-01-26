import { Add, Remove } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { baseURL, popularProducts } from "../data";
import { useEffect, useState } from "react";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
  text-align: justify;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {

  const [product, setProduct] = useState(() => {});
  const id = useParams()['id'];

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    fetch(`${baseURL}products/find/${id}`).then(resp => resp.json()).then(json => setProduct(json))
    
  }, [id]);

  useEffect(() => {
    if(!product) return;
    
    setColor(product.color[0]);
    setSize(product.size[0]);
  }, [product]);

  const updateColor = x => {console.log(x); setColor(x)};
  const updateSize = x => {console.log(x.target.value, color); setSize(x.target.value)};
  

  // let id = useParams()['id'];
  // let product = popularProducts[parseInt(id)-1];


  return !product ? <Container></Container> : (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          {/* <Image src="https://i.ibb.co/S6qMxwr/jean.jpg" /> */}
          <Image src = {product['img']} />
        </ImgContainer>
        <InfoContainer>
          <Title> {product['title']} </Title>
          <Desc>
            {product['desc']}
          </Desc>
          <Price>$ {product['price']}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle >Color</FilterTitle>
              {product.color.map(item => <FilterColor color= {item} key = {item} onClick={() => updateColor(item)}/>)}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={updateSize} defaultValue={size}>
                {product.size.map((item) => <FilterSizeOption key={item}>{item}</FilterSizeOption>)}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => setQuantity((old) => Math.max(old-1, 1))} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => setQuantity((old) => old+1)}/>
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );

  // return product ? <Container> {product.title} </Container> : <Container></Container>;
  // return <Container>{product.title} </Container>;

};

export default Product;
