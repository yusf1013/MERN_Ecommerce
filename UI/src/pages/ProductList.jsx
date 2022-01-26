import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useState } from "react";
import { useLocation } from "react-router";


const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {

  const cat = useLocation().pathname.split("/")[2];
  
  const [col, setCat] = useState(null);
  const updateCat = x => setCat(x.target.value);

  const [size, setSize] = useState(null);
  const updateSize = x => setSize(x.target.value);

  const [sort, setSort] = useState("newest");
  const updateSort = x => setSort(x.target.value);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select defaultValue={'default'} onChange={updateCat}>
            <Option value = "default">Color</Option>
            <Option value = "white">White</Option>
            <Option value = "black">Black</Option>
            <Option value = "red">Red</Option>
            <Option value = "blue">Blue</Option>
            <Option value = "yellow">Yellow</Option>
            <Option value = "green">Green</Option>
          </Select>
          <Select defaultValue={'Size'} onChange={updateSize}>
            <Option  value = "default" > Size </Option>
            <Option>XXL</Option>
            <Option>XL</Option>
            <Option>L</Option>
            <Option>M</Option>
            <Option>S</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select defaultValue={'newest'} onChange={updateSort}>
            <Option value = "newest">Newest</Option>
            <Option value = "asc">Price (asc)</Option>
            <Option value = "desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat = {cat} col={col} size={size} sort={sort}/>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
