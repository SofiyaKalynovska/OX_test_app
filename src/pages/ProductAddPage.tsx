import React from "react";
import { AddProductForm } from "../components/Form";

const ProductAddPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Add New Product
      </h1>
      <AddProductForm />
    </div>
  );
};

export default ProductAddPage;
