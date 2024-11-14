import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { usePagination } from "../hooks/usePagination";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { MyProductsTab } from "../components/MyProducts";
import { ProductCardSkeleton } from "../components/Skeletons";
import ProductCard from "../components/ProductCard/ProductCard";
import { setActiveTab, setFilter, setLimit } from "../redux/filterSlice";
import { Product } from "../api/products";
import { Switch } from "../components/Switch";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import { RootState } from "../redux/store";
import { ProductListPaginationButton } from "../components/Buttons";
import { SearchBar } from "../components/SearchBar";

const ProductsListPage: React.FC = () => {
  const dispatch = useDispatch();
  const { createdProducts } = useSelector((state: RootState) => state.products);
  const { activeTab, filters, limit } = useSelector(
    (state: RootState) => state.filter
  );

  const { products: fetchedProducts, status, error } = useFetchProducts(limit);
  const { handleLimitChange } = usePagination();
  const { handleSearch } = useSearchQuery("");


  const filteredCreatedProducts = createdProducts.filter((product) =>
    filters.isPublished ? product.published : !product.published
  );

  console.log(
    "Filters:",
    filters,
    "filteredCreatedProducts:",
    filteredCreatedProducts
  );

  const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="mt-4 text-center text-red-500">{message}</div>
  );

  const renderProducts = () => {
    if (status === "loading") {
      return (
        <div className="gap-4 grid products-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: limit }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (status === "failed") {
      return <ErrorMessage message={error || "Failed to load products."} />;
    }

    if (fetchedProducts.length === 0 && createdProducts.length === 0) {
      return <p>No products available</p>;
    }

    if (activeTab === "api") {
      return (
        <div className="gap-4 grid products-grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
          {fetchedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      );
    }

    if (activeTab === "my") {
      return <MyProductsTab products={filteredCreatedProducts} />;
    }
  };

  useEffect(() => {
    if (limit === 0) {
      dispatch(setLimit(8));
    }
  }, [limit, dispatch]);

  return (
    <div className="b-8">
      <div className="flex mb-6 border-b">
        <div
          onClick={() => dispatch(setActiveTab("api"))}
          className={`flex-1 py-3 text-center cursor-pointer text-md font-semibold transition-all duration-300 ${
            activeTab === "api"
              ? "bg-gray-200 text-black border "
              : "hover:bg-gray-300"
          }`}
        >
          API Products
        </div>
        <div
          onClick={() => dispatch(setActiveTab("my"))}
          className={`flex-1 py-3 text-center cursor-pointer text-md font-semibold transition-all duration-300 ${
            activeTab === "my"
              ? "bg-gray-200 text-black border "
              : "hover:bg-gray-300"
          }`}
        >
          My Products
        </div>
      </div>

      {activeTab === "api" && (
        <div className="flex justify-end space-x-4 mb-4 px-6">
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
        <div>
          <div className="flex justify-between items-center mb-4 px-6 font-semibold">
            <Switch
              label="Show only published"
              checked={filters.isPublished}
              onChange={() =>
                dispatch(
                  setFilter({ key: "isPublished", value: !filters.isPublished })
                )
              }
            />
            <div className="flex gap-2">
              <SearchBar onSearch={handleSearch} />
              <Link
                to={routes.createProduct}
                className="bg-main-orange hover:bg-orange-hover px-4 py-2 rounded-md w-80 font-semibold text-white hover:text-black transition-colors duration-300"
              >
                Add New Product
              </Link>
            </div>
          </div>
        </div>
      )}

      {renderProducts()}
    </div>
  );
};

export default ProductsListPage;
