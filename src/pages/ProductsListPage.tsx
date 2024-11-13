import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { AppDispatch, RootState } from "../redux/store";
import ProductCard from "../components/ProductCard/ProductCard";
import { ProductListPaginationButton } from "../components/Buttons";
import { ProductCardSkeleton } from "../components/Skeletons";
import { Product } from "../api/products";

const useFetchProducts = (limit: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts(limit));
  }, [limit, dispatch]);

  return { products, status, error };
};

const ProductsListPage: React.FC = () => {
  const [limit, setLimit] = useState<number>(8);

  const { products, status, error } = useFetchProducts(limit);

  const handleLimitChange = useCallback((newLimit: number) => {
    setLimit(newLimit);
  }, []);

  const renderProducts = () => {
    if (status === "loading") {
      return (
        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: limit }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (status === "failed") {
      return <ErrorMessage message={error || "Failed to load products."} />;
    }

    if (products.length === 0) {
      return <p>No products available</p>;
    }

    return (
      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div className="products-list-page px-4 pb-8">

      <div className="mb-4 flex space-x-4 justify-end">
        <ProductListPaginationButton
          onClick={() => handleLimitChange(8)}
          active={limit === 8}
          label="8 Products"
        />
        <ProductListPaginationButton
          onClick={() => handleLimitChange(16)}
          active={limit === 16}
          label="16 Products"
        />
        <ProductListPaginationButton
          onClick={() => handleLimitChange(20)}
          active={limit === 20}
          label="All Products"
        />
      </div>

      {renderProducts()}
    </div>
  );
};

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-red-500 text-center mt-4">{message}</div>
);

export default ProductsListPage;
