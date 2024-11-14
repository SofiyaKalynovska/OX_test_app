import React, { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setCreatedProducts } from "../redux/productSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Product } from "../api/products";

import { MyProductsTab } from "../components/MyProducts";
import { ProductListPaginationButton } from "../components/Buttons";
import { setActiveTab, setFilter, setLimit } from "../redux/filterSlice";
import { ProductCardSkeleton } from "../components/Skeletons";
import { Switch } from "../components/Switch";
import ProductCard from "../components/ProductCard/ProductCard";

const useFetchProducts = (limit: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (limit > 0) {
      dispatch(fetchProducts(limit));
    }
  }, [limit, dispatch]);

  return { products, status, error };
};

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-red-500 text-center mt-4">{message}</div>
);

const ProductsListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { createdProducts } = useSelector((state: RootState) => state.products);
  const { activeTab, filters, limit } = useSelector(
    (state: RootState) => state.filter
  );

  const savedProducts = useMemo(() => {
    return JSON.parse(localStorage.getItem("createdProducts") || "[]");
  }, []);

  useEffect(() => {
    dispatch(setCreatedProducts(savedProducts));
  }, [dispatch, savedProducts]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const publishedParam = searchParams.get("published");

    if (publishedParam !== null) {
      dispatch(
        setFilter({
          key: "isPublished",
          value: publishedParam === "true",
        })
      );
    }
  }, [dispatch]);

  const {
    products: fetchedProducts,
    status: fetchStatus,
    error: fetchError,
  } = useFetchProducts(limit);

  const handleLimitChange = useCallback(
    (newLimit: number) => {
      dispatch(setLimit(newLimit));
    },
    [dispatch]
  );

  const renderProducts = () => {
    if (fetchStatus === "loading") {
      return (
        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: limit }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (fetchStatus === "failed") {
      return (
        <ErrorMessage message={fetchError || "Failed to load products."} />
      );
    }

    if (fetchedProducts.length === 0 && createdProducts.length === 0) {
      return <p>No products available</p>;
    }

    if (activeTab === "api") {
      return (
        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {fetchedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      );
    }

    if (activeTab === "my") {
      const filteredProducts = createdProducts.filter(
        (product) => product.published === filters.isPublished
      );
      return <MyProductsTab products={filteredProducts} />;
    }
  };

  return (
    <div className="products-list-page px-4 pb-8">
      <div className="flex border-b-2 mb-6">
        <div
          onClick={() => dispatch(setActiveTab("api"))}
          className={`flex-1 py-4 text-center cursor-pointer text-lg font-semibold transition-all duration-300 ${
            activeTab === "api"
              ? "bg-blue-500 text-white border-b-4 border-white shadow-lg"
              : "hover:bg-gray-100"
          }`}
        >
          API Products
        </div>
        <div
          onClick={() => dispatch(setActiveTab("my"))}
          className={`flex-1 py-4 text-center cursor-pointer text-lg font-semibold transition-all duration-300 ${
            activeTab === "my"
              ? "bg-blue-500 text-white border-b-4 border-white shadow-lg"
              : "hover:bg-gray-100"
          }`}
        >
          My Products
        </div>
      </div>

      {activeTab === "api" && (
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
      )}

      {activeTab === "my" && (
        <div className="mb-4 flex justify-between items-center">
          <Switch
            label="Show Published Products Only"
            checked={filters.isPublished}
            onChange={() =>
              dispatch(
                setFilter({ key: "isPublished", value: !filters.isPublished })
              )
            }
          />
        </div>
      )}

      {renderProducts()}
    </div>
  );
};

export default ProductsListPage;
