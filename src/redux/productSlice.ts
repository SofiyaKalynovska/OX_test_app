import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsFromApi, fetchProductDetailFromApi, Product } from "../api/products";

interface ProductsState {
  products: Product[];
  product: Product | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}


export const fetchProducts = createAsyncThunk<Product[], number>(
  "products/fetchProducts",
  async (limit) => {
    return await fetchProductsFromApi(limit); 
  }
);


export const fetchProductDetail = createAsyncThunk<Product, number>(
  "products/fetchProductDetail",
  async (id) => {
    return await fetchProductDetailFromApi(id);
  }
);

const initialState: ProductsState = {
  products: [],
  product: null,
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchProductDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch product details";
      });
  },
});

export default productSlice.reducer;
