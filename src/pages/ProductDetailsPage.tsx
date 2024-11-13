import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { fetchProductDetail } from "../redux/productSlice";
import GoBackButton from "../components/Buttons/GoBackBtn";

const ProductDetailsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const { product, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(Number(id)));
    }
  }, [id, dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-details-container py-8 px-4">
      <GoBackButton /> 
      <div className="product-details grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="product-image flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto max-w-xs object-contain"
          />
        </div>

        <div className="product-info">
          <h1 className="text-3xl font-semibold mb-4">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-bold text-gray-900 mb-4">
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
