import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery((query));
    onSearch(query);
  };

  return (
    <input
      type="text"
      placeholder="Search by product title..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="p-2 border rounded w-full"
    />
  );
};

export default SearchBar;
