import React from "react";
import { Product } from "../../api/products";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}
 
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {

    navigate(`/products/${product.id}`);
  };
  return (
    <div className="flex flex-col bg-white shadow-md p-4 rounded-lg h-full product-card">
      <img
        src={product.image}
        alt={product.title}
        className="mb-4 w-full h-48 object-contain"
      />

      <h3 className="mb-2 line-clamp-2 font-semibold text-center text-ellipsis text-lg overflow-hidden">
        {product.title}
      </h3>

      <div className="flex flex-col justify-end mt-auto">
        <p className="mb-4 text-center text-gray-700">${product.price}</p>
        <button
          className="border-main-orange bg-orange-light hover:bg-orange-hover px-4 py-2 rounded text-black transition-colors duration-300"
          onClick={handleViewProduct}
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
