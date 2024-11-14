import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { routes } from "./routes";
import { Layout } from "./components/Layout";
import store from "./redux/store";
import { Provider } from "react-redux";
import ProductDetailPage from "./pages/ProductDetailsPage";
import ProductAddPage from "./pages/ProductAddPage";
import ProductsListPage from "./pages/ProductsListPage";
import ProductEditPage from "./pages/ProductEditPage";
 

const App: React.FC = () => {
  
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<Navigate to={routes.products} replace />}
            />
            <Route path={routes.products} element={<ProductsListPage />} />
            <Route
              path={routes.productDetails}
              element={<ProductDetailPage />}
            />
            <Route path={routes.createProduct} element={<ProductAddPage />} />
            <Route path={routes.editProduct} element={<ProductEditPage />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
