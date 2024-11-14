import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchProductsFromApi,
  fetchProductDetailFromApi,
  Product,
} from "../api/products";

interface ProductsState {
  products: Product[];
  createdProducts: Product[]; 
  product: Product | null; 
  status: "idle" | "loading" | "succeeded" | "failed"; 
  error: string | null; 
}

const loadCreatedProductsFromLocalStorage = (): Product[] => {
  const products = localStorage.getItem("createdProducts");
  return products ? JSON.parse(products) : [];
};

const initialState: ProductsState = {
  products: [],
  createdProducts: loadCreatedProductsFromLocalStorage(),
  product: null,
  status: "idle",
  error: null,
};

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

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetCreatedProducts(state) {
      state.createdProducts = [];
    },
    setCreatedProducts(state, action: PayloadAction<Product[]>) {
      state.createdProducts = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.createdProducts.push(action.payload);
      localStorage.setItem(
        "createdProducts",
        JSON.stringify(state.createdProducts)
      );
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.createdProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        const updatedProduct = {
          ...state.createdProducts[index],
          ...action.payload,
        };

        if (updatedProduct.published === undefined) {
          updatedProduct.published = state.createdProducts[index].published;
        }

        state.createdProducts[index] = updatedProduct;

        localStorage.setItem(
          "createdProducts",
          JSON.stringify(state.createdProducts)
        );
      }
    },

    deleteProduct: (state, action: PayloadAction<number>) => {
      state.createdProducts = state.createdProducts.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem(
        "createdProducts",
        JSON.stringify(state.createdProducts)
      );
    },
  },
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

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  setCreatedProducts,
  resetCreatedProducts,
} = productSlice.actions;

export default productSlice.reducer;
