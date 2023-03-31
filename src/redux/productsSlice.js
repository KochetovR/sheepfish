import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, postAddNewProduct, deleteProduct, putUpdateProduct } from './thunks';

const initialState = {
  listProducts: [],
  filter: '',
  status: 'idle',
  message: null,
}
  
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilterValue: (state, {payload}) => {
      state.filter = payload
    },
    deleteItem: (state, {payload}) => {
      state.listProducts = state.listProducts.filter(g => g.id !== payload)
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, {payload}) => {
        state.status = 'succeeded';
        state.listProducts = payload;
      })
      .addCase(fetchProducts.rejected, (state, {error}) => {
        state.status = 'failed';
        state.error = error.message;
        state.message = 'Операцію відхилено, спробуйте ще раз'
      })
      .addCase(postAddNewProduct.fulfilled, (state, {payload} ) => {
        state.listProducts.push(payload);
        state.message = 'Операція успішна'
      })
      .addCase(postAddNewProduct.rejected, (state, {error}) => {
        state.status = 'failed';
        state.error = error.message;
        state.message = 'Операцію відхилено, спробуйте ще раз'
      })
      .addCase(deleteProduct.fulfilled, (state, {payload}) => {
        state.listProducts = state.listProducts.filter(p => p.id !== payload.id)
        state.message = 'Операція успішна'
      })
      .addCase(deleteProduct.rejected, (state, {error}) => {
        state.status = 'failed';
        state.error = error.message;
        state.message = 'Операцію відхилено, спробуйте ще раз'
      })
      .addCase(putUpdateProduct.fulfilled, (state, {payload}) => {
        const updatedProduct = payload;
        const index = state.listProducts.findIndex((product) => product.id === updatedProduct.id);
        if (index !== -1) {
          state.listProducts[index] = updatedProduct;
        }
        state.message = 'Операція успішна'
      })
      .addCase(putUpdateProduct.rejected, (state, {error}) => {
        state.status = 'failed';
        state.error = error.message;
        state.message = 'Операцію відхилено, спробуйте ще раз'
      });
  },
})
  
export const {
  setFilterValue,
  deleteItem,
  clearMessage,
  } = productsSlice.actions

export default productsSlice.reducer