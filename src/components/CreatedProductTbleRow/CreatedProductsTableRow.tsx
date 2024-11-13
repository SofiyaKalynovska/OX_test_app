import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../api/products";

interface ProductRowProps {
  product: Product;
}

const CreatedProductTableRow: React.FC<ProductRowProps> = ({ product }) => {
  return (
    <tr key={product.id} className="hover:bg-gray-50">
      <td className="p-3 border-b">{product.title}</td>
      <td className="p-3 border-b">{product.price}</td>
      <td className="p-3 border-b">{product.category}</td>
      <td className="p-3 border-b">{product.published ? "Yes" : "No"}</td>
      <td className="p-3 border-b">{new Date(product.id).toLocaleString()}</td>
      <td className="p-3 border-b">
        <Link
          to={`/products/edit/${product.id}`}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
};

export default CreatedProductTableRow;
