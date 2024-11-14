import { useState, useMemo } from "react";
import { Product } from "../api/products";

export const useSearchQuery = (initialQuery: string) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredProducts = useMemo(() => {
    return (products: Product[]) =>
      products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [searchQuery]);

  return { searchQuery, handleSearch, filteredProducts };
};
