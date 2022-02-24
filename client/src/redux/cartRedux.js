import { createSlice } from "@reduxjs/toolkit";


// import axios from "axios";
// const BASE_URL = process.env.REACT_APP_BASE_URL;
// const updateCart = (state) => {
//   const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
//   const currentUser = user && JSON.parse(user).currentUser;
//   if(!currentUser) return;

//   console.log("Cart: ", currentUser.accessToken);
//   // userRequest.post("/carts", {
//   //   owner: currentUser._id,
//   //   products: state.products,
//   //   quantity: state.quantity,
//   //   total: state.total,
//   // })
//   try {
//     axios.put(`${BASE_URL}carts/${currentUser._id}`, {
//       userId: currentUser._id,
//       products: state.products,
//       quantity: state.quantity,
//       total: state.total,
//     }, {
//       headers: {'Authorization': `Bearer ${currentUser.accessToken}`}
//     });
//   } catch (err) {
//     console.log("Sth hap", err);
//     console.log("Error: ", `${BASE_URL}products`);
//   }
// }

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      let added = false;
      state.products.forEach((item) => {
        if(item._id === action.payload._id && item.color === action.payload.color && item.size === action.payload.size) 
        { 
          item.quantity += 1;
          added = true;
        }
      });

      if(!added){
        state.products.push(action.payload);
        state.quantity = state.products.length;
      }

      state.total = state.products.reduce((a, b) => a + b.quantity * b.price, 0);

      // updateCart(state);
    },

    increaseProduct: (state, action) => {
      state.products.forEach((item) => {
        if(item._id === action.payload._id) 
        { 
          item.quantity += 1;
        }
      });
      state.total = state.products.reduce((a, b) => a + b.quantity * b.price, 0);
    },

    decreaseProduct: (state, action) => {
      for(let i = 0; i < state.products.length; i++){
        let item = state.products[i];
        if(item._id === action.payload._id) 
        { 
          item.quantity -= 1;
          state.total -= action.payload.price;

          if(item.quantity === 0)
          {
            state.products.splice(i, 1);
            state.quantity = state.products.length;
            break;
          }
        }
      }
      state.total = state.products.reduce((a, b) => a + b.quantity * b.price, 0);
    },

    clearCart: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    }
  },
});

export const { addProduct, increaseProduct,  decreaseProduct, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
