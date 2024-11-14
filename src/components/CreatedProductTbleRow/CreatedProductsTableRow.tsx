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

  const formattedDateTime = new Date(product.id).toLocaleString([], {
    day: "2-digit", 
    month: "2-digit", 
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit", 
    hour12: false, 
  });

  return (
    <>
      <tr key={product.id} className="hover:bg-gray-50">
        <td className="p-3 border-b">{product.title}</td>
        <td className="p-3 border-b">{product.price}</td>
        <td className="p-3 border-b">{product.category}</td>
        <td className="p-3 border-b">{product.published ? "Yes" : "No"}</td>
        <td className="p-3 border-b">{formattedDateTime}</td>{" "}
        <td className="flex items-center gap-2 p-3 border-b s">
          <Link
            to={`/edit/${product.id}`}
            className="bg-dark-blue hover:bg-light-blue px-4 py-2 rounded-md text-white hover:text-white"
          >
            Edit
          </Link>

          <button
            onClick={handleDeleteClick}
            className="hover:bg-red-700 text-red-500 hover:text-white"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>

          {error && <span className="ml-2 text-red-600 text-sm">{error}</span>}
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
