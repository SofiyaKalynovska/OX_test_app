//

import React from "react";

interface PaginationButtonProps {
  onClick: () => void;
  active: boolean;
  label: string;
}

const ProductListPaginationButton: React.FC<PaginationButtonProps> = ({
  onClick,
  active,
  label,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md ${
        active ? "bg-main-orange" : "bg-gray-200"
      } transition-colors duration-300`}
    >
      {label}
    </button>
  );
};

export default ProductListPaginationButton;
