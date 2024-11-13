import { routes } from "../routes";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const fetchProductsFromApi = async (limit: number) => {
  const response = await fetch(`${routes.fetchAllProducts}?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
};


export const fetchProductDetailFromApi = async (id: number) => {
  const response = await fetch(routes.fetchProductDetails(id));
  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }
  return await response.json();
};
