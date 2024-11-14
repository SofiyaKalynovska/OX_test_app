import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../api/products";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../redux/productSlice";
import { RootState, AppDispatch } from "../../redux/store";
import { ConfirmDeleteModal } from "../Modals";

interface ProductRowProps {
  product: Product;
}

const CreatedProductTableRow: React.FC<ProductRowProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.products);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteProduct(product.id)).unwrap();
      setIsDeleting(false);
      setIsModalOpen(false);
    } catch (err) {
      setIsDeleting(false);
      console.error("Delete failed", err);
    }
  }, [dispatch, product.id]);

  return (
    <>
      <tr key={product.id} className="hover:bg-gray-50">
        <td className="p-3 border-b">{product.title}</td>
        <td className="p-3 border-b">{product.price}</td>
        <td className="p-3 border-b">{product.category}</td>
        <td className="p-3 border-b">{product.published ? "Yes" : "No"}</td>
        <td className="p-3 border-b">
          {new Date(product.id).toLocaleString()}
        </td>
        <td className="p-3 border-b flex space-x-2 items-center">
          <Link
            to={`/edit/${product.id}`}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </Link>

          <button
            onClick={handleDeleteClick}
            className="text-red-500 hover:text-red-700"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>

          {error && <span className="text-red-600 text-sm ml-2">{error}</span>}
        </td>
      </tr>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default CreatedProductTableRow;
