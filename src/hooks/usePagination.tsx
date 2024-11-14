import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLimit } from "../redux/filterSlice";
import { RootState } from "../redux/store";

export const usePagination = () => {
  const dispatch = useDispatch();
  const { limit } = useSelector((state: RootState) => state.filter);

  const handleLimitChange = useCallback(
    (newLimit: number) => {
      dispatch(setLimit(newLimit));
    },
    [dispatch]
  );

  return { handleLimitChange, limit };
};
