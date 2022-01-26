import { useEffect, useState } from "react";
import styled from "styled-components";
import { baseURL } from "../data";
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat, col, size, sort}) => {

  const [products, setProducts] = useState(() => []);
  const [filteredProducts, setFilteredProducts] = useState(() => []);

  useEffect(() => {
    let url = `${baseURL}products`;
    cat ? url += `?category=${cat}` : url+='';
    fetch(url).then(response => response.json()).then(json => setProducts(json));
    console.log("Fetching");
  }, [cat]);

  useEffect(() => {
    if(col){
      setFilteredProducts((old) => products.filter((item) => col === "default" || item.color.some(item => item.toLowerCase() === col)));
    }
    else
      setFilteredProducts(products);

    if(size)
      setFilteredProducts((old) => old.filter((item) => size === "default" || item.size.includes(size)));
  }, [col, products, size]);

  useEffect(() => {
    console.log("kutta", sort.toLowerCase());
    if (sort === "newest") {
      setFilteredProducts((prev) => [...prev].sort((a, b) =>  a._id > b._id ? 1:-1));
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {filteredProducts.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Products;
