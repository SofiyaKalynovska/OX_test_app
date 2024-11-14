import React, { useEffect, useState, ChangeEvent, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetail,
  updateProduct,
  deleteProduct,
} from "../redux/productSlice";
import { RootState, AppDispatch } from "../redux/store";
import { Product } from "../api/products";
import { routes } from "../routes";
import { setFilter } from "../redux/filterSlice";
import { ConfirmDeleteModal } from "../components/Modals";

const ProductEditPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { status, error } = useSelector((state: RootState) => state.products);

  const filters = useSelector((state: RootState) => state.filter.filters);

  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (productId) {
      const createdProducts = JSON.parse(
        localStorage.getItem("createdProducts") || "[]"
      );
      const foundProduct = createdProducts.find(
        (prod: Product) => prod.id === Number(productId)
      );
      if (foundProduct) {
        setEditedProduct(foundProduct);
      } else {
        dispatch(fetchProductDetail(Number(productId)));
      }
    }
  }, [productId, dispatch]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (editedProduct) {
        setEditedProduct((prevProduct) => ({
          ...prevProduct!,
          [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value,
        }));
      }
    },
    [editedProduct]
  );

  const handleSave = useCallback(() => {
    if (editedProduct) {
      const createdProducts = JSON.parse(
        localStorage.getItem("createdProducts") || "[]"
      );
      const index = createdProducts.findIndex(
        (prod: Product) => prod.id === editedProduct.id
      );

      if (index !== -1) {
        createdProducts[index] = editedProduct;
        localStorage.setItem(
          "createdProducts",
          JSON.stringify(createdProducts)
        );
      }

      dispatch(
        setFilter({
          key: "isPublished",
          value: editedProduct.published ?? filters.isPublished,
        })
      );

      dispatch(updateProduct(editedProduct));

      navigate(routes.products);
    }
  }, [editedProduct, dispatch, filters.isPublished, navigate]);

  const handleDeleteClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (editedProduct) {
      setIsDeleting(true);
      try {
        const createdProducts = JSON.parse(
          localStorage.getItem("createdProducts") || "[]"
        );
        const filteredProducts = createdProducts.filter(
          (prod: Product) => prod.id !== editedProduct.id
        );
        localStorage.setItem(
          "createdProducts",
          JSON.stringify(filteredProducts)
        );
        await dispatch(deleteProduct(editedProduct.id)).unwrap();

        setIsDeleting(false);
        setIsModalOpen(false);
        navigate(routes.products);
      } catch (err) {
        setIsDeleting(false);
        console.error("Delete failed", err);
      }
    }
  }, [editedProduct, dispatch, navigate]);

  const renderStatus = useCallback(() => {
    if (status === "loading") {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!editedProduct) {
      return <div>Product not found</div>;
    }

    return null;
  }, [status, error, editedProduct]);

  const renderForm = useCallback(() => {
    if (!editedProduct) return null;

    return (
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Field</th>
            <th className="px-4 py-2 border">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(editedProduct).map((key) => {
            if (key === "id") return null;

            return (
              <tr key={key}>
                <td className="px-4 py-2 border capitalize">{key}</td>
                <td className="px-4 py-2 border">
                  <input
                    type={key === "published" ? "checkbox" : "text"}
                    name={key}
                    value={
                      key !== "published"
                        ? String(editedProduct[key as keyof Product] || "")
                        : undefined
                    }
                    checked={
                      key === "published"
                        ? !!editedProduct[key as keyof Product]
                        : undefined
                    }
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }, [editedProduct, handleInputChange]);

  return (
    <div className="bg-white shadow-md mx-auto p-6 rounded-lg container">
      <h2 className="mb-4 font-semibold text-2xl">Edit Product</h2>

      {renderStatus()}
      {renderForm()}

      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md text-white"
        >
          Save Changes
        </button>

        <button
          onClick={handleDeleteClick}
          className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded-md text-white"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Product"}
        </button>
      </div>

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ProductEditPage;
