import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import filterReducer from "./filterSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
