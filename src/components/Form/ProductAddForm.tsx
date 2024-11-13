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


type ProductFormValues = Omit<Product, "id">;

const AddProductForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    const newProduct: Product = {
      ...data,
      id: Date.now(),
    };
    dispatch(addProduct(newProduct)); 
    reset(); 
    navigate(`/products?tab=my&published=${published}`);
  };

  const handlePublishedChange = (checked: boolean) => {
    setValue("published", checked); 
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
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
          className="w-full py-3 mt-4 bg-green-800 text-white font-semibold rounded-md hover:bg-green-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
