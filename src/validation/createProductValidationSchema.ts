import * as Yup from "yup";

const createProductValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  category: Yup.string().required("Category is required"),
});

export default createProductValidationSchema;
