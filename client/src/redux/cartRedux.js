import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.total = state.products.reduce((a, b) => a + b.quantity * b.price, 0);
      state.quantity = state.products.length;
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
  },
});

export const { addProduct, increaseProduct,  decreaseProduct} = cartSlice.actions;
export default cartSlice.reducer;
