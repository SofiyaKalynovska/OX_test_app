const BASE_URL = "https://fakestoreapi.com/products";

export const routes = {
  // API Routes
  fetchAllProducts: `${BASE_URL}`,
  fetchProductDetails: (id: number) => `${BASE_URL}/${id}`,
  updateProduct: (id: number) => `${BASE_URL}/${id}`,

  // Pages
  products: "/products",
  productDetails: "/products/:id",
  createProduct: "/create_product",
  editProduct: "/edit/:productId",
  about:"/about",
};
