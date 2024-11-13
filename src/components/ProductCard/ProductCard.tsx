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
    <div className="product-card bg-white shadow-md rounded-lg p-4 flex flex-col h-full">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain mb-4"
      />

      <h3 className="text-lg font-semibold mb-2 text-center line-clamp-2 overflow-hidden text-ellipsis">
        {product.title}
      </h3>

      <div className="flex flex-col justify-end mt-auto">
        <p className="text-gray-700 text-center mb-4">${product.price}</p>
        <button
          className="bg-green-800 text-white py-2 px-4 rounded"
          onClick={handleViewProduct}
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
