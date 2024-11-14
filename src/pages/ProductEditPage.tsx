import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetail, updateProduct } from "../redux/productSlice";
import { RootState, AppDispatch } from "../redux/store";
import { Product } from "../api/products";
import { routes } from "../routes";

const ProductEditPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { product, status, error } = useSelector(
    (state: RootState) => state.products
  );

  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

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

  useEffect(() => {
    if (product && !editedProduct) {
      setEditedProduct(product);
    }
  }, [product, editedProduct]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (editedProduct) {
      setEditedProduct({
        ...editedProduct,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      });
    }
  };

  const handleSave = () => {
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

      dispatch(updateProduct(editedProduct));

      navigate(routes.products);
    }
  };

  const renderStatus = () => {
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
  };

  const renderForm = () => {
    if (!editedProduct) return null;

    return (
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Field</th>
            <th className="border px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(editedProduct).map((key) => {
            if (key === "id") return null;

            return (
              <tr key={key}>
                <td className="border px-4 py-2 capitalize">{key}</td>
                <td className="border px-4 py-2">
                  <input
                    type={
                      key === "price"
                        ? "number"
                        : key === "published"
                        ? "checkbox"
                        : "text"
                    }
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
                    className="border p-2 rounded w-full"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

      {renderStatus()}
      {renderForm()}

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProductEditPage;
