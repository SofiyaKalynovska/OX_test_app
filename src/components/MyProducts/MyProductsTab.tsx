import React from "react";
import { Product } from "../../api/products";
import { CreatedProductTableRow } from "../CreatedProductTbleRow";

interface MyProductsTabProps {
  products: Product[];
}
const MyProductsTab: React.FC<MyProductsTabProps> = ({ products }) => {
  return (
    <div className="p-6 overflow-x-auto">
      <table className="border-collapse border-gray-200 border min-w-full table-auto">
        <thead>
          <tr>
            <th className="bg-gray-100 p-3 border-b text-left">Title</th>
            <th className="bg-gray-100 p-3 border-b text-left">Price</th>
            <th className="bg-gray-100 p-3 border-b text-left">Category</th>
            <th className="bg-gray-100 p-3 border-b text-left">Published</th>
            <th className="bg-gray-100 p-3 border-b text-left">Created At</th>
            <th className="bg-gray-100 p-3 border-b text-left">Actions</th>
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
