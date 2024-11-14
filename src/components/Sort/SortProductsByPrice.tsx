import React from "react";

interface SortByPriceSwitchProps {
  sortDirection: "asc" | "desc";
  onSortChange: () => void; 
}

const SortByPriceSwitch: React.FC<SortByPriceSwitchProps> = ({
  sortDirection,
  onSortChange,
}) => {
  return (
    <div>
      <p className="mb-2">Sort by price:</p>
      <div className="flex items-center space-x-4">
        <button
          onClick={onSortChange}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            sortDirection === "asc"
              ? "border-main-orange text-main-orange"
              : " text-gray-600"
          }`}
        >
          Low to High
        </button>

        <button
          onClick={onSortChange}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            sortDirection === "desc"
              ? "border-main-orange text-main-orange"
              : " text-gray-600"
          }`}
        >
          High to Low
        </button>
      </div>
    </div>
  );
};

export default SortByPriceSwitch;
