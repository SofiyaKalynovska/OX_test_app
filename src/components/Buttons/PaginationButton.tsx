import React from "react";

interface ButtonProps {
  onClick: () => void;
  active: boolean;
  label: string;
}

const ProductListPaginationButton: React.FC<ButtonProps> = ({ onClick, active, label }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        active ? "bg-blue-700" : "bg-blue-500"
      } text-white py-2 px-4 rounded transition-colors duration-300`}
    >
      {label}
    </button>
  );
};

export default ProductListPaginationButton;
