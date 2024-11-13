import React from "react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-200 rounded-md p-4 w-full h-full flex flex-col">
      <div className="bg-gray-300 h-48 mb-4 rounded-md"></div>
      <div className="bg-gray-300 h-6 mb-2 rounded w-3/4"></div>
      <div className="bg-gray-300 h-6 mb-4 rounded w-1/2"></div>
      <div className="bg-gray-300 h-10 rounded w-1/2 mx-auto"></div>
    </div>
  );
};

export default ProductCardSkeleton;
