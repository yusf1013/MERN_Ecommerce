import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({filters, sort }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}products`);
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.log("Sth hap", err);
        console.log("Error: ", `${BASE_URL}products`);
      }
    };
    getProducts();

  }, [])

  useEffect(() => {

    if(!products || !filters) return;
    
    let fp = products.filter((item) =>
      Object.entries(filters).every(([key, value]) =>
        item[key].includes(value) || key.toLowerCase() === value.toLowerCase()
      )
    );

    setFilteredProducts(
      fp
    );
  }, [products, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt > b.createdAt ? 1:-1)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort, filters]);

  return (
    <Container>
      {filteredProducts.map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
