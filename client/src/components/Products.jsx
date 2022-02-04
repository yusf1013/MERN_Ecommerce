import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({products, cat, filters, sort }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const res = await axios.get(
  //         cat
  //           ? `${BASE_URL}products?category=${cat}`
  //           : `${BASE_URL}products`
  //       );
  //       setProducts(res.data);
  //     } catch (err) {}
  //   };
  //   getProducts();
  // }, [cat]);

  useEffect(() => {
    console.log("Filter data:", filters);

    if(!products) return;
    
    let fp = products.filter((item) =>
      Object.entries(filters).every(([key, value]) =>
        item[key].includes(value) || key.toLowerCase() === value.toLowerCase()
      )
    );

    setFilteredProducts(
      fp
    );
  }, [products, cat, filters]);

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
  }, [sort]);

  return (
    <Container>
      {filteredProducts.map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
