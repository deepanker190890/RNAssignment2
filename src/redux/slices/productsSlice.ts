import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_AUTH_URL } from '../../api/apiConstants';

//request
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
}
//Initial state for request as slice and same will be used in reducer to align response
interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  page: number;
  total: number;
  search: string;
  category: string;
}
//Response
interface FetchProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
//whatever we want to send in API request
const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  page: 0,
  total: 0,
  search: '',
  category: '',
};
//manage async actions outside the slice and handle all api logic
export const fetchProducts = createAsyncThunk<
  FetchProductsResponse,
  { page: number; limit: number; search?: string; category?: string }
>(
  'products/fetchProducts',
  async ({
    //because we are providing respone object and there we have page and limit structure so inside async we can destructure it directly
    page,
    limit,
    search,
    category,
  }) => {
      let url = '';

    if (search) {
      url = `${API_BASE_AUTH_URL}/products/search?q=${search}&limit=${limit}&skip=${page * limit}`;
    } else if (category) {
      url = `${API_BASE_AUTH_URL}/products/category/${category}?limit=${limit}&skip=${page * limit}`;
    } else {
      url = `${API_BASE_AUTH_URL}/products?limit=${limit}&skip=${page * limit}`;
    }
     console.log('[API REQUEST]', url); 
    const response = await axios.get(url);
    console.log('[API RESPONSE]', response.data);
    return response.data;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 0; // reset pagination
      state.products = []; //reset products when search changes
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
      state.page = 0;
      state.products = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (state.page === 0) {
          // On new search/category, replace products
          state.products = action.payload.products;
        } else {
          // On pagination, append products
          state.products = [...state.products, ...action.payload.products];
        }
        state.total = action.payload.total;
        state.page += 1; // increment page for next fetch
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setSearch, setCategory } = productsSlice.actions;
export default productsSlice.reducer;

//without type script respone we use thunk like below
//Here destructuring mention directly insie async function but for typescript we need to
// provide type for respone and request structure on top
// Async thunk to fetch products
// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async ({ page, limit, search, category }: { page: number; limit: number; search?: string; category?: string }) => {
//     let url = `https://dummyjson.com/products?limit=${limit}&skip=${page * limit}`;
//     if (search) url += `&q=${search}`;
//     if (category) url += `&category=${category}`;
//     const response = await axios.get(url);
//     return response.data;
//   }
// );
