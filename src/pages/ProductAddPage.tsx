import React from "react";
import { AddProductForm } from "../components/Form";
import { GoBackBtn } from "../components/Buttons";

const ProductAddPage: React.FC = () => {
  return (
    <div className="px-6">
      <GoBackBtn  />
      <div className="mx-auto p-6 max-w-2xl">
        <h1 className="mb-6 font-semibold text-3xl text-center">
          Add New Product
        </h1>
        <AddProductForm />
      </div>
    </div>
  );
};

export default ProductAddPage;
