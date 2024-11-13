import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../api/products";
import { routes } from "../../routes";
import { CreatedProductTableRow } from "../CreatedProductTbleRow";

interface MyProductsTabProps {
  products: Product[];
}

const MyProductsTab: React.FC<MyProductsTabProps> = ({ products }) => {
  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <Link
          to={routes.createProduct}
          className="inline-block py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-400"
        >
          Add New Product
        </Link>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="p-3 text-left bg-gray-100 border-b">Title</th>
            <th className="p-3 text-left bg-gray-100 border-b">Price</th>
            <th className="p-3 text-left bg-gray-100 border-b">Category</th>
            <th className="p-3 text-left bg-gray-100 border-b">Published</th>
            <th className="p-3 text-left bg-gray-100 border-b">Created At</th>
            <th className="p-3 text-left bg-gray-100 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                No products found
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <CreatedProductTableRow key={product.id} product={product} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyProductsTab;
