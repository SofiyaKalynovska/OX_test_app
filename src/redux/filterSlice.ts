import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  activeTab: "api" | "my"; 
  filters: {
    isPublished: boolean; 
  };
  limit: number; 
}

const initialState: FilterState = {
  activeTab: "api",
  filters: {
    isPublished: true, 
  },
  limit: 8,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<"api" | "my">) {
      state.activeTab = action.payload;
    },

    setFilter(
      state,
      action: PayloadAction<{
        key: keyof FilterState["filters"];
        value: boolean;
      }>
    ) {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },

    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },

    resetFilters(state) {
      state.filters = initialState.filters;
      state.limit = initialState.limit;
    },
  },
});

export const { setActiveTab, setFilter, setLimit, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
