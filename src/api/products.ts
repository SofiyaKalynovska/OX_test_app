import { routes } from "../routes";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  published?: boolean;
}

export const fetchProductsFromApi = async (
  limit: number
): Promise<Product[]> => {
  const response = await fetch(`${routes.fetchAllProducts}?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
};

export const fetchProductDetailFromApi = async (
  id: number
): Promise<Product> => {
  const response = await fetch(routes.fetchProductDetails(id));
  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }
  return await response.json();
};

export const fetchCreatedProducts = async (
  limit: number
): Promise<Product[]> => {
  const response = await fetch(`${routes.fetchAllProducts}?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch created products");
  }

  const data = await response.json();
  return data.map((product: Product) => ({
    ...product,
    published: product.published ?? false, 
  }));
};

export const createProductInApi = async (product: Omit<Product, "id">): Promise<Product> => {
  const response = await fetch(`${routes.fetchAllProducts}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      published: product.published ?? false,
    }),
  });

  if (response.status === 200) {
    return await response.json(); 
  } else {
    throw new Error("Failed to create product");
  }
};

export const updateProductInApi = async (product: Product): Promise<Product> => {
  const response = await fetch(`${routes.fetchProductDetails(product.id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      published: product.published ?? false, 
    }),
  });

  if (response.status === 200) {
    return await response.json(); 
  } else {
    throw new Error("Failed to update product");
  }
};


export const deleteProductFromApi = async (id: number) => {
  const response = await fetch(`${routes.fetchAllProducts}/${id}`, {
    method: "DELETE",
  });

  if (response.status === 200) {
    return { id }; 
  } else {
    throw new Error("Failed to delete product"); 
  }
};
