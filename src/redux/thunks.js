import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchListProducts, addNewProduct, deleteItem, updateProduct } from '../services/productsAPI';

export const fetchProducts = createAsyncThunk('products/fetchListproducts', async () => {
    const response = await fetchListProducts();
    return response;
});

export const postAddNewProduct = createAsyncThunk(
    'products/addNewProduct',
    async (newProduct) => {
        const response = await addNewProduct(newProduct);
        return response;
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id) => {
        const response = await deleteItem(id)
        return response;
    }
);

export const putUpdateProduct = createAsyncThunk(
    'products/putUpdateProduct',
    async (updatedProduct) => {
      const response = await updateProduct(updatedProduct);
      return response;
    }
  );
  