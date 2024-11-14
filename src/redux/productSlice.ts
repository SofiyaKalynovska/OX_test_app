import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchProductsFromApi,
  fetchProductDetailFromApi,
  Product,
  deleteProductFromApi,
  updateProductInApi,
  createProductInApi,
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
  async (limit) => fetchProductsFromApi(limit)
);

export const fetchProductDetail = createAsyncThunk<Product, number>(
  "products/fetchProductDetail",
  async (id) => fetchProductDetailFromApi(id)
);

export const createNewProduct = createAsyncThunk<Product, Omit<Product, "id">>(
  "products/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const result = await createProductInApi(product);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(
        "Sorry, something went wrong and your product did not added to list"
      );
    }
  }
);

export const updateExistingProduct = createAsyncThunk<
  Product,
  Product,
  { rejectValue: string }
>("products/updateProduct", async (product, { rejectWithValue }) => {
  try {
    const result = await updateProductInApi(product);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Failed to update product");
  }
});

export const deleteProduct = createAsyncThunk<
  { id: number } | undefined,
  number,
  { rejectValue: string }
>("products/deleteProduct", async (id: number, { rejectWithValue }) => {
  try {
    const result = await deleteProductFromApi(id);
    if (result) {
      return { id };
    }
    return undefined;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});


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
    removeProduct: (state, action: PayloadAction<number>) => {
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
      })
      .addCase(createNewProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.createdProducts.push(action.payload);
        localStorage.setItem(
          "createdProducts",
          JSON.stringify(state.createdProducts)
        );
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateExistingProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateExistingProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.createdProducts.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.createdProducts[index] = action.payload;
          localStorage.setItem(
            "createdProducts",
            JSON.stringify(state.createdProducts)
          );
        }
      })
      .addCase(updateExistingProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const payload = action.payload;
        if (payload && payload.id) {
          state.createdProducts = state.createdProducts.filter(
            (product) => product.id !== payload.id
          );
          localStorage.setItem(
            "createdProducts",
            JSON.stringify(state.createdProducts)
          );
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {
  addProduct,
  updateProduct,
  removeProduct,
  setCreatedProducts,
  resetCreatedProducts,
} = productSlice.actions;

export default productSlice.reducer;
