import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Layout } from "./components/Layout";
import store from "./redux/store";
import { Provider } from "react-redux";
import ProductDetailPage from "./pages/ProductDetailsPage";
import ProductAddPage from "./pages/ProductAddPage";
import ProductsListPage from "./pages/ProductsListPage";
 

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path={routes.products} element={<ProductsListPage />} />
            <Route
              path={routes.productDetails}
              element={<ProductDetailPage />}
            />
            <Route path={routes.createProduct} element={<ProductAddPage/>} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
