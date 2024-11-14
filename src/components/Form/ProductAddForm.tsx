import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Product } from "../../api/products";
import { yupResolver } from "@hookform/resolvers/yup";
import { createProductValidationSchema } from "../../validation";
import { addProduct } from "../../redux/productSlice";
import InputFormField from "./InputFormField";
import TextAreaFormField from "./TextareaFormField";
import { Switch } from "../Switch";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

type ProductFormValues = Omit<Product, "id">;

const AddProductForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProductFormValues>({
    resolver: yupResolver(createProductValidationSchema),
    defaultValues: {
      published: false, 
    },
  });

  const published = watch("published", false);

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    const newProduct: Product = {
      ...data,
      id: Date.now(), 
    };

    try {
      dispatch(addProduct(newProduct));
      reset(); 

      navigate(`/products?tab=my&published=${published}`);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handlePublishedChange = (checked: boolean) => {
    setValue("published", checked); 
  };

  return (
    <div className="bg-white shadow-md mx-auto p-6 rounded-lg max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputFormField
          label="Product Title"
          type="text"
          id="title"
          placeholder="Enter product title"
          register={register}
          errors={errors}
        />
        <InputFormField
          label="Price"
          type="number"
          id="price"
          placeholder="Enter price"
          register={register}
          errors={errors}
        />
        <TextAreaFormField
          label="Description"
          id="description"
          placeholder="Enter product description"
          register={register}
          errors={errors}
        />
        <InputFormField
          label="Category"
          type="text"
          id="category"
          placeholder="Enter category"
          register={register}
          errors={errors}
        />
        <Switch
          label="Published"
          checked={published}
          onChange={handlePublishedChange}
        />
        <button
          type="submit"
          className="bg-main-orange hover:bg-orange-hover mt-4 py-3 rounded-md w-full font-semibold text-white"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
