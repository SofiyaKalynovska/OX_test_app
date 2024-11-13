import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Layout } from "./components/Layout";
import ProductsListPage from "./pages/ProductsListPage";
 

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={routes.products} element={<ProductsListPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
