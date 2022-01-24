import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {

  return (<Router>
    <Routes>
      <Route exact path = "/" element = {<Home />} />
      <Route exact path = "/product_list" element = {<ProductList />} />
      <Route exact path = "/product/:id" element = {<Product />} />
      <Route exact path = "/register" element = {<Register />} />
      <Route exact path = "/login" element = {<Login />} />



    </Routes>
  </Router>);

  // return <Home/>;
};

export default App;