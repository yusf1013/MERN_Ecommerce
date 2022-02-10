import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
// import { BASE_URL } from "../data";

const BASE_URL = process.env.REACT_APP_BASE_URL;

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
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `${BASE_URL}products?category=${cat}`
            : `${BASE_URL}products`
        );
        setProducts(res.data);
        console.log("YO", res.data);

      } catch (err) {
        console.log("Sth hap", err);
        console.log("Error: ", `${BASE_URL}products`);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    const filters = async () => {
      let cols = [];
      let s = [];
      if(!products) return;
      products.forEach(item => {
        item['color'].forEach(element => {
            if(cols.indexOf(element.toLowerCase()) === -1) cols.push(element.toLowerCase());
        });

        item['size'].forEach(element => {
          if(s.indexOf(element.toLowerCase()) === -1) s.push(element.toLowerCase());
      });
      });
      setColors(cols);
      setSizes(s);
    };
    filters();
  }, [products]);


  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  console.log("IN p list");

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option >Color</Option>
            {colors.map(color => <Option key={color}>{color.charAt(0).toUpperCase() + color.substr(1)}</Option>)}
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option >Size</Option>
            {sizes.map(size => <Option key={size}>{size.toUpperCase()}</Option>)}
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products filters={filters} sort={sort} products = {products} key = {"products[0]._id"}/>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
