import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { AppDispatch, RootState } from "../redux/store";

export const useFetchProducts = (limit: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector(
    (state: RootState) => state.products
  );

  const limitRef = useRef(limit);

  useEffect(() => {
    if (limit > 0 && limit !== limitRef.current) {
      limitRef.current = limit;
      dispatch(fetchProducts(limit));
    }
  }, [limit, dispatch]); 

  useEffect(() => {
    if (limit > 0) {
      dispatch(fetchProducts(limit)); 
    }
  }, [dispatch, limit]);

  return { products, status, error };
};
